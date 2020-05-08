var lib = require('lib.hqc');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // builder which spawed from 'Spawn1'
        if(creep.memory.spawn == 'Spawn1') {
            lib.builderLogic(creep);
            //lib.changeRole('builder', creep);
        }
        // builder which spawed from 'Spawn2'
        if(creep.memory.spawn == 'Spawn2') {
            lib.builderLogic(creep);
            //lib.changeRole('builder', creep);
        }
    }
};

module.exports = roleBuilder;
