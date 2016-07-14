var constant = {
    roomName: ['E32S46', 'E31S46'],

    spawns: {
        E32S46: ['Spawn1'],
        E31S46: ['Spawn2']
    },

    creepNum: {
        E32S46: {
            transfer: 1,
            harvester: 4,
            upgrader: 2,
            builder: 1,
            repairer: 1,
            claimer: 0,
            builder_neighbor: 1,
            upgrader_neighbor: 1,
            total: 11
        },
        E31S46: {
            transfer: 0,
            harvester: 2,
            upgrader: 0,
            builder: 0,
            repairer: 0,
            claimer: 0,
            builder_neighbor: 0,
            upgrader_neighbor: 0,
            total: 2
        }
    },

    creepType: {
        E32S46: {
            transfer: [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            harvester: [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            claimer: [CLAIM,MOVE],
            universal: [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
            threshold: 1000
        },
        E31S46: {
            transfer: [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
            harvester: [WORK,CARRY,MOVE,MOVE],
            claimer: [CLAIM,MOVE],
            universal: [WORK,CARRY,MOVE,MOVE],
            threshold: 250
        }
    },

    creepCounter: function() {
        this.E32S46 = {};
        this.E31S46 = {};
        for(var name in this) {
            this[name].transfer = 0;
            this[name].harvester = 0;
            this[name].upgrader = 0;
            this[name].builder = 0;
            this[name].repairer = 0;
            this[name].claimer = 0;
            this[name].builder_neighbor = 0;
            this[name].upgrader_neighbor = 0;
            this[name].total = 0;
        }
    }
};

module.exports = constant;