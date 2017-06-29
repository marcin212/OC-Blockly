geolyzer = [];
geolyzer.blockList = [];
geolyzer.blockAsText = [];
geolyzer.toolboxCategory = function (workspace) {
    var xmlList = [];
    geolyzer.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(geolyzer.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};


// ANALYZE
Blockly.Blocks['geolyzer_analyze'] = {
    init: function() {
        this.appendValueInput('SIDE').setCheck('Side').appendField("analyze on");
        this.setInputsInline(true);
        this.setOutput(true, 'String');
        this.setColour(212);
        this.setTooltip('Returns block name at the specified side.');
        this.setHelpUrl('http://ocdoc.cil.li/component:geolyzer');

    }
};

Blockly.Lua['geolyzer_analyze'] = function(block) {
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getInventorySize('+ side + ')', Blockly.Lua.ORDER_MEMBER];
};

geolyzer.blockList.push('geolyzer_analyze');
geolyzer.blockAsText['geolyzer_analyze'] = '<xml><block type="geolyzer_analyze"></block></xml>';
// ANALYZE