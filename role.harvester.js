var lib = require('lib.hqc');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // harvester which spawed from 'Spawn1'
        if(creep.memory.spawn == 'Spawn1') {
            // harvesting energy
            lib.harvesterLogic(creep);
            // harvesting minerals
            if(creep.memory.mineral == true) {
                //lib.harvesterLogicMineral(creep);
            }
            // change role harvester -> upgrader
            //lib.changeRole('harvester', creep);
        }
        
        
        // harvester which spawed from 'Spawn2'
        if(creep.memory.spawn == 'Spawn2') {
            //lib.harvesterLogic(creep);

            //var linkFrom = Game.rooms['E35S22'].lookForAt('structure', 35, 43)[0];
            //var linkTo = Game.rooms['E35S22'].lookForAt('structure', 27, 17)[0];
            // creep harvester via links (creep, roomName, xTo, yTo, xFrom, yFrom)
            lib.harvesterLogicViaLink(creep, 'E35S22', 27, 17, 35, 43);
            
            
            //lib.changeRole('harvester', creep);
        }
    }
};

module.exports = roleHarvester;