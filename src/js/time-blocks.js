time = [];
time.blockList = [];
time.blockAsText = [];
time.toolboxCategory = function (workspace) {
    let xmlList = [];
    time.blockList.forEach(function (blockName) {
        if (Blockly.Blocks[blockName]) {
            let block = Blockly.Xml.textToDom(time.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};

//DATE

Blockly.Blocks['dateFormatted'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'String');
        this.appendValueInput('FORMAT')
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('format date ');
        this.setInputsInline(true);
        this.setTooltip('Returns the ingame formatted date.');
        this.setHelpUrl('https://www.lua.org/pil/22.1.html');
    }
};

Blockly.Lua['dateFormatted'] = function (block) {
    const format = Blockly.Lua.valueToCode(block, 'FORMAT', Blockly.Lua.ORDER_NONE);
    return ['os.date(' + format + ')', Blockly.Lua.ORDER_MEMBER];
};

time.blockList.push('dateFormatted');
time.blockAsText['dateFormatted'] = '<xml><block type="dateFormatted"></block></xml>';

//END DATE

//GAME HOUR

Blockly.Blocks['gameHour'] = {
    init: function () {
        this.setColour(125);
        this.appendDummyInput().appendField('hour');
        this.setOutput(true, 'Number');
        this.setTooltip('Returns the ingame hour.');
    }
};

Blockly.Lua['gameHour'] = function (block) {
    return ['os.date(\'%H\')', Blockly.Lua.ORDER_MEMBER];
};

time.blockList.push('gameHour');
time.blockAsText['gameHour'] = '<xml><block type="gameHour"></block></xml>';

//END GAME HOUR

//GAME MINUTE

Blockly.Blocks['gameMinute'] = {
    init: function () {
        this.setColour(125);
        this.appendDummyInput().appendField('minute');
        this.setOutput(true, 'Number');
        this.setTooltip('Returns the ingame minute.');
    }
};

Blockly.Lua['gameMinute'] = function (block) {
    return ['os.date(\'%M\')', Blockly.Lua.ORDER_MEMBER];
};

time.blockList.push('gameMinute');
time.blockAsText['gameMinute'] = '<xml><block type="gameMinute"></block></xml>';

//END GAME MINUTE