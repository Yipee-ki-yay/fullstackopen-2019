import React from 'react'
import { connect } from 'react-redux'
import { createAnecdot } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const {createAnecdot, setNotification, removeNotification} = props;

  const getId = () => (100000 * Math.random()).toFixed(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const anecdote = {
      content: e.target.anecdote.value,
      id: getId(),
      votes: 0
    };
    createAnecdot(anecdote);
    setNotification(`you created '${anecdote.content}'`);
    setTimeout(() => removeNotification(), 3000);
    e.target.anecdote.value = '';
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdot, setNotification, removeNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);