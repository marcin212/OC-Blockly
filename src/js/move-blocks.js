robot_move = [];
robot_move.blockList = [];
robot_move.blockAsText = [];
robot_move.toolboxCategory = function (workspace) {
    var xmlList = [];
    robot_move.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(robot_move.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};


// MOVE

Blockly.Blocks['robot_move'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                    ['forward', 'sides.front'],
                    ['back', 'sides.back'],
                    ['turn left', 'sides.left'],
                    ['turn right', 'sides.right'],
                    ['down', 'sides.down'],
                    ['up', 'sides.up'],
                    ['turn around', 'sides.up']
                ]),
                'DIR');
        this.setColour(125);
    }
};

Blockly.Lua['robot_move'] = function(block) {
    return [block.getFieldValue('SIDE'), Blockly.Lua.ORDER_MEMBER];
};

robot_sides.blockList.push('robot_move');
robot_sides.blockAsText['robot_move'] = '<xml><block type="robot_move"></block></xml>';

// END MOVE


