robot_sides = [];
robot_sides.blockList = [];
robot_sides.blockAsText = [];
robot_sides.toolboxCategory = function (workspace) {
    var xmlList = [];
    robot_sides.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(robot_sides.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};

//BLOCK SIDE
Blockly.Blocks['robot_sides'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('side:')
            .appendField(new Blockly.FieldDropdown([
                ['front', 'sides.front'],
                ['back', 'sides.back'],
                ['left', 'sides.left'],
                ['right', 'sides.right'],
                ['down', 'sides.down'],
                ['up', 'sides.up']
            ]),
            'SIDE');
        this.setOutput(true, 'Side');
        this.setColour(125);
    }
};

Blockly.Lua['robot_sides'] = function(block) {
    return [block.getFieldValue('SIDE'), Blockly.Lua.ORDER_MEMBER];
};

robot_sides.blockList.push('robot_sides');
robot_sides.blockAsText['robot_sides'] = '<xml><block type="robot_sides"></block></xml>';
// END SIDE

