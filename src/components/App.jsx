import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactList';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const strContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(strContacts) ?? [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    const strContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', strContacts);
  }, [contacts]);

  const addContact = () => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContact => [...prevContact, newContact]);
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter handleChange={handleChange} filter={filter} />
      <ContactsList
        filterEdit={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
}
