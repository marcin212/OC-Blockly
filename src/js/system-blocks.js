system = [];
system.blockList = [];
system.blockAsText = [];
system.toolboxCategory = function (workspace) {
    var xmlList = [];
    system.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(system.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};


//SLEEP

Blockly.Blocks['sleep'] = {
    init: function () {
        this.appendValueInput('TIME').setCheck('Number').appendField('sleep');
        this.setColour(125);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Lua['sleep'] = function (block) {
    var TIME = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_NONE);
    return 'os.sleep(' + TIME + ')\n';
};

system.blockList.push('sleep');
system.blockAsText['sleep'] = '<xml><block type="sleep"></block></xml>';

//END SLEEP

//IGNORE OUTPUT

Blockly.Blocks['ignoreOutput'] = {
    init: function () {
        this.setColour(125);
        this.appendValueInput('RESULT')
            .appendField('ignore output');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Lua['ignoreOutput'] = function (block) {
    let result = Blockly.Lua.valueToCode(block, 'RESULT', Blockly.Lua.ORDER_NONE);
    return result + '\n';
};

system.blockList.push('ignoreOutput');
system.blockAsText['ignoreOutput'] = '<xml><block type="ignoreOutput"></block></xml>';

//END IGNORE OUTPUT