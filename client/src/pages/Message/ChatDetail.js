import React from 'react';
import './message.css';

const ChatDetail = () => {
  return (
    <div className="chat-detail">
      <div className="chat-header">
        <div className="chat-avatar"></div>
        <div className="chat-info">
          <div className="chat-name">Vành đai 3</div>
          <div className="chat-status">Đang hoạt động</div>
        </div>
        <div className="chat-tools">
          <button>To do list</button>
        </div>
      </div>
      <div className="chat-messages">
        {/* Hiển thị chi tiết tin nhắn */}
      </div>
      <div className="chat-input">
        <button className="add-btn">+</button>
        <input type="text" placeholder="Nhập tin nhắn" />
        <button className="send-btn">1</button>
      </div>
    </div>
  );
};

export default ChatDetail;
