import { program } from "commander";

import {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
} from "./contacts.js";
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getContacts":
      const contactsList = await getContactsList();
      return console.table(contactsList);
    case "getContactById":
      const contact = await getContactById(id);
      return console.log("finded contact by id:", contact);
    case "addNewContact":
      const newContact = await addNewContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "removeContactById":
      const removedContact = await removeContactById(id);
      return console.log(removedContact);
    default:
      return console.log(`Unknown action ${action}`);
  }
};
// ? // Обробка введених команд в командній строці, перетворення значень команди в об'єкт ;
program
  .option("--action <type>")
  .option("--id <type>")
  .option("--name <type>")
  .option("--email <type>")
  .option("--phone <type>");
program.parse();
const options = program.opts();
invokeAction(options);
