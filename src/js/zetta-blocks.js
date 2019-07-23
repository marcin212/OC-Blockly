zetta = [];
zetta.blockList = [];
zetta.blockAsText = [];
zetta.toolboxCategory = function (workspace) {
    let xmlList = [];
    zetta.blockList.forEach(function (blockName) {
        if (Blockly.Blocks[blockName]) {
            let block = Blockly.Xml.textToDom(zetta.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};

//CLEAR NFC DATA

Blockly.Blocks['clearData'] = {
    init: function () {
        this.setColour(125);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.appendDummyInput().appendField('clear NFC data buffer');
        this.setTooltip('clears the Programmer\'s data buffer.');
        this.setHelpUrl('https://zi.bymarcin.com/NFC/NFC-Programmer.md');
    }
};

Blockly.Lua['clearData'] = function (block) {
    return ['component.NFCProgrammer.clearNFCData()', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('clearData');
zetta.blockAsText['clearData'] = '<xml><block type="clearData"></block></xml>';

//END CLEAR NFC DATA

//WRITE NFC DATA

Blockly.Blocks['writeData'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'Boolean');
        this.appendValueInput('DATA')
            .appendField('write NFC data ');
        this.setInputsInline(true);
        this.setTooltip('Writes data to the Programmer\'s buffer. Returns true if the write was successful.');
        this.setHelpUrl('https://zi.bymarcin.com/NFC/NFC-Programmer.md');
    }
};

Blockly.Lua['writeData'] = function (block) {
    let data = Blockly.Lua.valueToCode(block, 'DATA', Blockly.Lua.ORDER_NONE);
    return ['component.NFCProgrammer.writeNFCData(' + data + ')', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('writeData');
zetta.blockAsText['writeData'] = '<xml><block type="writeData"></block></xml>';

//END WRITE NFC DATA

//DATA WAITING

Blockly.Blocks['dataWaiting'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'Boolean');
        this.appendDummyInput()
            .appendField('clear NFC buffer');
        this.setTooltip('Returns true if there is data waiting to be written in the buffer. After a successful write, the buffer is automatically cleared.');
        this.setHelpUrl('https://zi.bymarcin.com/NFC/NFC-Programmer.md');
    }
};

Blockly.Lua['dataWaiting'] = function (block) {
    return ['component.NFCProgrammer.isDataWaiting()', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('dataWaiting');
zetta.blockAsText['dataWaiting'] = '<xml><block type="dataWaiting"></block></xml>';

//END DATA WAITING