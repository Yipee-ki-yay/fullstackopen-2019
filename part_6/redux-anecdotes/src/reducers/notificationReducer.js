const initialState = "abba"

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.message;
    case 'REMOVE_NOTIFICATION':
      return '';
  }

  return state;
}

export const setNotification = (message) => {
  return {
    type: 'SET_MESSAGE',
    message: message,
  }
}

export const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer;