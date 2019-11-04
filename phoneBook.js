'use strict';

const Contact = require('./contact.js');

class PhoneBook {
    constructor() {
        this.contacts = new Map();
    }

    validateName(name) {
        if (/(^[^;.]+$)/.test(name)) {
            throw new SyntaxError('Invalid name');
        }
    }

    createContact(name) {
        this.validateName(name);

        if (!this.contacts.has(name)) {
            this.contacts.set(name, new Contact(name));
        }
    }

    deleteContact(name) {
        this.validateName(name);
        if (this.contacts.has(name)) {
            this.contacts.delete(name);
        }
    }

    addPhone(name, phone) {
        if (this.contacts.has(name)) {
            this.contacts.get(name).addPhone(phone);
        }
    }

    addEmail(name, email) {
        if (this.contacts.has(name)) {
            this.contacts.get(name).addEmail(email);
        }
    }

    deletePhone(name, phone) {
        if (this.contacts.has(name)) {
            this.contacts.get(name).deletePhone(phone);
        }
    }

    deleteEmail(name, email) {
        if (this.contacts.has(name)) {
            this.contacts.get(name).deleteEmail(email);
        }
    }

    showInfo(fieldTypes, query) {
        if (!query) {
            return [];
        }
        let filteredContacts = [];
        for (let contact of this.contacts.values()) {
            if (contact.includes(query)) {
                filteredContacts.push(contact);
            }
        }

        return filteredContacts.reduce((res, contact) => {
            return res.push(contact.getContact(fieldTypes));
        }, []);
    }

    deleteContacts(query) {
        if (!query) {
            return;
        }
        for (let contact of this.contacts.values()) {
            if (contact.includes(query)) {
                this.contacts.delete(contact.getName());
            }
        }
    }
}

module.exports = { PhoneBook };
