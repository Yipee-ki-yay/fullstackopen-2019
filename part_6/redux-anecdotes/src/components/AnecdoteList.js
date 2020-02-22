import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
} 

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState()

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            props.store.dispatch(vote(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList;