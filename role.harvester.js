var lib = require('lib.hqc');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // harvester which spawed from 'Spawn1'
        if(creep.memory.spawn == 'Spawn1') {
            // creep harvester via links (creep, roomName, xTo, yTo, xFrom, yFrom)
            lib.harvesterLogicViaLink(creep, 'E34S22', 32, 35, 27, 32);
        }
        
        
        // harvester which spawed from 'Spawn2'
        if(creep.memory.spawn == 'Spawn2') {
            // creep harvester via links (creep, roomName, xTo, yTo, xFrom, yFrom)
            lib.harvesterLogicViaLink(creep, 'E35S22', 27, 17, 35, 43);
        }
    }
};

module.exports = roleHarvester;