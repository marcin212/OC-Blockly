redstone = [];
redstone.blockList = [];
redstone.blockAsText = [];
redstone.toolboxCategory = function (workspace) {
    let xmlList = [];
    redstone.blockList.forEach(function (blockName) {
        if (Blockly.Blocks[blockName]) {
            let block = Blockly.Xml.textToDom(redstone.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};

//GET INPUT

Blockly.Blocks['getInput'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'Number');
        this.appendValueInput('SIDE')
            .setCheck('Side')
            .appendField('get redstone input from side ');
        this.setInputsInline(true);
        this.setHelpUrl('https://ocdoc.cil.li/component:redstone');
    }
};

Blockly.Lua['getInput'] = function (block) {
    const side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.redstone.getInput(' + side + ')', Blockly.Lua.ORDER_MEMBER];
};

redstone.blockList.push('getInput');
redstone.blockAsText['getInput'] = '<xml><block type="getInput"></block></xml>';

//END GET INPUT

//GET OUTPUT

Blockly.Blocks['getOutput'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'Number');
        this.appendValueInput('SIDE')
            .setCheck('Side')
            .appendField('get redstone output from side ');
        this.setInputsInline(true);
        this.setHelpUrl('https://ocdoc.cil.li/component:redstone');
    }
};

Blockly.Lua['getOutput'] = function (block) {
    const side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.redstone.getOutput(' + side + ')', Blockly.Lua.ORDER_MEMBER];
};

redstone.blockList.push('getOutput');
redstone.blockAsText['getOutput'] = '<xml><block type="getOutput"></block></xml>';

//END GET OUTPUT

//SET OUTPUT

Blockly.Blocks['setOutput'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'Number');
        this.appendValueInput('SIDE')
            .setCheck('Side')
            .appendField('set redstone output on side ');
        this.appendValueInput('STRENGTH')
            .setCheck('Number')
            .appendField('to ');
        this.setInputsInline(true);
        this.setTooltip('Sets redstone output and returns old value.');
        this.setHelpUrl('https://ocdoc.cil.li/component:redstone');
    }
};

Blockly.Lua['setOutput'] = function (block) {
    const side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    const strength = Blockly.Lua.valueToCode(block, 'STRENGTH', Blockly.Lua.ORDER_NONE);
    return ['component.redstone.setOutput(' + side + ', ' + strength + ')', Blockly.Lua.ORDER_MEMBER];
};

redstone.blockList.push('setOutput');
redstone.blockAsText['setOutput'] = '<xml><block type="setOutput"></block></xml>';

//END SET OUTPUT

//TODO: bundles