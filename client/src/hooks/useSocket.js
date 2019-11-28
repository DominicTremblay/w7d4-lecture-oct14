import { useReducer, useEffect } from 'react';

import dataReducer, { SET_MESSAGES, SET_USERNAME, SET_SOCKET } from '../reducer/dataReducer';

const useSocket = url => {

  const [state, dispatch] = useReducer(dataReducer, {
    currentUser: { name: 'Anonymous' },
    messages: [],
    connected: false
  });

  const handleMessage = msg => {
    // incoming message from server


    const message = JSON.parse(msg.data);
    console.log("incoming", message);
    dispatch({ type: SET_MESSAGES, message });

  }

  useEffect(() => {


    const socket = new WebSocket(url);

    dispatch({ type: SET_SOCKET, socket });

  }, [url])

  useEffect(() => {
    if (state.connected) {
      state.socket.onopen = () => console.log(`Connected to socket server`);
      state.socket.onmessage = handleMessage;
      state.socket.onclose = () =>
        console.log(`Disconned from socket server`);
      return () => {
        state.socket.onopen = null;
        state.socket.onmessage = null;
        state.socket.onclose = null;
      };
    }
  });

  return {
    state,
    dispatch
  }

}

export default useSocket;