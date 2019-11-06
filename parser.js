/* eslint-disable max-params */
'use strict';
const lexicalThree = require('./lexical-three.js').lexicalThree;

class ParseCommandResult {
    constructor(
        isSuccess,
        positionError,
        commandType,
        phoneArgs,
        emailArgs,
        showFieldsArgs,
        curLength,
        query) {
        this.isSuccess = isSuccess;
        this.positionError = positionError;
        this.commandType = commandType;
        this.phoneArgs = phoneArgs;
        this.emailArgs = emailArgs;
        this.showFieldsArgs = showFieldsArgs;
        this.curLength = curLength;
        this.query = query;
    }
}

class Parser {
    tryParseQuery(query) {
        let commands = query.split(';');
        if (commands[commands.length - 1] === '') {
            commands = commands.slice(0, -1);
        }
        let result = commands.reduce((acc, cur, i) => {
            let res = this._tryParseCommand(cur);
            if (!res.isSuccess) {
                syntaxError(i + 1, res.positionError);
            }
            acc.push(res);

            return acc;
        }, []);
        if (query.slice(-1) !== ';') {
            syntaxError(commands.length, commands[commands.length - 1].length + 1);
        }

        return result;
    }

    _tryParseCommand(command) {
        let words = command.split(' ');
        let result = this._DFS(lexicalThree.srcNode, words, 0, 1, [], [], []);
        result.query = command.slice(result.curLength);

        return result;
    }

    _DFS(prevNode, words, curPosition, curLength, phoneArgs, emailArgs, showFields) {
        if (prevNode.isEnd) {
            return new ParseCommandResult(
                true,
                null,
                prevNode.typeValue,
                phoneArgs,
                emailArgs,
                showFields,
                curLength - 1
            );
        }

        for (let nodeName of prevNode.nextNodes) {
            let node = lexicalThree[nodeName];
            if (node.stringValue.test(words[curPosition])) {
                this._tryGetArgs(node, phoneArgs, words, curPosition, emailArgs, showFields);

                return this._DFS(
                    node,
                    words,
                    curPosition + 1,
                    curLength + words[curPosition].length + 1,
                    phoneArgs,
                    emailArgs,
                    showFields);
            }
        }

        return new ParseCommandResult(false, curLength);
    }

    _tryGetArgs(node, phoneArgs, words, curPosition, emailArgs, showFields) {
        switch (node.type) {
            case 'phoneArgs':
                phoneArgs.push(words[curPosition]);
                break;
            case 'emailArgs':
                emailArgs.push(words[curPosition]);
                break;
            case 'showFieldType':
                showFields.push(words[curPosition]);
                break;
            default:
                break;
        }
    }
}

/**
 * Вызывайте эту функцию, если есть синтаксическая ошибка в запросе
 * @param {number} lineNumber – номер строки с ошибкой
 * @param {number} charNumber – номер символа, с которого запрос стал ошибочным
 */
function syntaxError(lineNumber, charNumber) {
    throw new Error(`SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`);
}

module.exports = { Parser };
