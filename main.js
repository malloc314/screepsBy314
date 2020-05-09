var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleReaper = require('role.reaper');
var structTower = require('struct.tower');
var lib = require('lib.hqc');

module.exports.loop = function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.name == 'Harvester' && creep.memory.spawn == 'Spawn1');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.name == 'Upgrader' && creep.memory.spawn == 'Spawn1');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.name == 'Builder' && creep.memory.spawn == 'Spawn1');
    var reapers = _.filter(Game.creeps, (creep) => creep.memory.name == 'Reaper' && creep.memory.spawn == 'Spawn1');
    var harvestersS2 = _.filter(Game.creeps, (creep) => creep.memory.name == 'Harvester' && creep.memory.spawn == 'Spawn2');
    var upgradersS2 = _.filter(Game.creeps, (creep) => creep.memory.name == 'Upgrader' && creep.memory.spawn == 'Spawn2');
    var buildersS2 = _.filter(Game.creeps, (creep) => creep.memory.name == 'Builder' && creep.memory.spawn == 'Spawn2');
    var quantityHarvesters = 2;
    var quantityUpgraders = 1;
    var quantityBuilders = 1;
    var quantityReaper = 0;
    var quantityHarvestersS2 = 4;
    var quantityUpgradersS2 = 2;
    var quantityBuildersS2 = 0;

    // spawning creeps from Spawn1
    if (Game.spawns.Spawn1.room.energyAvailable >= 1000 && Game.spawns.Spawn1.spawning == null) { 
        if(harvesters.length < quantityHarvesters) {
            lib.createCreep(lib.creepProperties.harvester.memory.name, lib.creepProperties.harvester.memory, lib.creepProperties.capabilityParts(0, 4, 4, 8, 0, 0, 0, 0), 'Spawn1');
        }
        if(upgraders.length < quantityUpgraders && harvesters.length == quantityHarvesters) {
            lib.createCreep(lib.creepProperties.upgrader.memory.name, lib.creepProperties.upgrader.memory, lib.creepProperties.capabilityParts(0, 3, 2, 5, 0, 0, 0, 0), 'Spawn1');
        }
        if(builders.length < quantityBuilders && harvesters.length == quantityHarvesters && upgraders.length == quantityUpgraders) {
            lib.createCreep(lib.creepProperties.builder.memory.name, lib.creepProperties.builder.memory, lib.creepProperties.capabilityParts(0, 3, 2, 5, 0, 0, 0, 0), 'Spawn1');
        }
        if(reapers.length < quantityReaper && harvesters.length == quantityHarvesters) {
            lib.createCreep(lib.creepProperties.reaper.memory.name, lib.creepProperties.reaper.memory, lib.creepProperties.capabilityParts(0, 6, 6, 13, 1, 0, 0, 0), 'Spawn1');
        }
    }
    // spawning creeps from Spawn2
    if(Game.spawns.Spawn2.room.energyAvailable == 1300 && Game.spawns.Spawn2.spawning == null) { 
        if(harvestersS2.length < quantityHarvestersS2) {
            lib.createCreep(lib.creepProperties.harvester.memory.name, lib.creepProperties.harvester.memory, lib.creepProperties.capabilityParts(0, 4, 4, 8, 0, 0, 0, 0), 'Spawn2');
        }
        if(upgradersS2.length < quantityUpgradersS2 && harvestersS2.length == quantityHarvestersS2) {
            lib.createCreep(lib.creepProperties.upgrader.memory.name, lib.creepProperties.upgrader.memory, lib.creepProperties.capabilityParts(0, 4, 4, 8, 0, 0, 0, 0), 'Spawn2');
        }
        if(buildersS2.length < quantityBuildersS2 && harvestersS2.length == quantityHarvestersS2 && upgradersS2.length == quantityUpgradersS2) {
            lib.createCreep(lib.creepProperties.builder.memory.name, lib.creepProperties.builder.memory, lib.creepProperties.capabilityParts(0, 1, 6, 7, 0, 0, 0, 0), 'Spawn2');
        }
    }
    // creeps clean memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // creeps main loop
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'reaper') {
            roleReaper.run(creep);
        }
    }
    // structure main loop
    for(var type in Game.structures) {
        var tower = Game.structures[type];
        if(Game.structures[type].structureType == STRUCTURE_TOWER) {
            structTower.run(tower);
        }
    }
}
