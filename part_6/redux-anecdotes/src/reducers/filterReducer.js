const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.query
  }

  return state;
} 

export const filterByQuery = (query) => {
  return {
    type: 'FILTER',
    query
  }
}

export default filterReducer;