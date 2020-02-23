import React from 'react'
import { connect } from 'react-redux'
import { filterByQuery } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.filterByQuery(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterByQuery: value => {
      dispatch(filterByQuery(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(Filter)