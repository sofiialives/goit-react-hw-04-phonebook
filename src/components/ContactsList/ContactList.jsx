import css from './ContactList.module.css'
export const ContactsList = ({ filterEdit, deleteContact }) => {
  console.log(filterEdit)
  return (
    <div>
      <ul>
        {filterEdit.map(contact => (
          <li key={contact.id}>
            <span>
              {contact.name}: {contact.number}
            </span>
            <button onClick={() => deleteContact(contact.id)} className={css.buttonFilter}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};