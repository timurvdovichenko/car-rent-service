import { getFilterValue } from 'redux/filterSlice';
import { Button } from '../Common.styled';
import { List, ListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';

const ContactList = () => {
  const contactsRedux = useSelector(getContacts);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    if (!contactsRedux) {
      return;
    }
    return contactsRedux.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
  };

  return (
    <List>
      {getFilteredContacts().map(({ name, id, phone }) => {
        return (
          <ListItem key={id}>
            {name}: {phone}
            <Button
              type="button"
              onClick={() => dispatch(deleteContact(id))}
              buttonListStyle={'margin-left: 10px'}
            >
              Delete
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ContactList;
