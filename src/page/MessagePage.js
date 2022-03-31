// External Import
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Styled from 'styled-components';
import io from 'socket.io-client';
import moment from 'moment';

// React Icons Import
import { AiFillEye } from 'react-icons/ai';
import { BiLeftArrowAlt, BiMessageDetail, BiSend } from 'react-icons/bi';

// Internal Import
import {
  forbiddenConversation,
  receiveMessage,
  getConversationMessages
} from '../redux/actions/chatActions';

const FullName = Styled.p`
  color: var(--text-muted);
  font-size: 15px;
  font-weight:500;
`;
const ActiveIndicator = Styled.div`
  padding: 0 !important;
  margin: 0 !important;  
  height: 10px;
  width: 10px;
  border-radius:50%;
  margin-left: 3px !important;
`;

const SOCKET_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://my-node-blog-app.herokuapp.com';

const MessagePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Auth } = useSelector(state => state);
  const Chat = useSelector(state => state.Chat);
  const socketRef = useRef();
  const [message, setMessage] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isParticipantLoaded, setIsParticipantLoaded] = useState(false);
  const [isTextareaDisabled, setIsTextAreaDisabled] = useState(true);
  const [isUnreadMessage, setIsUnreadMessage] = useState(false);
  const [unreadMessageLength, setUnreadMessageLength] = useState(0);
  let { conversationId } = useParams();

  // useEffect(() => {
  //   return navigate.listen(location => {
  //     socketRef.current.emit('left room', conversationId);
  //   });
  // }, [navigate]);
  useEffect(() => {
    if (Chat.activeChat.participant !== null) setIsParticipantLoaded(true);
  }, [Chat.activeChat.participant]);
  useEffect(() => {
    if (isParticipantLoaded) {
      socketRef.current = io(SOCKET_URL);
      socketRef.current.on('connect', () => {
        console.log('connected');
      });
      socketRef.current.emit('user connected', Auth.user._id);
      socketRef.current.emit('join conversation', conversationId);

      socketRef.current.on('get chat messages', () => {
        dispatch(getConversationMessages(conversationId));
      });

      setIsTextAreaDisabled(false);

      socketRef.current.on('message sent', receivedMessage => {
        dispatch(receiveMessage(receivedMessage));

        // Scroll to bottom when message received
        let messageContainer = document.querySelector('.message-section-center');
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });

      // Check if the participant is online
      receiveUserData();

      window.onbeforeunload = function () {
        socketRef.current.emit('left conversation', conversationId);
      };

      socketRef.current.on('error', errorMsg => setErrorMessage(errorMsg));
    }
  }, [isParticipantLoaded]);
  useEffect(() => {
    Chat.activeChat.messages.forEach(message => {
      if (message.receiver === Auth.user._id && !message.seen) {
        setIsUnreadMessage(true);
      }
    });
  }, [Chat.activeChat.messages]);
  useEffect(() => {
    if (isUnreadMessage === true) {
      const getUnreadMessages = document.querySelectorAll('.unread-message');
      const getUnreadMessageNotificationText = document.querySelector('.unread-message');
      const getFirstUnreadMessage = document.querySelector('.unread-wrapper');
      getFirstUnreadMessage.classList.add('show');
      setUnreadMessageLength(getUnreadMessages.length);
      let messageContainer = document.querySelector('.message-section-center');
      messageContainer.scroll(0, getUnreadMessageNotificationText.offsetTop);

      setTimeout(() => {
        socketRef.current.emit('message seen');
        setIsUnreadMessage(false);
        setUnreadMessageLength(0);
        getFirstUnreadMessage.classList.remove('show');
      }, 5000);
    }
  }, [isUnreadMessage]);
  useEffect(() => {
    // When messages loaded on startup scroll to bottom
    let messageContainer = document.querySelector('.message-section-center');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [Chat.activeChat.messages]);
  useEffect(() => {
    if (Chat.error.status === 403) {
      dispatch(forbiddenConversation());
      navigate('/chat');
    }
  }, [Chat.error]);
  function receiveUserData() {
    socketRef.current.on('user data', users => {
      const isOtherUserParticipant = Auth.user._id === Chat.activeChat.creator._id;
      if (Chat.activeChat.participant !== null || Chat.activeChat.creator !== null) {
        if (isOtherUserParticipant) {
          if (users[Chat.activeChat.participant._id]) {
            setIsOnline(true);
          } else {
            setIsOnline(false);
          }
        }
      } else {
        if (users[Chat.activeChat.creator._id]) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      }
    });
  }
  const sendMessage = e => {
    e.preventDefault();
    if (Chat.activeChat.participant !== null) {
      const messageObject = {
        sender: Auth.user._id,
        receiver:
          Auth.user._id === Chat.activeChat.participant._id
            ? Chat.activeChat.creator._id
            : Chat.activeChat.participant._id,
        conversation: conversationId,
        createdAt: Date.now(),
        body: message
      };

      // Clear message input
      setMessage('');

      if (message.length > 0) {
        // Send message
        socketRef.current.emit('send message', messageObject);
      }
    }
  };
  const leftRoomButton = () => {
    socketRef.current.emit('left conversation', conversationId);
    navigate('/chat');
  };

  return (
    <div className='message-section mt-1'>
      <div className={`message-section-top}`}>
        <section style={{ display: 'flex', alignItems: 'center' }}>
          <BiLeftArrowAlt
            onClick={() => leftRoomButton()}
            style={{ fontSize: '30px', cursor: 'pointer' }}
            className='chat-back-button'
          />
          <BiMessageDetail style={{ fontSize: '25px', marginLeft: '10px' }} />
          {Chat.activeChat.participant !== null ? (
            <>
              <ActiveIndicator
                style={isOnline ? { background: 'green' } : { background: 'gray' }}
              ></ActiveIndicator>
              <section style={{ marginLeft: '8px', position: 'relative', top: '8px' }}>
                <FullName>
                  {Auth.user._id === Chat.activeChat.participant._id
                    ? Chat.activeChat.creator.username
                    : Chat.activeChat.participant.username}
                </FullName>
              </section>
            </>
          ) : (
            'Loading...'
          )}
        </section>
      </div>
      <div className='message-section-center'>
        {Chat.activeChat.messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`chat-box-container ${message.sender === Auth.user._id ? 'right' : ''} ${
                message.receiver === Auth.user._id && !message.seen && 'unread-message'
              }`}
            >
              {message.receiver === Auth.user._id && !message.seen && (
                <div className='unread-wrapper' id='unread-message-id'>
                  <div className='unread-message-section'>
                    You Have {unreadMessageLength} Unread Messages
                  </div>
                </div>
              )}
              <div className='chat-box'>
                {message.isPhoto ? (
                  <div>
                    <img src={message.photo.photoUrl} alt='user message' className='chat-picture' />
                  </div>
                ) : (
                  <p>{message.body}</p>
                )}
                <section className='message-box-bottom'>
                  <span className='seen-mark'>
                    {message.sender === Auth.user._id && message.seen && <AiFillEye />}
                  </span>
                  <span className='message-date'>{moment(message.createdAt).format('LT')}</span>
                </section>
              </div>
            </div>
          );
        })}
      </div>
      <div className='message-section-bottom'>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        <form onSubmit={sendMessage} autoComplete='off' encType='multipart/form-data'>
          <textarea
            className='message-input'
            type='text'
            name='message-text'
            placeholder='Write a message.'
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={isTextareaDisabled}
          />
          <button type='submit' disabled={message.length > 0 ? false : true}>
            <BiSend style={{ marginTop: '-3px' }} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagePage;
