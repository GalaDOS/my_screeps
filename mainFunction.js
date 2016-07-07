/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('mainFunction');
 * mod.thing == 'a thing'; // true
 */

var mainFunction = {

    /*maintain number of creeps*/
     maintainCreeps : function() {
        var creepType = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < 4) {
            if(Game.spawns.Spawn1.room.energyAvailable >= 800) {
                var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'harvester', working: true, sourceNum: 0});
            }
            else if(harvesters.length == 0) {//avoid starvation 
                var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', working: true, sourceNum: 0});
            }
        }
        if(Game.spawns.Spawn1.room.energyAvailable >= 800){
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            if(upgraders.length < 1) {
                var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'upgrader', working: true, sourceNum: 0});
            }
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if(builders.length < 3) {
                var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'builder', working: true, sourceNum: 0});
            }
            var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            if(repairer.length < 2) {
                var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'repairer', working: true, sourceNum: 0});
            }
        }
    }
};

module.exports = mainFunction;