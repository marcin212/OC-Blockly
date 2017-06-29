robot_inventory = [];
robot_inventory.blockList = [];
robot_inventory.blockAsText = [];
robot_inventory.toolboxCategory = function (workspace) {
    var xmlList = [];
    robot_inventory.blockList.forEach(function (blockName) {
        var block = Blockly.Blocks[blockName];
        if (block) {
            var block = Blockly.Xml.textToDom(robot_inventory.blockAsText[blockName]).firstChild;
            xmlList.push(block);
        }
    });
    return xmlList;
};


// INVENTORY SIZE
Blockly.Blocks['robot_inv_size'] = {
    init: function () {
        this.appendValueInput('SIDE').setCheck('Side').appendField("size of the inventory on");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(212);
        this.setTooltip('Returns the size of the inventory at the specified side.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');

    }
};

Blockly.Lua['robot_inv_size'] = function (block) {
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getInventorySize(' + side + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_inv_size');
robot_inventory.blockAsText['robot_inv_size'] = '<xml><block type="robot_inv_size"></block></xml>';
// END INVENTORY SIZE

// GET STACK IN SLOT
Blockly.Blocks['robot_inv'] = {
    init: function () {
        this.appendValueInput('SIDE').setCheck('Side').appendField("stack from inventory on");
        this.appendValueInput('SLOT').setCheck('Number').appendField("from slot: ");
        this.setInputsInline(true);
        this.setOutput(true, 'Stack');
        this.setColour(212);
        this.setTooltip('Returns a ItemStack describing the item in the specified slot or nil. Robot\'s inventory, see \'stack from internal inventory on\'.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
    }
};

Blockly.Lua['robot_inv'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getStackInSlot(' + side + ',' + slot + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_inv');
robot_inventory.blockAsText['robot_inv'] = '<xml><block type="robot_inv"></block></xml>';
// END GET STACK IN SLOT

// GET STACK IN INTERNAL SLOT
Blockly.Blocks['robot_internal_inv'] = {
    init: function () {
        this.appendValueInput('SLOT').setCheck('Number').appendField("stack from internal inventory form slot");
        this.setInputsInline(true);
        this.setOutput(true, 'Stack');
        this.setColour(212);
        this.setTooltip('Returns a ItemStack describing the item in the specified slot in Robot\'s inventory.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
    }
};

Blockly.Lua['robot_internal_inv'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getStackInInternalSlot(' + slot + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_internal_inv');
robot_inventory.blockAsText['robot_internal_inv'] = '<xml><block type="robot_internal_inv"></block></xml>';

// END GET STACK IN INTERNAL SLOT

//DROP INTO SLOT
Blockly.Blocks['robot_drop_inv'] = {
    init: function () {
        this.appendValueInput('COUNT').setCheck('Number').appendField("drop at least");
        this.appendValueInput('SIDE').setCheck('Side').appendField("items into inventory on");
        this.appendValueInput('SLOT').setCheck('Number').appendField("to slot ");
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setColour(212);
        this.setTooltip('Puts up to count items from the currently selected slot into the specified slot of the inventory at the specified side.\n' +
            'Returns: true if at least one item was moved, false and a secondary result that describes the error otherwise.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
    }
};

Blockly.Lua['robot_drop_inv'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    var count = Blockly.Lua.valueToCode(block, 'COUNT', Blockly.Lua.ORDER_NONE);
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.dropIntoSlot(' + side + ',' + slot + ',' + count + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_drop_inv');
robot_inventory.blockAsText['robot_drop_inv'] = '<xml><block type="robot_drop_inv"></block></xml>';

//END DROP INTO SLOT

//SUCK FROM SLOT
Blockly.Blocks['robot_suck_inv'] = {
    init: function () {
        this.appendValueInput('COUNT').setCheck('Number').appendField("takes up to");
        this.appendValueInput('SIDE').setCheck('Side').appendField("items from inventory on");
        this.appendValueInput('SLOT').setCheck('Number').appendField("from slot ");
        this.setInputsInline(true);
        this.setOutput(true, 'Boolean');
        this.setColour(212);
        this.setTooltip('Takes up to count items from the specified slot of the inventory at the specified side and puts them into the currently selected slot.\n' +
            'Returns: true if at least one item was moved, false otherwise.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
    }
};

Blockly.Lua['robot_suck_inv'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    var count = Blockly.Lua.valueToCode(block, 'COUNT', Blockly.Lua.ORDER_NONE);
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.suckFromSlot(' + side + ',' + slot + ',' + count + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_suck_inv');
robot_inventory.blockAsText['robot_suck_inv'] = '<xml><block type="robot_suck_inv"></block></xml>';

//END SUCK FROM SLOT

//GET SLOT STACK SIZE
Blockly.Blocks['robot_stack_size_inv'] = {
    init: function () {
        this.appendValueInput('SLOT').setCheck('Number').appendField("gets number of items in slot");
        this.appendValueInput('SIDE').setCheck('Side').appendField("in inventory on");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(212);
        this.setTooltip('Gets number of items in specified slot in inventory on the specified side.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
    }
};

Blockly.Lua['robot_stack_size_inv'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getSlotStackSize(' + side + ',' + slot + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_stack_size_inv');
robot_inventory.blockAsText['robot_stack_size_inv'] = '<xml><block type="robot_stack_size_inv"></block></xml>';
//END GET SLOT STACK SIZE

//GET GET SLOT MAX STACK SIZE
Blockly.Blocks['robot_stack_maxsize_inv'] = {
    init: function () {
        this.appendValueInput('SLOT').setCheck('Number').appendField("gets maximum number of items in slot");
        this.appendValueInput('SIDE').setCheck('Side').appendField("in inventory on");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(212);
        this.setTooltip('Gets maximum number of items in specified slot in inventory on the specified side.');
        this.setHelpUrl('http://ocdoc.cil.li/component:inventory_controller');
    }
};

Blockly.Lua['robot_stack_maxsize_inv'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    var side = Blockly.Lua.valueToCode(block, 'SIDE', Blockly.Lua.ORDER_NONE);
    return ['component.inventory_controller.getSlotStackSize(' + side + ',' + slot + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_stack_maxsize_inv');
robot_inventory.blockAsText['robot_stack_maxsize_inv'] = '<xml><block type="robot_stack_maxsize_inv"></block></xml>';
//END GET SLOT MAX STACK SIZE


// INTERNAL INVENTORY SIZE
Blockly.Blocks['robot_internal_inv_size'] = {
    init: function () {
        this.appendDummyInput().appendField("size of internal robot inventory");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(212);
        this.setTooltip('Returns the amount of select-able internal robot inventory slots.');
        this.setHelpUrl('http://ocdoc.cil.li/api:robot');
    }
};

Blockly.Lua['robot_internal_inv_size'] = function (block) {
    return ['robot.inventorySize()', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_internal_inv_size');
robot_inventory.blockAsText['robot_internal_inv_size'] = '<xml><block type="robot_internal_inv_size"></block></xml>';
//  END INTERNAL INVENTORY SIZE

// SELECT INTERNAL SLOT
Blockly.Blocks['robot_select_internal_slot'] = {
    init: function () {
        this.appendValueInput('SLOT').setCheck('Number').appendField("select internal slot");
        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(212);
        this.setTooltip('Selects the given inventory slot (if specified) and returns the current inventory slot.');
        this.setHelpUrl('http://ocdoc.cil.li/api:robot');
    }
};

Blockly.Lua['robot_select_internal_slot'] = function (block) {
    var slot = Blockly.Lua.valueToCode(block, 'SLOT', Blockly.Lua.ORDER_NONE);
    return ['robot.select(' + slot + ')', Blockly.Lua.ORDER_MEMBER];
};

robot_inventory.blockList.push('robot_select_internal_slot');
robot_inventory.blockAsText['robot_select_internal_slot'] = '<xml><block type="robot_select_internal_slot"></block></xml>';
//  END SELECT INTERNAL SLOT

/*

 equip():boolean
 Swaps the content of the robot's tool slot with the content of the currently selected inventory slot.
 Returns: true if the items were swapped, false otherwise. This operation usually succeeds.
 Note that you can put any kind of item into the robot's tool slot, not only tools, even items that the robot cannot use at all.
 store(side:number, slot:number, dbAddress:string, dbSlot:number):boolean
 Stores the Itemstack description of the item from the specified slot in an inventory on the specified side, into a specified database slot with the specified address.
 storeInternal(slot:number, dbAddress:string, dBslot:number):boolean
 Stores Itemstack description of item in specified robot inventory slot into specified database slot with the specified database address.
 compareToDatabase(slot:number, dBaddress:string, dBslot:number):boolean
 Compare Itemstack description in specified slot with one in specified slot of a database with specified address. Returns true if items match.
 compareStacks(side:number, slotA:number, slotB:number):boolean
 Checks to see if Itemstack descriptions in specified slotA and slotB of inventory on specified side match. Returns true if identical.
 */

