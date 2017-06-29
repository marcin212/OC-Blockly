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

//


// MOVE

function move(dir, beep, msg, sleep) {
    var code = 'while not robot.' + dir + '() do\n';
    if (msg != '') {
        code += '\tprint(' + msg + ')\n';
    }
    if (beep == 'TRUE') {
        code += '\tcomponent.computer.beep(1000, 0.5)\n';
    }
    code += '\tos.sleep(' + sleep + ')\nend\n';
    return code
}


Blockly.Blocks['robot_move'] = {
    init: function () {
        this.appendDummyInput().appendField('move')
            .appendField(new Blockly.FieldDropdown([
                    ['forward', 'forward'],
                    ['back', 'back'],
                    ['down', 'down'],
                    ['up', 'up']
                ]),
                'DIR');
        this.appendDummyInput().appendField('beep when fail:').appendField(new Blockly.FieldCheckbox('TRUE'), 'BEEP');
        this.appendValueInput('MSG').setCheck('String').appendField('message on fail:');
        this.appendValueInput('SLEEP').setCheck('Number').appendField('sleep before next attempt');
        this.setColour(125);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Lua['robot_move'] = function (block) {
    var DIR = block.getFieldValue('DIR');
    var BEEP = block.getFieldValue('BEEP');
    var MSG = Blockly.Lua.valueToCode(block, 'MSG', Blockly.Lua.ORDER_NONE);
    var SLEEP = Blockly.Lua.valueToCode(block, 'SLEEP', Blockly.Lua.ORDER_NONE);
    return move(DIR, BEEP, MSG, SLEEP);
};

robot_move.blockList.push('robot_move');
robot_move.blockAsText['robot_move'] = '<xml><block type="robot_move">' +
    '<value name="SLEEP">' +
    '<shadow type="math_number">' +
    '<field name="NUM">1</field>' +
    '</shadow>' +
    '</value>' +
    '</block></xml>';

// END MOVE


//TURN


Blockly.Blocks['robot_turn'] = {
    init: function () {
        this.appendDummyInput().appendField('turn')
            .appendField(new Blockly.FieldDropdown([
                    ['left', 'turnLeft'],
                    ['right', 'turnRight'],
                    ['around', 'turnAround']
                ]),
                'DIR');
        this.setColour(125);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Lua['robot_turn'] = function (block) {
    return 'robot.' + block.getFieldValue('DIR') + '()\n';
};

robot_move.blockList.push('robot_turn');
robot_move.blockAsText['robot_turn'] = '<xml><block type="robot_turn"></block></xml>';

//END TURN