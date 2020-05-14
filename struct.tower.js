var structTower = {
    /** @param {Tower} tower **/
    run: function(tower) {
        // 1. room E34S22
        if(tower.room.name == 'E34S22') {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 5880000
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
        // 2. room E35S22
        if(tower.room.name == 'E35S22') {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 100000
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            //if(closestHostile) {
            //    tower.attack(closestHostile);
            //}
        }
    }
};

module.exports = structTower;