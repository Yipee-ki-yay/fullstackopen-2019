import React from 'react'
import { createAnecdot } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdot = {
      content: e.target.anecdot.value,
      id: getId(),
      votes: 0
    };
    props.store.dispatch(createAnecdot(anecdot));
    e.target.anecdot.value = '';
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdot"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;