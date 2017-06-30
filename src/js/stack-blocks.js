robot_stack = [];
robot_stack.blockList = [];
robot_stack.blockAsText = [];
robot_stack.toolboxCategory = function (workspace) {
    var xmlList = [];
    robot_stack.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(robot_stack.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};

//STACK PROPERTIES
var fields = [];
fields['damage'] = 'Number';
fields['label'] = 'String';
fields['name'] = 'String';
fields['size'] = 'Number';

Object.keys(fields).forEach(function (field) {
    Blockly.Blocks['robot_stack_' + field] = {
        init: function () {
            this.appendValueInput('STACK').setCheck('Stack').appendField("get stack " + field);
            this.setInputsInline(true);
            this.setOutput(true, fields[field]);
            this.setColour(212);
            this.setTooltip('Returns a ItemStack ' + field + '.');
            this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
        }
    };

    Blockly.Lua['robot_stack_' + field] = function (block) {
        var slot = Blockly.Lua.valueToCode(block, 'STACK', Blockly.Lua.ORDER_NONE);
        return ['((' + slot + ' or {})[\'' + field + '\'] or '+ ((fields[field]=='Number')?-1:"''") +' )', Blockly.Lua.ORDER_MEMBER];
    };

    robot_stack.blockList.push('robot_stack_' + field);
    robot_stack.blockAsText['robot_stack_' + field] = '<xml><block type="robot_stack_' + field + '"></block></xml>';
});

// END STACK PROPERTIES

// IS EMPTY
Blockly.Blocks['robot_stack_empty'] = {
    init: function () {
        this.appendValueInput('STACK').setCheck('Stack')
        this.appendDummyInput().appendField("is empty");
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setColour(212);
        this.setTooltip('Returns true if ItemStack is empty.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');

    }
};

Blockly.Lua['robot_stack_empty'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'STACK', Blockly.Lua.ORDER_NONE);
    return ['(' + slot + ' == nil)', Blockly.Lua.ORDER_MEMBER];
};

robot_stack.blockList.push('robot_stack_empty');
robot_stack.blockAsText['robot_stack_empty'] = '<xml><block type="robot_stack_empty"></block></xml>';
// END IS EMPTY

// CMP STACK
Blockly.Blocks['robot_stack_cmp'] = {
    init: function () {
        this.appendValueInput('STACK1').setCheck('Stack');
        this.appendValueInput('STACK2').setCheck('Stack').appendField("=");
        this.setInputsInline(true);
        this.appendDummyInput().appendField('compared values: damage').appendField(new Blockly.FieldCheckbox('FALSE'), 'DAMAGE');
        this.appendDummyInput().appendField('  label').appendField(new Blockly.FieldCheckbox('TRUE'), 'LABEL');
        this.appendDummyInput().appendField('  name').appendField(new Blockly.FieldCheckbox('TRUE'), 'NAME');
        this.appendDummyInput().appendField('  size').appendField(new Blockly.FieldCheckbox('FALSE'), 'SIZE');
        this.setOutput(true, 'Boolean');
        this.setColour(212);
        this.setTooltip('Returns true if ItemStack is empty.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');

    }
};

Blockly.Lua['robot_stack_cmp'] = function (block) {
    var stack1 = Blockly.Lua.valueToCode(block, 'STACK1', Blockly.Lua.ORDER_NONE);
    var stack2 = Blockly.Lua.valueToCode(block, 'STACK2', Blockly.Lua.ORDER_NONE);
    var name = block.getFieldValue('NAME') == 'TRUE';
    var damage = block.getFieldValue('DAMAGE') == 'TRUE';
    var label = block.getFieldValue('LABEL') == 'TRUE';
    var size = block.getFieldValue('SIZE') == 'TRUE';
    var cmp = [];
    if (name) {
        cmp.push(stack1 + '[name]==' + stack2 + '[name]');
    }
    if (damage) {
        cmp.push(stack1 + '[damage]==' + stack2 + '[damage]');
    }
    if (label) {
        cmp.push(stack1 + '[label]==' + stack2 + '[label]');
    }
    if (size) {
        cmp.push(stack1 + '[size]==' + stack2 + '[size]');
    }

    var code = '(' + stack1 + '~=nil and ' + stack2 + '~=nil';
    if (cmp.length > 0) {
        code += ' and '
    }
    for (var i = 0; i < cmp.length; i++) {
        code += cmp[i];
        if (i != cmp.length - 1) {
            code += ' and ';
        }
    }
    code += ')';

    return [code, Blockly.Lua.ORDER_MEMBER];
};

robot_stack.blockList.push('robot_stack_cmp');
robot_stack.blockAsText['robot_stack_cmp'] = '<xml><block type="robot_stack_cmp"></block></xml>';


//END CMP STACK

// CREATE STACK
Blockly.Blocks['robot_stack_create'] = {
    init: function () {
        this.appendDummyInput().appendField('create item stack');
        this.appendValueInput('NAME').setCheck('String').appendField("name");
        this.appendValueInput('DAMAGE').setCheck('Number').appendField("damage");
        this.appendValueInput('LABEL').setCheck('String').appendField("label");
        this.appendValueInput('SIZE').setCheck('Number').appendField("size");
        this.setInputsInline(false);
        this.setOutput(true, 'Stack');
        this.setColour(212);
        this.setTooltip('Returns new ItemStack.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');

    }
};

Blockly.Lua['robot_stack_create'] = function (block) {

    var NAME = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_NONE);
    var DAMAGE = Blockly.Lua.valueToCode(block, 'DAMAGE', Blockly.Lua.ORDER_NONE);
    var LABEL = Blockly.Lua.valueToCode(block, 'LABEL', Blockly.Lua.ORDER_NONE);
    var SIZE = Blockly.Lua.valueToCode(block, 'SIZE', Blockly.Lua.ORDER_NONE);
    var code = '{["name"] = ' + (NAME == '' ? 'nil' : NAME) + ', ["damage"] = ' + (DAMAGE == '' ? 'nil' : DAMAGE) + ', ["label"] = ' + (LABEL == '' ? 'nil' : LABEL) + ', ["size"] = ' + (SIZE == '' ? 'nil' : SIZE) + '}';
    return [code, Blockly.Lua.ORDER_MEMBER];
};

robot_stack.blockList.push('robot_stack_create');
robot_stack.blockAsText['robot_stack_create'] = '<xml><block type="robot_stack_create"></block></xml>';

























