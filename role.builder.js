var roleRepairer = require('role.repairer');

var roleBuilder = {
    run: function(creep) {
        /* decide working condition and source number */
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;		
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
            if(creep.room.storage.store[RESOURCE_ENERGY] >= 500) {
                if(creep.room.storage.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 10});
                }
            }
        }
    }
};

module.exports = roleBuilder;