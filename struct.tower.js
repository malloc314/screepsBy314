var structTower = {
    /** @param {Tower} tower **/
    run: function(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL && structure.hits <= 5000
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            //console.log("Tower repairing" + closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
};

module.exports = structTower;