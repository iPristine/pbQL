/* eslint-disable complexity */
'use strict';
const Parser = require('./parser.js').Parser;
const PhoneBook = require('./phoneBook.js').PhoneBook;

let phoneBook = new PhoneBook();

function run(query) {
    const parser = new Parser();
    let parsedCommands = parser.tryParseQuery(query);

    let results = parsedCommands.map(command => executeCommand(command))
        .filter(res => res);

    return results.reduce((acc, cur) => {
        acc.push(...cur);

        return acc;
    }, []);
}

function executeCommand(command) {
    switch (command.commandType) {
        case 'createContact':
            phoneBook.createContact(command.query);
            break;
        case 'addPhonesOrEmails':
            phoneBook.addPhonesAndEmails(command.query, command.phoneArgs, command.emailArgs);
            break;
        case 'showCommand':
            return phoneBook.showInfo(command.showFieldsArgs, command.query);
        case 'delContact':
            phoneBook.deleteContact(command.query);
            break;
        case 'delPhonesAndEmails':
            phoneBook.delPhonesAndEmails(command.query, command.phoneArgs, command.emailArgs);
            break;
        case 'delContactsWhere':
            phoneBook.deleteContacts(command.query);
            break;
        default:
            break;
    }
}

module.exports = { phoneBook, run };
