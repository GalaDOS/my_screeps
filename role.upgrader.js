var roleUpgrader = {
    run: function(creep) {
        /* decide working condition and source number */
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if(creep.memory.working) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 10});
            }
        }
        else {
            var targets = creep.room.find(FIND_DROPPED_RESOURCES);
            if(targets.length) {
                if(targets[0].energy > 150) {
                    creep.moveTo(targets[0], {reusePath: 10});
                    creep.pickup(targets[0]);
                    return;
                }
            }

            if(creep.room.storage.store[RESOURCE_ENERGY] >= 500) {
                if(creep.room.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 10});
                }
            }
        }
    }
};

module.exports = roleUpgrader;