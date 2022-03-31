// External Import
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import { HiDotsVertical } from 'react-icons/hi';
import { MdNotifications } from 'react-icons/md';
import { BiMessageDetail } from 'react-icons/bi';

// Internal Import
import { getConversations, setActiveConversation } from '../redux/actions/chatActions';

const ChatCount = Styled.p`
     font-size: 15.5px;
     color: var(--text-muted);
     margin-top: -10px;
`;

const InfoText = Styled.p`
  margin:auto;
  font-weight:500;
  color: var(--text-muted);
  text-align: center;
`;
const ChatroomBox = Styled.div`
  cursor: pointer;
  display: flex;
  transition: 0.2s;
  padding: 5px;
  &:hover{
    background: #e9e9e9;
  }
  position: relative;
`;
const CompanyName = Styled.p`
  font-weight: 500;
`;
const FullName = Styled.p`
  margin-top: -20px;
  color: var(--text-muted);
  font-size: 15px;
  font-weight:400;
`;
const LastMessage = Styled.p`
  color: var(--text-muted);
  font-weight: 300;
  margin-top: -15px;
`;

const Conversations = () => {
  const navigate = useNavigate();
  const Chat = useSelector(state => state.Chat);
  const Auth = useSelector(state => state.Auth);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, []);
  useEffect(() => {
    if (Chat.createdConversation !== null) {
      activeChat(
        Chat.createdConversation.conversation._id,
        Chat.createdConversation.conversation.participant,
        Chat.createdConversation.conversation.creator
      );
    }
  }, [Chat]);
  useEffect(() => {
    setNotifications(Chat.notifications);
  }, [Chat.notifications]);

  const activeChat = (conversationId, participant, creator) => {
    dispatch(setActiveConversation(conversationId, participant, creator));
    navigate(`/chat/message/${conversationId}`);
  };

  return (
    <div>
      <h2 className='text-center'>Chat</h2>
      <ChatCount className='text-center'>{Chat.conversations.length} Chats</ChatCount>
      <hr />
      <div className='main-area'>
        {Chat.loading ? (
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: '100vh' }}
          >
            <div className='spinner-grow text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          Chat.conversations.length === 0 && <InfoText>No Chat Found</InfoText>
        )}
        {Chat.conversations.length >= 1 &&
          Chat.conversations.map((conversation, index) => {
            return (
              <ChatroomBox
                key={index}
                className={
                  notifications.some(notif => notif.conversation === conversation.conversation._id)
                    ? 'border-bottom chatroom-highlight'
                    : 'border-bottom'
                }
                onClick={() =>
                  activeChat(
                    conversation.conversation._id,
                    conversation.conversation.participant,
                    conversation.conversation.creator
                  )
                }
              >
                <section>
                  <BiMessageDetail style={{ height: '30px', width: '30px', marginTop: '50%' }} />
                  {notifications.some(
                    notification => notification.conversation === conversation.conversation._id
                  ) && <MdNotifications style={{ color: '#c9222b', fontSize: '22px' }} />}
                </section>
                <section style={{ paddingLeft: '15px', paddingTop: '5px' }}>
                  <CompanyName>
                    {Auth.user._id === conversation.conversation.creator._id
                      ? conversation.conversation.participant.username
                      : conversation.conversation.creator.username}
                  </CompanyName>
                  {!true && <FullName>{conversation.conversation.participant.username}</FullName>}
                  {conversation.lastMessage !== null && (
                    <LastMessage>
                      {conversation.lastMessage.body.length > 28
                        ? `${conversation.lastMessage.body.substring(0, 28)}...`
                        : conversation.lastMessage.body}
                    </LastMessage>
                  )}
                </section>
                <HiDotsVertical
                  style={{
                    position: 'absolute',
                    right: '0',
                    paddingTop: '5px',
                    fontSize: '24px'
                  }}
                />
              </ChatroomBox>
            );
          })}
      </div>
    </div>
  );
};

export default Conversations;
