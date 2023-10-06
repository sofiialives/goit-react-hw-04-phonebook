import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const strContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(strContacts) ?? [];
    this.setState({
      contacts: parsedContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const strContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', strContacts);
    }
  }
  

  addContact = contact => {
    const { name, number } = contact;
    const isExist = this.state.contacts.find(
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
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      };
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterEdit = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleChange} filter={filter} />
        <ContactsList
          filterEdit={filterEdit}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
