import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterStr, setFilterStr ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if ( persons.map(p => p.name).includes(newName) ) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
      return;
    } 

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const filterData = (e) => {
    setFilterStr(e.target.value);
  }

  const matchPersons = 
      persons.filter(p => p.name.toUpperCase().includes(filterStr.toUpperCase()));

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons matchPersons={matchPersons} />      
    </div>
  )
}

export default App