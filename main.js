var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleReaper = require('role.reaper');
var structTower = require('struct.tower');
var lib = require('lib.hqc');

module.exports.loop = function () {
    var harvestersLinkTo = _.filter(Game.creeps, (creep) => creep.memory.link == 'linkTo' && creep.memory.spawn == 'Spawn1');
    var harvestersLinkFrom = _.filter(Game.creeps, (creep) => creep.memory.link == 'linkFrom' && creep.memory.spawn == 'Spawn1');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.name == 'Harvester' && creep.memory.spawn == 'Spawn1');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.name == 'Upgrader' && creep.memory.spawn == 'Spawn1');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.name == 'Builder' && creep.memory.spawn == 'Spawn1');
    var reapers = _.filter(Game.creeps, (creep) => creep.memory.name == 'Reaper' && creep.memory.spawn == 'Spawn1');

    var harvestersS2LinkTo = _.filter(Game.creeps, (creep) => creep.memory.link == 'linkTo' && creep.memory.spawn == 'Spawn2');
    var harvestersS2LinkFrom = _.filter(Game.creeps, (creep) => creep.memory.link == 'linkFrom' && creep.memory.spawn == 'Spawn2');
    var harvestersS2 = _.filter(Game.creeps, (creep) => creep.memory.name == 'Harvester' && creep.memory.spawn == 'Spawn2');
    var upgradersS2 = _.filter(Game.creeps, (creep) => creep.memory.name == 'Upgrader' && creep.memory.spawn == 'Spawn2');
    var buildersS2 = _.filter(Game.creeps, (creep) => creep.memory.name == 'Builder' && creep.memory.spawn == 'Spawn2');


    var quantityHarvestersLinkTo = 1;
    var quantityHarvestersLinkFrom = 1;
    //var quantityHarvesters = 2;
    var quantityUpgraders = 2;
    var quantityBuilders = 0;
    var quantityReaper = 0;

    var quantityHarvestersS2LinkTo = 1;
    var quantityHarvestersS2LinkFrom = 1;
    //var quantityHarvestersS2 = 0;
    var quantityUpgradersS2 = 2;
    var quantityBuildersS2 = 1;

    // spawning creeps from Spawn1
    if(Game.spawns.Spawn1.room.energyAvailable >= 1000 && Game.spawns.Spawn1.spawning == null) { 
        // harvesterLinkTo
        if(harvestersLinkTo.length < quantityHarvestersLinkTo) {
            lib.createCreep(
                lib.creepProperties.harvesterLinkTo.memory.name, 
                lib.creepProperties.harvesterLinkTo.memory, 
                lib.creepProperties.capabilityParts(0, 1, 6, 7, 0, 0, 0, 0), 'Spawn1'
            );
        }
        // harvesterLinkFrom
        if(harvestersLinkFrom.length < quantityHarvestersLinkFrom && harvestersLinkTo.length == quantityHarvestersLinkTo) {
            lib.createCreep(
                lib.creepProperties.harvesterLinkFrom.memory.name, 
                lib.creepProperties.harvesterLinkFrom.memory, 
                lib.creepProperties.capabilityParts(0, 5, 4, 4, 0, 0, 0, 0), 'Spawn1'
            );
        }
        // upgrader
        if(upgraders.length < quantityUpgraders &&
            harvestersLinkTo.length == quantityHarvestersLinkTo &&
            harvestersLinkFrom.length == quantityHarvestersLinkFrom
        ) {
            lib.createCreep(
                lib.creepProperties.upgrader.memory.name, 
                lib.creepProperties.upgrader.memory, 
                lib.creepProperties.capabilityParts(0, 3, 2, 5, 0, 0, 0, 0), 'Spawn1'
            );
        }
        // builder
        if(builders.length < quantityBuilders && 
            harvestersLinkTo.length == quantityHarvestersLinkTo &&
            harvestersLinkFrom.length == quantityHarvestersLinkFrom &&
            upgraders.length == quantityUpgraders
        ) {
            lib.createCreep(
                lib.creepProperties.builder.memory.name, 
                lib.creepProperties.builder.memory, 
                lib.creepProperties.capabilityParts(0, 3, 2, 5, 0, 0, 0, 0), 'Spawn1'
            );
        }
        // reaper
        if(reapers.length < quantityReaper && 
            harvestersLinkTo.length == quantityHarvestersLinkTo && 
            harvestersLinkFrom.length == quantityHarvestersLinkFrom
        ) {
            lib.createCreep(
                lib.creepProperties.reaper.memory.name, 
                lib.creepProperties.reaper.memory, 
                lib.creepProperties.capabilityParts(0, 6, 6, 13, 1, 0, 0, 0), 'Spawn1'
            );
        }
    }
    // spawning creeps from Spawn2
    if(Game.spawns.Spawn1.room.energyAvailable >= 500 && Game.spawns.Spawn2.spawning == null) { 
        // harvesterLinkTo
        if(harvestersS2LinkTo.length < quantityHarvestersS2LinkTo) {
            lib.createCreep(
                lib.creepProperties.harvesterLinkTo.memory.name, 
                lib.creepProperties.harvesterLinkTo.memory, 
                lib.creepProperties.capabilityParts(0, 1, 6, 7, 0, 0, 0, 0), 'Spawn2'
            );
        }
        // harvesterLinkFrom
        if(harvestersS2LinkFrom.length < quantityHarvestersS2LinkFrom && 
            harvestersS2LinkTo.length == quantityHarvestersS2LinkTo
        ) {
            lib.createCreep(
                lib.creepProperties.harvesterLinkFrom.memory.name, 
                lib.creepProperties.harvesterLinkFrom.memory, 
                lib.creepProperties.capabilityParts(0, 5, 4, 4, 0, 0, 0, 0), 'Spawn2'
            );
        }
        // upgrader
        if(upgradersS2.length < quantityUpgradersS2 && 
            harvestersS2LinkFrom.length == quantityHarvestersS2LinkFrom && 
            harvestersS2LinkTo.length == quantityHarvestersS2LinkTo
        ) {
            lib.createCreep(
                lib.creepProperties.upgrader.memory.name, 
                lib.creepProperties.upgrader.memory, 
                lib.creepProperties.capabilityParts(0, 6, 4, 10, 0, 0, 0, 0), 'Spawn2'
            );
        }
        // builder
        if(buildersS2.length < quantityBuildersS2 && 
            harvestersS2LinkFrom.length == quantityHarvestersS2LinkFrom && 
            harvestersS2LinkTo.length == quantityHarvestersS2LinkTo && 
            upgradersS2.length == quantityUpgradersS2
        ) {
            lib.createCreep(
                lib.creepProperties.builder.memory.name, 
                lib.creepProperties.builder.memory, 
                lib.creepProperties.capabilityParts(0, 1, 6, 7, 0, 0, 0, 0), 'Spawn2'
            );
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
