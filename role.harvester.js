var roleUpgrader = require('role.upgrader');

var roleHarvester = {
    run: function(creep) {
        /* decide working condition and source number */
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {
            if(creep.room.storage == undefined) {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0],  {reusePath: 5});
                    }
                }
                else{
                    //creep.moveTo(Game.spawns.Spawn1);
                    roleUpgrader.run(creep);
                }
            }
            else {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 15});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);            
            if(creep.harvest(sources[creep.memory.sourceNum]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceNum], {reusePath: 15});
            }
        }
    },

    /* harvest energy from neighbot room */
    run_neighbor: function(creep) {
        /* decide working condition and source number */
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {
            if(creep.room.name == "E32S46") {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 50});
                }
            }
            else {
                creep.moveTo(new RoomPosition(1, 19, 'E32S46'), {reusePath: 25});
            }
        }
        else {
            if(creep.room.name == "E32S46") {
                creep.moveTo(new RoomPosition(48, 19, 'E31S46'), {reusePath: 50});
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {reusePath: 25});
                }
            }
        }
    },

    miner: function(creep) {
        /* decide working condition and source number */
        if(creep.memory.working && creep.carry.K == undefined) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.K == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {
            if(creep.transfer(creep.room.storage, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {reusePath: 15});
            }
        }
        else {
            var mine = creep.room.find(FIND_MINERALS);        
            if(creep.harvest(mine[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mine[0], {reusePath: 15});
            }
        }
    }
};

module.exports = roleHarvester;