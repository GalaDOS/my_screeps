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
            if(creep.room.storage.store[RESOURCE_ENERGY] >= 800) {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {reusePath: 10});
                }
            }
        }
    },

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
                creep.moveTo(new RoomPosition(48, 19, 'E31S46'), {reusePath: 50});
            }
            else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10});
                    }
                }
                else{
                    //creep.moveTo(Game.spawns.Spawn1);
                    roleRepairer.run_neighbor(creep);
                }
            }
        }
        else {
            if(creep.room.name == "E32S46") {
                creep.moveTo(new RoomPosition(48, 19, 'E31S46'), {reusePath: 50});
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {reusePath: 10});
                }
            }
        }
    }
};

module.exports = roleBuilder;