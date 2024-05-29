import React from 'react';
import './message.css';

const MediaStorage = () => {
  return (
    <div className="media-storage">
      <div className="user-info">
        <div className="user-avatar"></div>
        <div className="user-name">Vành đai 3</div>
      </div>
      <div className="media-section">
        <h3>Thành viên nhóm</h3>
        <div className="media-item">USER 1</div>
        <div className="media-item">USER 2</div>
        <div className="media-item">USER 3</div>
      </div>
      <div className="media-section">
        <h3>FILE</h3>
        <div className="media-item">
          <a href="http://www.figma.com">FIGMA</a>
        </div>
        <div className="media-item">DTF12-CAP...</div>
      </div>
      <div className="media-section">
        <h3>Hình Ảnh</h3>
        <div className="image-gallery">
          <div className="image-item">Ảnh 1</div>
          <div className="image-item">Ảnh 2</div>
        </div>
      </div>
    </div>
  );
};

export default MediaStorage;
