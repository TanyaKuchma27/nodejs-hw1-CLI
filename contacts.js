const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts)=> {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result){
        return null;
    }
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    updateContacts(contacts);
    return removeContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        name, 
        email,
        phone,
        id: ObjectID()
    };
    contacts.push(newContact);
    updateContacts(contacts);;
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact    
}