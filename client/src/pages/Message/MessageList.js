import React from 'react';
import './message.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS
const MessageList = () => {
  return (
    <div className="message-list">
      <div className="search-bar-container">
        <i className="fas fa-search search-icon"></i>
        <input type="text" placeholder="Tìm kiếm đồng nghiệp" className="search-bar" style={{ paddingLeft: '23px' }} />
      </div>
      <div className="message-categories">
        <button>Hộp thư</button>
        <button>GROUP</button>
        <button>Cá Nhân</button>
      </div>
      <div className="messages">
        <div className="message-item active">
          <div className="message-avatar"></div>
          <div className="message-content">
            <div className="message-name">MeTro Sài Gòn</div>
            <div className="message-text">bảo trân đã gửi 2 tin nhắn</div>
          </div>
        </div>
        <div className="message-item">
          <div className="message-avatar"></div>
          <div className="message-content">
            <div className="message-name">Vành đai 3</div>
            <div className="message-text">bảo trọng đã gửi file đính kèm</div>
          </div>
        </div>
        <div className="message-item">
          <div className="message-avatar"></div>
          <div className="message-content">
            <div className="message-name">bảo trân</div>
            <div className="message-text">đã anh vĩ hôm nay model xong chưa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
