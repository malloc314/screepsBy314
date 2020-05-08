var roleReaper = {
    /** @param {Creep} creep **/
    run: function(creep) {
        const findConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        const attackHostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        const attackHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        const exitDir = creep.room.findExitTo('E35S22');
        const exit = creep.pos.findClosestByRange(exitDir);
        
        if(exit != null && creep.memory.role == 'reaper') {
            creep.moveTo(exit, {visualizePathStyle: {stroke: 'red'}});
            console.log('-> ' + exit);
       }
        if(exit == null){
            console.log('-> ' + exit);
            if(creep.memory.role == 'reaper') {
                creep.moveTo(creep.room.controller);
            }
            if(!creep.room.controller.my) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                //reaper: role = reaper -> reaper: role = upgrader
                if(creep.room.controller.my) {
                    if(creep.memory.role == 'reaper' && !attackHostileCreeps || !attackHostileStructures) {
                        creep.memory.role = 'upgrader';
                        console.log('role: upgrader');
                    }
                }
            }
        }
        //attack
        if(attackHostileCreeps) {
            if(creep.attack(attackHostileCreeps) == ERR_NOT_IN_RANGE) {
                creep.moveTo(attackHostileCreeps);
            }
        }
        else if(attackHostileStructures && !attackHostileCreeps) {
            if(creep.attack(attackHostileStructures) == ERR_NOT_IN_RANGE) {
                creep.moveTo(attackHostileStructures);
            }
        }
        //heal
        const healTarget = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(healTarget) {
            if(creep.heal(healTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(healTarget);
            }
        }
        //attack controller
        if(creep.room.controller && !creep.room.controller.my) {
            if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        
        //reaper: role = reaper/upgrader -> reaper: role = builder
        //if(findConstructionSites.length > 0 && creep.memory.role == 'reaper' || creep.memory.role == 'upgrader') {
        //    creep.memory.role = 'builder';
        //    console.log('role: builder');
        //}
    }
};

module.exports = roleReaper;