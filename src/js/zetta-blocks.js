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

//READ NFC

Blockly.Blocks['readData'] = {
    init: function () {
        this.setColour(125);
        this.appendDummyInput()
            .appendField('When receive NFC Data');
        this.appendStatementInput('DO')
            .appendField('then');
        this.setTooltip('Returns true if there is data waiting to be written in the buffer. After a successful write, the buffer is automatically cleared.');
        this.setHelpUrl('https://zi.bymarcin.com/NFC/NFC-Programmer.md');
    }
};

Blockly.Lua['readData'] = function (block) {
    let statement = Blockly.Lua.statementToCode(block, 'DO');
    return ['event.listen("nfc_data", function(nfc_data, nfcreader_address, player_name, message_from_nfc) \n' + statement + ' end)', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('readData');
zetta.blockAsText['readData'] = '<xml><block type="readData"></block></xml>';

//END READ NFC

//NFC VARIABLES

Blockly.Blocks['NFC_Variables'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('NFC_data variable: ')
            .appendField(new Blockly.FieldDropdown([
                    ['address', 'nfcreader_address'],
                    ['player', 'player_name'],
                    ['message', 'message_from_nfc']
                ]),
                'VAL');
        this.setOutput(true, 'String');
        this.setColour(125);
        this.setHelpUrl('https://zi.bymarcin.com/NFC/NFC-Programmer.md');
    }
};

Blockly.Lua['NFC_Variables'] = function (block) {
    return [block.getFieldValue('VAL'), Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('NFC_Variables');
zetta.blockAsText['NFC_Variables'] = '<xml><block type="NFC_Variables"></block></xml>';

//END NFC VARIABLES

//----------------BIG BATTERY-------------------------------------------------------------------------------------------

//ENERGY STORED

Blockly.Blocks['batteryEnergyStored'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('battery energy stored');
        this.setOutput(true, 'Number');
        this.setColour(125);
        this.setTooltip('Get stored energy');
    }
};

Blockly.Lua['batteryEnergyStored'] = function (block) {
    return ['component.big_battery.getEnergyStored()', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('batteryEnergyStored');
zetta.blockAsText['batteryEnergyStored'] = '<xml><block type="batteryEnergyStored"></block></xml>';

//END ENERGY STORED

//MAX ENERGY STORED

Blockly.Blocks['batteryMaxEnergyStored'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('battery max storage');
        this.setOutput(true, 'Number');
        this.setColour(125);
        this.setTooltip('Get battery capacity');
    }
};

Blockly.Lua['batteryMaxEnergyStored'] = function (block) {
    return ['component.big_battery.getMaxEnergyStored()', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('batteryMaxEnergyStored');
zetta.blockAsText['batteryMaxEnergyStored'] = '<xml><block type="batteryMaxEnergyStored"></block></xml>';

//END MAX ENERGY STORED

//ENERGY LAST TICK

Blockly.Blocks['energyLastTick'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('energy balance last tick');
        this.setOutput(true, 'Number');
        this.setColour(125);
    }
};

Blockly.Lua['energyLastTick'] = function (block) {
    return ['component.big_battery.getEnergyBalanceLastTick()', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('energyLastTick');
zetta.blockAsText['energyLastTick'] = '<xml><block type="energyLastTick"></block></xml>';

//END ENERGY LAST TICK

//---------------SMARTCARD----------------------------------------------------------------------------------------------

//EVENT smartcard_in

Blockly.Blocks['smartcardIn'] = {
    init: function () {
        this.setColour(125);
        this.appendDummyInput()
            .appendField('When smartcard inserted');
        this.appendStatementInput('DO')
            .appendField('then');
        this.setTooltip('Runs on event smartcard_in');
        this.setHelpUrl('https://zi.bymarcin.com/');
    }
};

Blockly.Lua['smartcardIn'] = function (block) {
    let statement = Blockly.Lua.statementToCode(block, 'DO');
    return ['event.listen("smartcard_in", function(_, address, player) \n' + statement + ' end)', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('smartcardIn');
zetta.blockAsText['smartcardIn'] = '<xml><block type="smartcardIn"></block></xml>';

//END EVENT smartcard_in

//EVENT smartcard_out

Blockly.Blocks['smartcardOut'] = {
    init: function () {
        this.setColour(125);
        this.appendDummyInput()
            .appendField('When smartcard removed');
        this.appendStatementInput('DO')
            .appendField('then');
        this.setTooltip('Runs on event smartcard_out');
        this.setHelpUrl('https://zi.bymarcin.com/');
    }
};

Blockly.Lua['smartcardOut'] = function (block) {
    let statement = Blockly.Lua.statementToCode(block, 'DO');
    return ['event.listen("smartcard_out", function(_, address, player) \n' + statement + ' end)', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('smartcardOut');
zetta.blockAsText['smartcardOut'] = '<xml><block type="smartcardOut"></block></xml>';

//END EVENT smartcard_out

//SMARTCARD VARIABLES

Blockly.Blocks['smartcard_Variables'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('smartcard variable: ')
            .appendField(new Blockly.FieldDropdown([
                    ['address', 'address'],
                    ['player', 'player']
                ]),
                'VAL');
        this.setOutput(true, 'String');
        this.setColour(125);
        this.setTooltip('Variables for use with smartcard_in and smartcard_out.');
        this.setHelpUrl('https://zi.bymarcin.com/');
    }
};

Blockly.Lua['smartcard_Variables'] = function (block) {
    return [block.getFieldValue('VAL'), Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('smartcard_Variables');
zetta.blockAsText['smartcard_Variables'] = '<xml><block type="smartcard_Variables"></block></xml>';

//END SMARTCARD VARIABLES

//SMARTCARD ECDH

Blockly.Blocks['smartcardECDH'] = {
    init: function () {
        this.setColour(125);
        this.setOutput(true, 'String');
        this.appendValueInput('PUBKEY')
            .appendField('generate shared key (ecdh) ');
        this.setInputsInline(true);
        this.setTooltip('Generates a Diffie-Hellman shared key using private key from smartcard and the provided public key.');
        this.setHelpUrl('https://zi.bymarcin.com/');
    }
};

Blockly.Lua['smartcardECDH'] = function (block) {
    let pubkey = Blockly.Lua.valueToCode(block, 'PUBKEY', Blockly.Lua.ORDER_NONE);
    return ['component.smartcard_terminal.ecdh(' + pubkey + ')', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('smartcardECDH');
zetta.blockAsText['smartcardECDH'] = '<xml><block type="smartcardECDH"></block></xml>';

//END SMARTCARD ECDH

//HAS CARD

Blockly.Blocks['hasCard'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('has card?');
        this.setOutput(true, 'Boolean');
        this.setColour(125);
        this.setTooltip('Returns true if card is present.');
        this.setHelpUrl('https://zi.bymarcin.com/');
    }
};

Blockly.Lua['hasCard'] = function (block) {
    return ['component.smartcard_terminal.hasCard()', Blockly.Lua.ORDER_MEMBER];
};

zetta.blockList.push('hasCard');
zetta.blockAsText['hasCard'] = '<xml><block type="hasCard"></block></xml>';

//END HAS CARD

//PROTECT

Blockly.Blocks['protectCard'] = {
    init: function () {
        this.setColour(125);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.appendDummyInput()
            .appendField('Protect card');
        this.setInputsInline(true);
        this.setTooltip('Restricts card access to the player that inserted it.');
        this.setHelpUrl('https://zi.bymarcin.com/');
    }
};

Blockly.Lua['protectCard'] = function (block) {
    return 'component.smartcard_terminal.protect()\n';
};

zetta.blockList.push('protectCard');
zetta.blockAsText['protectCard'] = '<xml><block type="protectCard"></block></xml>';

//END PROTECT

//---------------RF METER-----------------------------------------------------------------------------------------------

//TODO: RF Meter