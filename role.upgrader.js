var lib = require('lib.hqc');

var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // upgrader which spawed from 'Spawn1'
        if(creep.memory.spawn == 'Spawn1') {
            lib.upgraderLogic(creep);
            lib.changeRole('upgrader', creep);
        }
        // upgrader which spawed from 'Spawn2'
        if(creep.memory.spawn == 'Spawn2') {
            lib.upgraderLogic(creep);
            lib.changeRole('upgrader', creep);
        }
    }
};

module.exports = roleUpgrader;