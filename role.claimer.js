var roleClaimer = {
    run: function(creep) {
        if(creep.room.name == "E32S46") {
            creep.moveTo(new RoomPosition(48, 19, 'E31S46'), {reusePath: 50});
        }
        else {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {reusePath: 50});
                }
            }
        }
    }
};

module.exports = roleClaimer;