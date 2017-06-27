robot_inventory = [];
robot_inventory.blockList = [];
robot_inventory.blockAsText = [];
robot_inventory.toolboxCategory = function (workspace) {
    var xmlList = [];
    robot_inventory.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(robot_inventory.blockAsText[blockName]).firstChild;
            xmlList.push(block);
            console.log(blockName)
            console.log(block)
        }
    });
    return xmlList;
};


// GET STACK IN SLOT
Blockly.Blocks['robot_inv'] = {
    init: function() {
        this.appendValueInput('SIDE').setCheck('Side').appendField("stack from inventory on");
        this.appendValueInput('SLOT').setCheck('Number').appendField("from slot: ");
        this.setInputsInline(true);
        this.setOutput(true, 'Slot');
    }
};


Blockly.Lua['robot_inv'] = function(block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getStackInSlot('+ side + ',' + slot +')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_inv');
robot_inventory.blockAsText['robot_inv'] = '<xml><block type="robot_inv"></block></xml>';


// END GET STACK IN SLOT