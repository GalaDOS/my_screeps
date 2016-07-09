var battleDefend = {
    checkEnemy: function(room) {
        var targets = room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
            if(!room.memory.underAttack) {
                room.memory.underAttack = true;
            }
            this.roomDefend(room, targets);
        }
        else {
            if(room.memory.underAttack) {
                room.memory.underAttack = false;
            }
        }
    },

    roomDefend: function(room, targets) {
        var towers = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER);}
            }
        );
        if(towers.length) {
            towers[0].attack(targets[0]);
        }  
	}
};

module.exports = battleDefend;