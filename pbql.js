'use strict';

const PhoneBook = require('./phoneBook.js');
const Parser = require('./parser.js');

let phoneBook = new PhoneBook();

function run(query) {
    const parser = new Parser();
    let result = parser.tryParseQuery(query);

    return result;
}

module.exports = { phoneBook, run };
