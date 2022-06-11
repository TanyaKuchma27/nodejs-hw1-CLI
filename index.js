const contacts = require("./contacts");

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case "list":
            const result = await contacts.listContacts();
            console.log(result);
            break;
        case "get":
            const contact = await contacts.getContactById(id);
            console.log(contact);
            break;
        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;        
        case "remove":
            const removeContact = await contacts.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
            break;
    }
}

// invokeAction({action: "list"})
// invokeAction({action: "get", id: "10"})
// invokeAction({action: "add", name: "Max", email: "max@gmail.com", phone: "(202) 202-202"})
// invokeAction({action: "remove", id: "62a4620e0990c01df4e75ca0"})