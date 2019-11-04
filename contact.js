'use strict';

class Contact {
    constructor(name) {
        this.name = name;
        this.phones = [];
        this.emails = [];
    }

    _validatePhone(phone) {
        if (!/^\d{10}$/.test(phone)) {
            throw new SyntaxError('Invalide phone');
        }
    }

    _validateEmail(email) {
        if (!/^\S+$/.test(email)) {
            throw new SyntaxError('Invalide email');
        }
    }

    hasPhone(phone) {
        return this.phones.includes(phone);
    }

    hasEmail(email) {
        return this.emails.includes(email);
    }
    addPhone(phone) {
        this._validatePhone(phone);
        if (!this.hasPhone(phone)) {
            this.phones.push(phone);
        }
    }

    addEmail(email) {
        this._validateEmail(email);
        if (!this.hasEmail(email)) {
            this.emails.push(email);
        }
    }

    deletePhone(phone) {
        this.phones = this.phones.filter(curPhone => curPhone !== phone);
    }

    deleteEmail(email) {
        this.emails = this.emails.filter(curEmail => curEmail !== email);
    }

    includes(query) {
        return (
            this.phones.some(phone => phone.includes(query)) ||
            this.emails.some(email => email.includes(query)) ||
            this.name.includes(query)
        );
    }

    getName() {
        return this.name;
    }

    getPhones() {
        return this.phones.map(phone => this.formatPhone(phone)).toString();
    }

    formatPhone(phone) {
        const phoneFormat = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;
        const match = phone.match(phoneFormat);

        return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    }
    getEmails() {
        return this.emails.toString();
    }

    getContact(fieldTypes) {
        let result = fieldTypes.reduce((acc, fieldType) => {
            switch (fieldType) {
                case 'имя':
                    return `${acc}${this.getName()};`;
                case 'почты':
                    return `${acc}${this.getEmails()};`;
                case 'телефоны':
                    return `${acc}${this.getPhones()};`;
                default:
                    throw new SyntaxError('Invalid fieldType');
            }
        }, '');

        return result.slice(0, -1);
    }
}

module.exports = { Contact };
