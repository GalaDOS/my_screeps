var roleRepairer = require('role.repairer');

var roleBuilder = {
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
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
			else{
				//creep.moveTo(Game.spawns.Spawn1);
				roleRepairer.run(creep);
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

module.exports = roleBuilder;