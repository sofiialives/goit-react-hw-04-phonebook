import { Component } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  id = nanoid();
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.props.addContact({ name, number });
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor={this.id}>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+$"
          minLength="3"
          maxLength="16"
          id={this.id}
          value={this.state.name}
          onChange={this.handleChange}
          className={css.inputName}
          required
        />
        <label htmlFor={this.id}>Number</label>
        <input
          type="tel"
          name="number"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          title="xxx-xx-xx"
          id={this.id}
          value={this.state.number}
          onChange={this.handleChange}
          className={css.inputName}
          required
        />
        <button type="submit" className={css.buttonContacts}>
          Add Contact
        </button>
      </form>
    );
  }
}