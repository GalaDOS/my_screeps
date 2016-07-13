var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roletransfer = require('role.transfer');
var roleClaimer = require('role.claimer');
var mainFunction = require('mainFunction');
var battleDefend = require('battle.defend');

module.exports.loop = function () {

    /* delete dead creeps' memory */
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    /* maintain number of creeps */
    var creeps = _.filter(Game.creeps, (c) => true);
    if(creeps.length < 11 || Game.rooms["E32S46"].memory.underAttack){
        mainFunction.maintainCreeps();
    }

    /* run creeps' functions */
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if(creep.memory.role == 'transfer') {
            roletransfer.run(creep);
        }
        else if(creep.memory.role == 'harvester_neighbor') {
            roleHarvester.run_neighbor(creep);
        }
        else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(creep.memory.role == 'upgrader_neighbor') {
            roleUpgrader.run_neighbor(creep);
        }
        else if(creep.memory.role == 'builder_neighbor') {
            roleBuilder.run_neighbor(creep);
        }
    }

    /* protect room */
    battleDefend.checkEnemy(Game.rooms["E32S46"]); 
}