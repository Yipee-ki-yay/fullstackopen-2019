import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterStr, setFilterStr ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationFlag, setNotificationFlag] = useState('success')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if ( persons.map(p => p.name).includes(newName) ) {
      const existedPerson = persons.filter(p => p.name === newName);
      const { id, name } = existedPerson[0];

      const isReplace = window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`);
      if ( isReplace ) {
        phonebookService
          .update(id, newPerson)
          .then(returnedPerson => {
            setNotificationMessage(`${newName} number is updated`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000)
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson));
          })
          .catch(error => {
            setNotificationFlag('error');
            setNotificationMessage(`information of ${newName} has already been removed from the server`);
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationFlag('success');
            }, 5000);
            setPersons(persons.filter(p => p.id !== id));
          })
      }
      setNewName('');
      setNewNumber('');
      return;
    }

    phonebookService
      .create(newPerson)
      .then(returnedPerson => {
        setNotificationMessage(`added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
  }

  const filterData = (e) => {
    setFilterStr(e.target.value);
  }

  const matchPersons = 
      persons.filter(p => p.name.toUpperCase().includes(filterStr.toUpperCase()));

  const deletePerson = (id) => {
    const deletedPerson = persons.filter(p => p.id === id);
    const isDelete = window.confirm(`delete ${deletedPerson[0].name}?`);

    if ( isDelete ) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} flag={notificationFlag} />
      <Filter filterStr={filterStr} filterData={filterData} />
      <h2>add a new</h2>
      <PersonForm 
        handleSubmitForm={handleSubmitForm} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
      />
      <h2>Numbers</h2>
      <Persons matchPersons={matchPersons} deletePerson={deletePerson} />      
    </div>
  )
}

export default App