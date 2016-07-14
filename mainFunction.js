var constant = require('constant');

var mainFunction = {
    /*maintain number of creeps*/
    maintainCreeps : function(room) {
        var roomName = room.name;
        var creepType = constant.creepType[roomName];
        var creepsNum = constant.creepNum[roomName];
        var spawn = Game.spawns[constant.spawns[roomName][0]];
        var count = new constant.creepCounter();
        for(var name in Game.creeps) {
            var mem = Game.creeps[name].memory;
            count[mem.room][mem.role] += 1;
        }

        
        if(count[roomName].transfer < creepsNum.transfer) {
            if(room.energyAvailable >= 500) {
                var newName = spawn.createCreep(creepType.transfer, undefined, {role: 'transfer', room: roomName, working: false});
            }
            else {
                var newName = spawn.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'transfer', room: roomName, working: false});
            }
            return;
        }

        if(count[roomName].harvester < creepsNum.harvester) {
            if(roomName == 'E32S46') {
                if(room.energyAvailable >= creepType.threshold) {
                    if(room.memory.sourceNum == 0)
                        var newName = spawn.createCreep(creepType.harvester, undefined, {role: 'harvester', room: roomName, working: false, sourceNum: room.memory.sourceNum});
                    else
                        var newName = spawn.createCreep(creepType.universal, undefined, {role: 'harvester', room: roomName, working: false, sourceNum: room.memory.sourceNum});
                    room.memory.sourceNum = room.memory.sourceNum == 0 ? 1 : 0;
                }
                else if(count[roomName].harvester < 3 && room.energyAvailable >= 200) {//avoid starvation 
                    var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', room: roomName, working: false, sourceNum: room.memory.sourceNum});
                    room.memory.sourceNum = room.memory.sourceNum == 0 ? 1 : 0;
                }
            }
            else {
                var newName = spawn.createCreep(creepType.harvester, undefined, {role: 'harvester', room: roomName, working: false, sourceNum: 0});
            }
            return;
        }

        if(room.energyAvailable >= creepType.threshold) {
            if(count[roomName].upgrader < creepsNum.upgrader) {
                var newName = spawn.createCreep(creepType.universal, undefined, {role: 'upgrader', room: roomName, working: false});
                return;
            }

            if(count[roomName].builder < creepsNum.builder) {
                var newName = spawn.createCreep(creepType.universal, undefined, {role: 'builder', room: roomName, working: false});
                return;
            }

            if(count[roomName].repairer < creepsNum.repairer) {
                var newName = spawn.createCreep(creepType.universal, undefined, {role: 'repairer', room: roomName, working: false});
                return;
            }

            if(count[roomName].claimer < creepsNum.claimer) {
                var newName = spawn.createCreep(creepType.claimer, undefined, {role: 'claimer', room: roomName});
                return;
            }

            if(count[roomName].upgrader_neighbor < creepsNum.upgrader_neighbor) {
                var newName = spawn.createCreep(creepType.universal, undefined, {role: 'upgrader_neighbor', room: roomName});
                return;
            }

            if(count[roomName].builder_neighborh < creepsNum.builder_neighbor) {
                var newName = spawn.createCreep(creepType.universal, undefined, {role: 'builder_neighbor', room: roomName});
                return;
            }
        }
    }
};

module.exports = mainFunction;