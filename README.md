# my_screeps
###V1.0.0
Add basic function:
* **main.js**:
 1. remove dead creeps' memory
 2. maintain number of creeps
 3. run role-function
* **role.builder.js**: role-function of builder, change to repairer when no task
* **role.harvester.js**: role-function of harvester, change to upgrader when source is full
* **role.repairer.js**: role-function of repairer, used to repair roads and strength walls
* **role.upgrader.js**: role-function of upgrader, used to upgrade control-center

###V1.0.1
* Harvest the source which has more energy.
* Adjust code structure.

###V1.0.2
* Harvest source from neighbor room.

###V1.1.0
* **New source distribution method**: RCL-4 will unlock the storage-structure, it allows me to use more effective source distribution method
* **Add basic defend (Tower)**: since I harvest source from neighbor room, random invader npc will attack my creeps
