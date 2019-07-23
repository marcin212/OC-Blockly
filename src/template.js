example = [];
example.blockList = [];
example.blockAsText = [];
example.toolboxCategory = function (workspace) {
    let xmlList = [];
    example.blockList.forEach(function (blockName) {
        if (Blockly.Blocks[blockName]) {
            let block = Blockly.Xml.textToDom(example.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};

//Getter
Blockly.Blocks['exampleGetter'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('example text');
        this.setOutput(true, 'Number');//String, Boolean
        this.setColour(125);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Lua['exampleGetter'] = function (block) {
    return ['getExample()', Blockly.Lua.ORDER_MEMBER];
};

example.blockList.push('exampleGetter');
example.blockAsText['exampleGetter'] = '<xml><block type="exampleGetter"></block></xml>';

//Action
Blockly.Blocks['exampleAction'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'Boolean');//or false
        this.appendValueInput('VAR1')
            .appendField('input label');
        this.setInputsInline(true);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Lua['exampleAction'] = function (block) {
    let var1 = Blockly.Lua.valueToCode(block, 'VAR1', Blockly.Lua.ORDER_NONE);
    return ['some.action(' + data + ')', Blockly.Lua.ORDER_MEMBER];
};

example.blockList.push('exampleAction');
example.blockAsText['exampleAction'] = '<xml><block type="exampleAction"></block></xml>';

//Code Block
Blockly.Blocks['exampleBlock'] = {
    init: function () {
        this.setColour(125);
        this.appendDummyInput()
            .appendField('example label');
        this.appendStatementInput('DO')
            .appendField('then');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Lua['exampleBlock'] = function (block) {
    let statement = Blockly.Lua.statementToCode(block, 'DO');
    return ['event.listen("", function() \n' + statement + ' end)', Blockly.Lua.ORDER_MEMBER];
};

example.blockList.push('exampleBlock');
example.blockAsText['exampleBlock'] = '<xml><block type="exampleBlock"></block></xml>';