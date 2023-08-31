import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
// ? // Абсолютний шлях до файлу контактів ;
const contactsPath = path.resolve("db", "contacts.json");
// ? // Функція оновлення файлу контактів ;
export const updateContactsJSON = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// ? // Функції взаємодії з списком контактів ;
// * Функція отримання всіх контактів ;
export const getContactsList = async () => {
  const data = (await fs.readFile(contactsPath, "utf-8")) || null;
  return JSON.parse(data);
};
// * Отримання контакту за айді ;
export const getContactById = async (contactId) => {
  const contacts = await getContactsList();
  const result = contacts.find((contact) => contact.id === contactId) || null;
  return result;
};
// * Додавання нового контакту, перезапис JSON файлу ;
export const addNewContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await getContactsList();
  contacts.push(newContact);
  await updateContactsJSON(contacts);
  return newContact;
};
// * Видалення контакту за айді ;
export const removeContactById = async (contactId) => {
  const contacts = await getContactsList();
  const index = await contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1) ;
  await updateContactsJSON(contacts);
  return result || null;
};
