var mainFunction = {
    /*maintain number of creeps*/
    maintainCreeps : function() {
        var room = Game.spawns.Spawn1.room;
        var creepType = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var harvesterType = [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];        
        var transferType = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]; 
        var claimerType = [CLAIM,MOVE]; 
        var creepsNumIndex = room.memory.underAttack ? 1 : 0;
        var creepsNum = [[1, 4, 2, 1, 1, 0, 1, 1], [1, 4, 1, 0, 1, 0, 0, 0]];//transfer, harvester, upgrader, builder, repairer, claimer
        var transfer = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
        if(transfer.length < creepsNum[creepsNumIndex][0]) {
            if(room.energyAvailable >= 500) {
                var newName = Game.spawns.Spawn1.createCreep(transferType, undefined, {role: 'transfer', working: false});
            }
            else
            {
                var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'transfer', working: false});
            }
            return;
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < creepsNum[creepsNumIndex][1]) {
            if(room.energyAvailable >= 1000) {
                if(room.memory.sourceNum == 0)
                    var newName = Game.spawns.Spawn1.createCreep(harvesterType, undefined, {role: 'harvester', working: false, sourceNum: room.memory.sourceNum});
                else
                    var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'harvester', working: false, sourceNum: room.memory.sourceNum});
                room.memory.sourceNum = room.memory.sourceNum == 0 ? 1 : 0;
            }
            else if(harvesters.length < 3 && room.energyAvailable >= 200) {//avoid starvation 
                var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', working: false, sourceNum: room.memory.sourceNum});
                room.memory.sourceNum = room.memory.sourceNum == 0 ? 1 : 0;
            }
            return;
        }

        if(room.energyAvailable >= 800){
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            if(upgraders.length < creepsNum[creepsNumIndex][2]) {
                var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'upgrader', working: false});
                return;
            }
            if(creepsNum[creepsNumIndex][3] > 0) {
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                if(builders.length < creepsNum[creepsNumIndex][3]) {
                    var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'builder', working: false});
                    return;
                }
            }
            if(creepsNum[creepsNumIndex][4] > 0) {
                var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
                if(repairer.length < creepsNum[creepsNumIndex][4]) {
                    var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'repairer', working: false});
                    return;
                }
            }
            if(creepsNum[creepsNumIndex][5] > 0) {
                var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
                if(claimer.length < creepsNum[creepsNumIndex][5]) {
                    var newName = Game.spawns.Spawn1.createCreep(claimerType, undefined, {role: 'claimer'});
                    return;
                }
            }
            if(creepsNum[creepsNumIndex][6] > 0) {
                var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader_neighbor');
                if(claimer.length < creepsNum[creepsNumIndex][6]) {
                    var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'upgrader_neighbor'});
                    return;
                }
            }
            if(creepsNum[creepsNumIndex][7] > 0) {
                var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder_neighbor');
                if(claimer.length < creepsNum[creepsNumIndex][7]) {
                    var newName = Game.spawns.Spawn1.createCreep(creepType, undefined, {role: 'builder_neighbor'});
                    return;
                }
            }
        }
    }
};

module.exports = mainFunction;