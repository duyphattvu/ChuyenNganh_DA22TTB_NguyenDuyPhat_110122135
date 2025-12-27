import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuanLyDonHang.css';

function QuanLyChat() {
  const navigate = useNavigate();
  const [allMessages, setAllMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000); // Refresh mỗi 2 giây
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    groupMessagesByUser();
  }, [allMessages]);

  const loadMessages = () => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    setAllMessages(savedMessages);
  };

  const groupMessagesByUser = () => {
    // Lấy danh sách tất cả user đã gửi tin nhắn
    const userSet = new Set();
    allMessages.forEach(msg => {
      if (msg.sender === 'user') {
        const userId = msg.senderName || 'Khách hàng';
        userSet.add(userId);
      }
    });

    const grouped = {};

    // Với mỗi user, tạo conversation
    userSet.forEach(userId => {
      // Lấy tất cả tin nhắn liên quan đến user này (cả user và admin reply)
      const userRelatedMessages = allMessages.filter(m => 
        (m.sender === 'user' && (m.senderName || 'Khách hàng') === userId) ||
        (m.sender === 'admin' && m.replyTo === userId)
      );
      
      // Sắp xếp theo timestamp để lấy tin nhắn mới nhất
      const sortedMessages = [...userRelatedMessages].sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );
      
      // Tin nhắn mới nhất là tin nhắn cuối cùng sau khi sắp xếp
      const lastMessage = sortedMessages.length > 0 
        ? sortedMessages[sortedMessages.length - 1] 
        : null;

      if (lastMessage) {
        grouped[userId] = {
          userId: userId,
          lastMessage: lastMessage,
          unreadCount: allMessages.filter(m => 
            m.sender === 'user' && 
            (m.senderName || 'Khách hàng') === userId &&
            !m.read
          ).length,
          messages: sortedMessages
        };
      }
    });

    // Sắp xếp conversations theo tin nhắn mới nhất
    const convs = Object.values(grouped).sort((a, b) => 
      new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
    );
    setConversations(convs);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Đánh dấu đã đọc
    const updatedMessages = allMessages.map(msg => {
      if (msg.sender === 'user' && (msg.senderName || 'Khách hàng') === conversation.userId) {
        return { ...msg, read: true };
      }
      return msg;
    });
    setAllMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      text: replyMessage,
      sender: 'admin',
      replyTo: selectedConversation.userId,
      timestamp: new Date().toISOString(),
      read: false // Đánh dấu chưa đọc để hiển thị badge thông báo
    };

    const updatedMessages = [...allMessages, newMessage];
    setAllMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setReplyMessage('');

    // Cập nhật conversation
    const updatedConv = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: newMessage
    };
    setSelectedConversation(updatedConv);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadTotal = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="quan-ly-don-hang">
      <div className="admin-header">
        <h1>💬 Quản Lý Chat</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {unreadTotal > 0 && (
            <span style={{
              background: '#dc3545',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {unreadTotal} tin nhắn chưa đọc
            </span>
          )}
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Về trang chủ
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px', height: 'calc(100vh - 250px)' }}>
        {/* Danh sách cuộc trò chuyện */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e5e5' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: '600' }}>Cuộc trò chuyện</h3>
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                <p>Chưa có cuộc trò chuyện nào</p>
              </div>
            ) : (
              filteredConversations.map(conv => (
                <div
                  key={conv.userId}
                  onClick={() => handleSelectConversation(conv)}
                  style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    background: selectedConversation?.userId === conv.userId ? '#f8f9fa' : 'white',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConversation?.userId !== conv.userId) {
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConversation?.userId !== conv.userId) {
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#1a1a2e' }}>{conv.userId}</strong>
                    {conv.unreadCount > 0 && (
                      <span style={{
                        background: '#dc3545',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p style={{ 
                    margin: '0', 
                    fontSize: '12px', 
                    color: '#666',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {conv.lastMessage.text}
                  </p>
                  <span style={{ fontSize: '11px', color: '#999', marginTop: '4px', display: 'block' }}>
                    {formatTime(conv.lastMessage.timestamp)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cửa sổ chat */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {selectedConversation ? (
            <>
              <div style={{ 
                padding: '20px', 
                borderBottom: '1px solid #e5e5e5',
                background: '#000',
                color: 'white'
              }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                  {selectedConversation.userId}
                </h3>
              </div>

              <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '20px',
                background: '#f8f9fa'
              }}>
                {selectedConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                      marginBottom: '12px'
                    }}
                  >
                    <div style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      background: msg.sender === 'admin' ? '#000' : 'white',
                      color: msg.sender === 'admin' ? 'white' : '#1a1a2e',
                      border: msg.sender === 'user' ? '1px solid #e5e5e5' : 'none',
                      borderBottomRightRadius: msg.sender === 'admin' ? '4px' : '18px',
                      borderBottomLeftRadius: msg.sender === 'user' ? '4px' : '18px'
                    }}>
                      <div style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '4px' }}>
                        {msg.text}
                      </div>
                      <div style={{ 
                        fontSize: '10px', 
                        opacity: 0.7,
                        textAlign: msg.sender === 'admin' ? 'right' : 'left'
                      }}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendReply} style={{ 
                padding: '16px', 
                borderTop: '1px solid #e5e5e5',
                display: 'flex',
                gap: '10px'
              }}>
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Nhập tin nhắn trả lời..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '24px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                />
                <button
                  type="submit"
                  disabled={!replyMessage.trim()}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: replyMessage.trim() ? '#000' : '#ccc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: replyMessage.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '18px',
                    transition: 'all 0.2s'
                  }}
                >
                  ➤
                </button>
              </form>
            </>
          ) : (
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#666'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                <p>Chọn một cuộc trò chuyện để bắt đầu</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuanLyChat;

