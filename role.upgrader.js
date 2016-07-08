var roleUpgrader = {
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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
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

module.exports = roleUpgrader;