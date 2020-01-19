import React from 'react'
import Person from './Person'

const Persons = ({matchPersons, deletePerson}) => {
  return (
    <ul>
      {matchPersons.map((p) => 
        <Person 
          key={p.id} 
          name={p.name} 
          number={p.number} 
          deletePerson={() => deletePerson(p.id)}
        />
      )}
    </ul>
  )
}

export default Persons;