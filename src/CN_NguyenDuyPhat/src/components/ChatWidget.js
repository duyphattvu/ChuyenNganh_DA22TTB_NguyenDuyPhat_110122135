import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ChatWidget.css';

function ChatWidget() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  // Kiểm tra xem có phải trang admin không
  const isAdminPage = location.pathname.startsWith('/quan-ly');
  
  // Nếu là trang admin thì không hiển thị chat widget
  if (isAdminPage) {
    return null;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  // Lấy tin nhắn của user hiện tại
  const getCurrentUserMessages = () => {
    if (!isAuthenticated || !user) return [];
    
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const currentUserName = user.name || 'Khách hàng';
    
    // Lọc tin nhắn của user hiện tại (cả tin nhắn từ user và admin reply)
    const userMessages = savedMessages.filter(m => 
      (m.sender === 'user' && (m.senderName || 'Khách hàng') === currentUserName) ||
      (m.sender === 'admin' && m.replyTo === currentUserName)
    );
    
    return userMessages;
  };

  const loadMessages = () => {
    const userMessages = getCurrentUserMessages();
    
    if (userMessages.length === 0) {
      // Tin nhắn chào mừng mặc định
      const welcomeMessage = {
        id: Date.now(),
        text: 'Xin chào! Tôi có thể giúp gì cho bạn? 😊',
        sender: 'admin',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    } else {
      // Sắp xếp theo thời gian
      const sortedMessages = [...userMessages].sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sortedMessages);
      
      // Kiểm tra có tin nhắn mới từ admin không (khi chat đang đóng)
      if (!isOpen && sortedMessages.length > lastMessageCountRef.current) {
        const newAdminMessages = sortedMessages.filter(m => 
          m.sender === 'admin' && 
          new Date(m.timestamp) > new Date(Date.now() - 5000) // Tin nhắn trong 5 giây gần đây
        );
        if (newAdminMessages.length > 0) {
          // Có tin nhắn mới từ admin
        }
      }
      lastMessageCountRef.current = sortedMessages.length;
    }
  };

  // Load tin nhắn khi component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated, user]);

  // Tự động refresh tin nhắn mỗi 2 giây
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      loadMessages();
    }, 2000); // Refresh mỗi 2 giây
    
    return () => clearInterval(interval);
  }, [isAuthenticated, user, isOpen]);

  // Đánh dấu tin nhắn đã đọc khi mở chat
  useEffect(() => {
    if (isOpen && isAuthenticated && user) {
      const currentUserName = user.name || 'Khách hàng';
      const allMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
      
      // Đánh dấu tất cả tin nhắn từ admin (reply cho user này) là đã đọc
      const updatedMessages = allMessages.map(msg => {
        if (msg.sender === 'admin' && msg.replyTo === currentUserName) {
          return { ...msg, read: true };
        }
        return msg;
      });
      
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
      loadMessages();
    }
  }, [isOpen, isAuthenticated, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để sử dụng tính năng chat!');
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      senderName: user?.name || 'Khách hàng',
      timestamp: new Date().toISOString()
    };

    // Lấy tất cả tin nhắn từ localStorage và thêm tin nhắn mới
    const allMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const updatedAllMessages = [...allMessages, newMessage];
    localStorage.setItem('chatMessages', JSON.stringify(updatedAllMessages));
    
    // Reload messages để hiển thị tin nhắn mới
    loadMessages();
    setInputMessage('');

    // Phản hồi tự động từ admin (có thể thay bằng API thật)
    setTimeout(() => {
      const adminResponse = {
        id: Date.now() + 1,
        text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể. Bạn có thể để lại số điện thoại để được tư vấn nhanh hơn.',
        sender: 'admin',
        timestamp: new Date().toISOString()
      };
      const finalAllMessages = [...updatedAllMessages, adminResponse];
      localStorage.setItem('chatMessages', JSON.stringify(finalAllMessages));
      loadMessages();
    }, 1000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // Đếm tin nhắn chưa đọc từ admin (chỉ tính khi chat đang đóng)
  // Tin nhắn chưa đọc là tin nhắn từ admin mà read === false hoặc không có thuộc tính read
  const unreadCount = !isOpen 
    ? messages.filter(m => m.sender === 'admin' && (m.read === false || m.read === undefined)).length 
    : 0;

  return (
    <>
      {/* Chat Button */}
      <div 
        className={`chat-widget-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {unreadCount > 0 && (
          <span className="chat-badge">{unreadCount}</span>
        )}
        <span className="chat-icon">💬</span>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-container">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">👨‍💼</div>
              <div>
                <h3>Hỗ trợ khách hàng</h3>
                <span className="chat-status">Đang trực tuyến</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'admin-message'}`}
              >
                <div className="message-bubble">
                  {message.sender === 'admin' && (
                    <div className="message-sender">Shop NDP</div>
                  )}
                  {message.sender === 'user' && message.senderName && (
                    <div className="message-sender">{message.senderName}</div>
                  )}
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chat-input"
              placeholder={isAuthenticated ? "Nhập tin nhắn..." : "Vui lòng đăng nhập để chat"}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={!isAuthenticated}
            />
            <button 
              type="submit" 
              className="chat-send-btn"
              disabled={!isAuthenticated || !inputMessage.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatWidget;

