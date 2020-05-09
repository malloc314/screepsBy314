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
            lib.changeRole('harvester', creep);
        }
        // harvester which spawed from 'Spawn2'
        if(creep.memory.spawn == 'Spawn2') {
            lib.harvesterLogic(creep);
            lib.changeRole('harvester', creep);
        }
    }
};

module.exports = roleHarvester;