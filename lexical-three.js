/* eslint-disable max-params */
'use strict';

class ThreeNode {
    constructor(stringValue, isEnd, nextNodes, type, typeValue) {
        this.stringValue = stringValue;
        this.isEnd = isEnd;
        this.nextNodes = nextNodes;
        this.type = type;
        this.typeValue = typeValue;
    }
}

const lexicalThree = {
    'contactCreateNode': new ThreeNode(
        /^контакт$/,
        true,
        [],
        'command',
        'createContact'
    ),
    'createNode': new ThreeNode(
        /^Создай$/,
        false,
        ['contactCreateNode'],
        'partCommand',
        ''
    ),
    'contactAddInfoNode': new ThreeNode(
        /^контакта$/,
        true,
        [],
        'command',
        'addPhonesOrEmails'
    ),
    'forAddInfoNode': new ThreeNode(
        /^для$/,
        false,
        ['contactAddInfoNode'],
        'partCommand',
        ''
    ),
    'andAddInfoNode': new ThreeNode(
        /^и$/,
        false,
        ['phoneAddInfoNode', 'emailAddInfoNode'],
        'partCommand',
        ''
    ),
    'regularPhoneAddInfoNode': new ThreeNode(
        /^\d{10}$/,
        false,
        ['forAddInfoNode', 'andAddInfoNode'],
        'phoneArgs',
        ''
    ),
    'regularEmailAddInfoNode': new ThreeNode(
        /^\S+$/,
        false,
        ['forAddInfoNode', 'andAddInfoNode'],
        'emailArgs',
        ''
    ),
    'phoneAddInfoNode': new ThreeNode(
        /^телефон$/,
        false,
        ['regularPhoneAddInfoNode'],
        'partCommand',
        ''
    ),
    'emailAddInfoNode': new ThreeNode(
        /^почту$/,
        false,
        ['regularEmailAddInfoNode'],
        'partCommand',
        ''
    ),
    'addInfoNode': new ThreeNode(
        /^Добавь$/,
        false,
        ['phoneAddInfoNode', 'emailAddInfoNode', 'forAddInfoNode'],
        'partCommand',
        ''
    ),
    'srcNode': new ThreeNode(
        / /,
        false,
        ['createNode', 'addInfoNode', 'showNode', 'delMainNode'],
        'partCommand',
        ''
    ),
    'showContactNode': new ThreeNode(
        /^контактов,$/,
        false,
        ['whereShowNode'],
        'partCommand',
        ''
    ),
    'forShowNode': new ThreeNode(
        /^для$/,
        false,
        ['showContactNode'],
        'partCommand',
        ''
    ),
    'andShowNode': new ThreeNode(
        /^и$/,
        false,
        ['phonesShowNode', 'emailsShowNode', 'nameShowNode'],
        'partCommand',
        ''
    ),
    'phonesShowNode': new ThreeNode(
        /^телефоны$/,
        false,
        ['andShowNode', 'forShowNode'],
        'showFieldType',
        ''
    ),
    'emailsShowNode': new ThreeNode(
        /^почты$/,
        false,
        ['andShowNode', 'forShowNode'],
        'showFieldType',
        ''
    ),
    'nameShowNode': new ThreeNode(
        /^имя$/,
        false,
        ['andShowNode', 'forShowNode'],
        'showFieldType',
        ''
    ),
    'showNode': new ThreeNode(
        /^Покажи$/,
        false,
        ['phonesShowNode', 'emailsShowNode', 'nameShowNode', 'forShowNode'],
        'partCommand',
        ''
    ),
    'whereShowNode': new ThreeNode(
        /^где$/,
        false,
        ['hasShowNode'],
        'partCommand',
        ''
    ),
    'hasShowNode': new ThreeNode(
        /^есть$/,
        true,
        [],
        'command',
        'showCommand'
    ),
    'delMainNode': new ThreeNode(
        /^Удали$/,
        false,
        ['delContactNode', 'delPhoneNode', 'delEmailNode', 'delForNode', 'delContactsNode'],
        'partCommand',
        ''
    ),
    'delContactNode': new ThreeNode(
        /^контакт$/,
        true,
        [],
        'command',
        'delContact'
    ),
    'delPhoneNode': new ThreeNode(
        /^телефон$/,
        false,
        ['regularDelPhoneNode'],
        'partCommand',
        ''
    ),
    'delEmailNode': new ThreeNode(
        /^почту$/,
        false,
        ['regularDelEmailNode'],
        'partCommand',
        ''
    ),
    'delForNode': new ThreeNode(
        /^для$/,
        false,
        ['delFieldsNode'],
        'partCommand',
        ''
    ),
    'delContactsNode': new ThreeNode(
        /^контакты,$/,
        false,
        ['whereDelNode'],
        'partCommand',
        ''
    ),
    'regularDelPhoneNode': new ThreeNode(
        /^\d{10}$/,
        false,
        ['delForNode', 'andDelNode'],
        'phoneArgs',
        ''
    ),
    'regularDelEmailNode': new ThreeNode(
        /^\S+$/,
        false,
        ['delForNode', 'andDelNode'],
        'emailArgs',
        ''
    ),
    'delFieldsNode': new ThreeNode(
        /^контакта$/,
        true,
        [],
        'command',
        'delPhonesAndEmails'
    ),
    'andDelNode': new ThreeNode(
        /^и$/,
        false,
        ['delPhoneNode', 'delEmailNode'],
        'partCommand',
        ''
    ),
    'whereDelNode': new ThreeNode(
        /^где$/,
        false,
        ['hasDelNode'],
        'partCommand',
        ''
    ),
    'hasDelNode': new ThreeNode(
        /^есть$/,
        true,
        [],
        'command',
        'delContactsWhere'
    )
};

module.exports = { lexicalThree };
