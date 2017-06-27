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


// MOVE




// END MOVE


