'use strict';

const Contact = require('./contact.js').Contact;

class PhoneBook {
    constructor() {
        this.contacts = new Map();
    }

    createContact(name) {
        if (!this.contacts.has(name)) {
            this.contacts.set(name, new Contact(name));
        }
    }

    deleteContact(name) {
        if (this.contacts.has(name)) {
            this.contacts.delete(name);
        }
    }

    addPhonesAndEmails(name, phones, emails) {
        phones.forEach(phone => this._addPhone(name, phone));
        emails.forEach(email => this._addEmail(name, email));
    }

    delPhonesAndEmails(name, phones, emails) {
        phones.forEach(phone => this._deletePhone(name, phone));
        emails.forEach(email => this._deleteEmail(name, email));
    }

    _addPhone(name, phone) {
        if (this.contacts.has(name)) {
            this.contacts.get(name)
                .addPhone(phone);
        }
    }

    _addEmail(name, email) {
        if (this.contacts.has(name)) {
            this.contacts.get(name)
                .addEmail(email);
        }
    }

    _deletePhone(name, phone) {
        if (this.contacts.has(name)) {
            this.contacts.get(name)
                .deletePhone(phone);
        }
    }

    _deleteEmail(name, email) {
        if (this.contacts.has(name)) {
            this.contacts.get(name)
                .deleteEmail(email);
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
            res.push(contact.getContact(fieldTypes));

            return res;
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

    clear() {
        this.contacts.clear();
    }
}

module.exports = { PhoneBook };
