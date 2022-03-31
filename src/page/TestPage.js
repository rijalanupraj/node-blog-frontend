import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function TestPage() {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:8000');
    socketRef.current.on('connect', () => {
      console.log('connected');
    });
  });

  return <div>TestPage</div>;
}

export default TestPage;
