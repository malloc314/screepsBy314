// library high quality code
var libraryHqc = {
    creepProperties: {
        // harvester props
        harvester: {
            memory: {
                name: 'Harvester',
                role: 'harvester',
                spawn: '',
                harvesting: true,
                upgrading: false,
                transfering: true,
                mineral: false
            }, 
        },
        // upgrader props
        upgrader: {
            memory: {
                name: 'Upgrader',
                role: 'upgrader',
                spawn: '',
                upgrading: false
            },
        },
        // builder props
        builder: {
            memory: {
                name: 'Builder',
                role: 'builder',
                spawn: '',
                building: false,
                repairing: false
            },
        },
        // reaper props
        reaper: {
            memory: {
                name: 'Reaper',
                role: 'reaper',
                spawn: '',
                upgrading: false,
                building: false,
                repairing: false
            },
        },
        // capability body creeps part code
        capabilityParts: function (toughPart, workPart, carryPart, movePart, attackPart, attackRangePart, healPart, claimPart) {
            var ability = {
                tough: TOUGH,
                work: WORK,
                carry: CARRY,
                move: MOVE,
                attack: ATTACK,
                attackRange: RANGED_ATTACK,
                heal: HEAL,
                claim: CLAIM
            }
            var creepAbility = [];
            var costCreep = 0;
            toughPart > 0 ? boolToughPart = true : boolToughPart = false;
            workPart > 0 ? boolWorkPart = true : boolWorkPart = false;
            carryPart > 0 ? boolCarryPart = true : boolCarryPart = false;
            movePart > 0 ? boolMovePart = true : boolMovePart = false;
            attackPart > 0 ? boolAttackPart = true : boolAttackPart = false;
            attackRangePart > 0 ? boolAttackRangePart = true : boolAttackRangePart = false;
            healPart > 0 ? boolHealPart = true : boolHealPart = false;
            claimPart > 0 ? boolClaimPart = true : boolClaimPart = false;
            switch (true) {
                case boolToughPart:
                    var costToughPart = 10 * toughPart;
                    costCreep += costToughPart;
                    for (var index = 0; index < toughPart; index++) {
                        creepAbility.push(ability.tough);
                    }
                case boolWorkPart:
                    var costWorkPart = 100 * workPart;
                    costCreep += costWorkPart;
                    for (var index = 0; index < workPart; index++) {
                        creepAbility.push(ability.work);
                    }
                 case boolCarryPart:
                    var costCarryPart = 50 * carryPart;
                    costCreep += costCarryPart;
                    for (var index = 0; index < carryPart; index++) {
                        creepAbility.push(ability.carry);
                    }
                 case boolMovePart:
                    var costMovePart = 50 * movePart;
                    costCreep += costMovePart;
                    for (var index = 0; index < movePart; index++) {
                        creepAbility.push(ability.move);
                    }
                 case boolAttackPart:
                    var costAttackPart = 80 * attackPart;
                    costCreep += costAttackPart;
                    for (var index = 0; index < attackPart; index++) {
                        creepAbility.push(ability.attack);
                    }
                 case boolAttackRangePart:
                    var costAttackRangePart = 150 * attackRangePart;
                    costCreep += costAttackRangePart;
                    for (var index = 0; index < attackRangePart; index++) {
                        creepAbility.push(ability.attackRange);
                    }
                 case boolHealPart:
                    var costHealPart = 250 * healPart;
                    costCreep += costHealPart;
                    for (var index = 0; index < healPart; index++) {
                        creepAbility.push(ability.heal);
                    }
                 case boolClaimPart:
                    var costClaimPart = 600 * claimPart;
                    costCreep += costClaimPart;
                    for (var index = 0; index < claimPart; index++) {
                        creepAbility.push(ability.claim);
                    }
                default:
                    break;
            }
            console.log('cost creep: ' + costCreep);
            return creepAbility;
        },
    },
    // create new creep block
    createCreep: function (creepName, creepMemory, creepCapability, spawnName) {
        creepMemory.spawn = spawnName;
        var newName = creepName + Game.time;
        console.log('Spawning new: ' + newName + ' from: ' + spawnName);
        Game.spawns[spawnName].spawnCreep(
            creepCapability,
            newName, 
            {memory: creepMemory}
        );
    },
    // change creeps role block
    changeRole: function(creepRole, creep) {
        var spawns = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });
        var extensions = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            }
        });
        var roomEnergyMaxCap = extensions.length * 50 + 300;
        var roomEnergy = spawns[0].room.energyAvailable;
        var findConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        var attackHostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var attackHostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        switch (creepRole) {
            case 'harvester':
                // name: 'Harvester'
                // role: 'harvester' -> role: 'upgrader'
                // spawn: 'Spawn1' && 'Spawn2'
                if(creep.memory.name == 'Harvester' && creep.memory.role == 'harvester' && roomEnergy == roomEnergyMaxCap && creep.memory.transfering == false) {
                    creep.memory.role = 'upgrader';
                    return creep.say('role: upgrader');
                }
                else {
                    break;
                }
            case 'upgrader':
                // name: 'Harvester'
                // role: 'upgrader' -> role: 'harvester'
                // spawn: 'Spawn1' && 'Spawn2'
                if(creep.memory.name == 'Harvester' && creep.memory.role == 'upgrader' && roomEnergy < roomEnergyMaxCap) {
                    creep.memory.role = 'harvester';
                    return creep.say('role: harvester');
                }
                else {
                    break;
                }
                // name: 'Reaper'
                // role: 'upgrader' -> role: 'reaper'
                // spawn: 'Spawn2'
                if(creep.memory.name == 'Reaper' && creep.memory.role == 'upgrader' && attackHostileCreeps || attackHostileStructures) {
                    creep.memory.role = 'reaper';
                    return creep.say('role: reaper');
                }
                else {
                    break;
                }
                // name: 'Reaper'
                // role: 'upgrader' -> role: 'builder'
                // spawn: 'Spawn2'
                if(creep.memory.name == 'Reaper' && creep.memory.role == 'upgrader' && findConstructionSites.length > 0) {
                    creep.memory.role = 'builder';
                    return creep.say('role: builder');
                }
                else {
                    break;
                }
            case 'builder':
                // name: 'Reaper'
                // role: 'builder' -> role: 'upgrader'
                // spawn: 'Spawn2'
                if(creep.memory.name == 'Reaper' && creep.memory.role == 'builder' && findConstructionSites.length == 0) {
                    creep.memory.role = 'upgrader';
                    return creep.say('role: upgrader');
                }
                else {
                    break;
                }
                // name: 'Reaper'
                // role: 'builder' -> role: 'reaper'
                // spawn: 'Spawn2'
                if(creep.memory.name == 'Reaper' && creep.memory.role == 'builder' && attackHostileCreeps || attackHostileStructures) {
                    creep.memory.role = 'reaper';
                    return creep.say('role: reaper');
                }
                else {
                    break;
                }
            case 'reaper':
                // name: 'Reaper'
                // role: 'reaper' -> role: 'upgrader'
                // spawn: 'Spawn2'
                if(creep.memory.name == 'Reaper' && creep.memory.role == 'reaper' && !attackHostileCreeps || !attackHostileStructures) {
                    creep.memory.role = 'upgrader';
                    return creep.say('role: upgrader');
                }
                else {
                    break;
                }
                // name: 'Reaper'
                // role: 'reaper' -> role: 'builder'
                // spawn: 'Spawn2'
                if(creep.memory.name == 'Reaper' && creep.memory.role == 'reaper' && findConstructionSites.length > 0) {
                    creep.memory.role = 'builder';
                    return creep.say('role: builder');
                }
                else {
                    break;
                }
            default:
                break;
        }
    },
    // creep harvester mineral logic block
    harvesterLogicMineral: function(creep) {
        function transferEnergyTo(structType) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == structType) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'white'}});
                }
                return true;
            }
            else {
                return false;
            }
        }
        var minerals = creep.room.find(FIND_MINERALS);
        var creepMaxCap = creep.store.getCapacity();
        var creepMineral = creep.store[RESOURCE_ZYNTHIUM];
        // harvesting set flag
        if(creep.memory.harvesting == false && creepMineral == 0) {
            creep.memory.harvesting = true;
            creep.say('⛏️');
        }
        if(creep.memory.harvesting == true && creepMineral == creepMaxCap) {
            creep.memory.harvesting = false;
            creep.say('💡');
        }
        // harvesting
        if(creep.memory.haresting == true) {
            if(creep.harvest(minerals[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(minerals[0], {visualizePathStyle: {stroke: 'yellow'}});
            }
        }
        // transfering minerals
        else {
            // to storage
            transferEnergyTo(STRUCTURE_STORAGE);
            creep.say('storage');
        }
    },
    // creep harvester energy logic block
    harvesterLogic: function(creep) {
        // set mineral flag
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.name == 'Harvester' && creep.memory.spawn == 'Spawn1');
        harvesters[0].memory.mineral = true;

        var creepMaxCap = creep.store.getCapacity();
        var creepEnergy = creep.store[RESOURCE_ENERGY];
        var towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER;
            }
        });
        var towerEnergy = towers[0].store[RESOURCE_ENERGY];
        var spawns = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });
        var roomEnergy = spawns[0].room.energyAvailable;
        var extensions = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION;
            }
        });
        var roomEnergyMaxCap = extensions.length * 50 + 300;
        function transferEnergyTo(structType) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == structType) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'white'}});
                }
                return true;
            }
            else {
                return false;
            }
        }
        // harvesting set flag
        if(creep.memory.harvesting == false && creepEnergy == 0) {
            creep.memory.harvesting = true;
            creep.say('⛏️');
        }
        // transfering set flag
        if(creep.memory.harvesting == true && creepEnergy == creepMaxCap) {
            creep.memory.harvesting = false;
            creep.memory.transfering = true;
            creep.say('💡');
        }
        // harvesting
        if(creep.memory.harvesting == true) { 
            // find sources energy
            var sources = creep.room.find(FIND_SOURCES);
            if(sources.length == 1) {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: 'yellow'}});
                }
            }
            else if(sources.length > 1) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: 'yellow'}});
                }
            }
            /*if(roomEnergy == 0) {
                //containers
                var container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0], {visualizePathStyle: {stroke: 'yellow'}});
                }
            }*/
        }
        // transfering energy
        if(creep.memory.harvesting == false) {
            // to spawns
            var mySpawn = transferEnergyTo(STRUCTURE_SPAWN);
            // to extensions
            if(mySpawn == false) {
                var myExtension = transferEnergyTo(STRUCTURE_EXTENSION);
                creep.say('extension');
            }
            // to links
            if(mySpawn == false && myExtension == false) {
                var myLink = transferEnergyTo(STRUCTURE_LINK);
                creep.say('link');
            }
            // to towers
            if(mySpawn == false && myExtension == false && myLink == false) {
                var myTower = transferEnergyTo(STRUCTURE_TOWER);
                creep.say('tower');
            }
            // to containers
            if(mySpawn == false && myExtension == false && myTower == false && myLink == false) {
                var myContainer = transferEnergyTo(STRUCTURE_CONTAINER);
                creep.say('container');
            }
            // to storage
            if(mySpawn == false && myExtension == false && myTower == false && myLink == false && myContainer == false) {
                var myStorage = transferEnergyTo(STRUCTURE_STORAGE);
                creep.say('storage');
            }
        }
        // transfering process done
        if(mySpawn == false && myExtension == false && myTower == false && myLink == false && myContainer == false && myStorage == false) {
            creep.memory.transfering = false;
        }
    },
    // creep upgrader logic block
    upgraderLogic: function(creep) {
        var creepEnergy = creep.store[RESOURCE_ENERGY];
        var creepMaxCap = creep.store.getCapacity();
        // upgrading set flag
        if(creep.memory.upgrading == true && creepEnergy == 0) {
            creep.memory.upgrading = false;
            creep.say('⛏️');
        }
        if(creep.memory.upgrading == false && creepEnergy == creepMaxCap) {
            creep.memory.upgrading = true;
            creep.say('⬆️');
        }
        // upgrading
        if(creep.memory.upgrading == true) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: 'green'}});
            }
        } 
        if(creep.memory.upgrading == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: 'yellow'}});
            }
        }
    },
    // creep builder logic block
    builderLogic: function(creep) {
        var creepEnergy = creep.store[RESOURCE_ENERGY];
        var creepMaxCap = creep.store.getCapacity();
        var findConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        // building set flag
        if(creep.memory.building == true && creepEnergy == 0) {
            creep.memory.building = false;
            creep.say('⛏️');
        }
        if(creep.memory.building == false && creepEnergy == creepMaxCap && findConstructionSites.length > 0) {
            creep.memory.building = true;
            creep.say('🚧');
        }
        if(creep.memory.building == true && findConstructionSites.length == 0) {
            creep.memory.building = false;
            creep.say('✔️');
        }

        // repairing set flag
        if(creep.memory.repairing == true && creepEnergy == 0) {
            creep.memory.repairing = false;
            creep.say('✔️');
        }
        if(creep.memory.repairing ==  false && creepEnergy == creepMaxCap && findConstructionSites.length == 0) {
            creep.memory.repairing = true;
            creep.say('🧰');
        }
        if(creep.memory.repairing == true && findConstructionSites.length > 0) {
            creep.memory.repairing = false;
            creep.say('🧰');
        }
        if(findConstructionSites.length == 0 && creep.memory.repairing == true) {    
            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && 
                structure.structureType != STRUCTURE_WALL //&&
                //structure.structureType != STRUCTURE_ROAD &&
                //structure.structureType != STRUCTURE_CONTAINER
            });
            if(closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#009933'}});
                }
            }
        }    
        if(creep.memory.building == true) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length > 0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#009933'}});
                   
                }
            }
        }
        if(creep.memory.building == false && creep.memory.repairing == false) {
            var container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) <= 1900;
                }
            });
            if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container[0], {visualizePathStyle: {stroke: 'yellow'}});
            }
            else if(container.length == 0) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: 'yellow'}});
                }
            }
        }
    },
    // more time to life for creep
    moreTTL: function(creep) {
        if(creep.ticksToLive < 100) {
            creep.memory.TTL = true;
        }
        if(creep.ticksToLive >= 1400) {
            creep.memory.TTL = false;
        }
        var spawns = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });
        if(creep.transfer(spawns[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawns[0], {visualizePathStyle: {stroke: 'white'}});
        }
        spawns[0].renewCreep(creep);
    }
};

module.exports = libraryHqc;