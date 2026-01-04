import { Middleware } from '@reduxjs/toolkit';

export const socketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action: any) => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === 'feed/wsConnect' || type === 'profileOrders/wsConnect') {
      if (socket) {
        socket.close();
      }
      socket = new WebSocket(payload);

      socket.onopen = () => {
        const openType =
          type === 'feed/wsConnect' ? 'feed/wsOpen' : 'profileOrders/wsOpen';
        dispatch({ type: openType });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const messageType =
          type === 'feed/wsConnect'
            ? 'feed/wsMessage'
            : 'profileOrders/wsMessage';
        dispatch({ type: messageType, payload: parsedData });
      };

      socket.onerror = () => {
        const errorType =
          type === 'feed/wsConnect' ? 'feed/wsError' : 'profileOrders/wsError';
        dispatch({ type: errorType, payload: 'WebSocket Error' });
      };

      socket.onclose = () => {
        const closeType =
          type === 'feed/wsConnect' ? 'feed/wsClose' : 'profileOrders/wsClose';
        dispatch({ type: closeType });
      };
    }

    if (type === 'feed/wsDisconnect' || type === 'profileOrders/wsDisconnect') {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      socket = null;
    }

    return next(action);
  };
};
