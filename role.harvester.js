var roleUpgrader = require('role.upgrader');

var roleHarvester = {
    run: function(creep) {
        /* decide working condition and source number */
	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
			var sources = creep.room.find(FIND_SOURCES);
            if(sources.length > 1) {
                creep.memory.sourceNum = sources[0].energy > sources[1].energy ? 0 : 1;
            }
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	    }

	    if(creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else{
                //creep.moveTo(Game.spawns.Spawn1);
                roleUpgrader.run(creep);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.sourceNum]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceNum]);
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
                /* transfer energy */
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
                else{
                    //creep.moveTo(Game.spawns.Spawn1);
                    roleUpgrader.run(creep);
                }
            }
            else {
                /* move to base room */
                creep.moveTo(new RoomPosition(1, 19, 'E32S46'), {reusePath: 10});
            }
        }
        else {
            if(creep.room.name == "E32S46") {
                creep.moveTo(new RoomPosition(48, 19, 'E31S46'), {reusePath: 10});
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }               
            }
        }
	}
};

module.exports = roleHarvester;