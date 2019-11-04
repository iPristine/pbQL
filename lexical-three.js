/* eslint-disable max-params */
"use strict";

class ThreeNode {
    constructor(stringValue, isEnd, nextNodes, type, typeValue) {
        this.stringValue = stringValue;
        this.isEnd = isEnd;
        this.nextNodes = nextNodes;
        this.type = type;
        this.typeValue = typeValue;
    }
}

const contactCreateNode = new ThreeNode(
    /^контакт$/,
    true,
    [],
    "commmand",
    "createContact"
);
const createNode = new ThreeNode(
    /^Создай$/,
    false,
    [contactCreateNode],
    "partCommand",
    ""
);
const contactDeleteNode = new ThreeNode(
    /^контакта$/,
    true,
    [],
    "command",
    "addPhonesOrEmailes"
);
const contactCreateNode = new ThreeNode(
    /^контакт$/,
    true,
    [],
    "commmand",
    "createContact"
);
const srcNode = new Node();

const lexicalThree = {};
