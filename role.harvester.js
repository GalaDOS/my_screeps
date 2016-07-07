/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader');

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
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
	}
};

module.exports = roleHarvester;