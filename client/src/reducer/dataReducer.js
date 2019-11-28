export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_SOCKET = 'SET_SOCKET';

const dataReducer = (state, action) => {

  console.log(action);

  const actions = {

    SET_MESSAGES: {
      ...state,
      messages: [...state.messages, action.message]
    },
    SET_USERNAME: {
      ...state,
      currentUser: { name: action.username }
    },
    SET_SOCKET: {
      ...state,
      socket: action.socket,
      connected: true
    }


  }

  return actions[action.type] || state;
}

export default dataReducer;