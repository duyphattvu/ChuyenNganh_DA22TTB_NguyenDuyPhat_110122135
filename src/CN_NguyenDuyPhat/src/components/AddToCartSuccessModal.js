import { useNavigate } from 'react-router-dom';
import './AddToCartSuccessModal.css';

function AddToCartSuccessModal({ show, productName, size, color, onClose }) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleViewCart = () => {
    onClose();
    navigate('/gio-hang');
  };

  return (
    <div className="add-to-cart-modal-overlay" onClick={onClose}>
      <div className="add-to-cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Success Header */}
        <div className="modal-success-header">
          <div className="success-icon-wrapper">
            <div className="success-icon">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M20 6L9 17L4 12" 
                  stroke="#10b981" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="checkmark-path"
                  fill="none"
                />
              </svg>
            </div>
          </div>
          <h2 className="success-title">Thêm vào giỏ hàng thành công!</h2>
        </div>

        {/* Product Details */}
        <div className="modal-body">
          <div className="product-details-card">
            <p className="product-name">{productName}</p>
            <div className="product-attributes">
              <span className="attribute">
                Size: <strong>{size}</strong>
              </span>
              {color && (
                <span className="attribute">
                  Màu: <strong>{typeof color === 'object' ? color.name : color}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              onClick={onClose}
              className="btn-continue-shopping"
            >
              Tiếp tục mua sắm
            </button>
            <button
              onClick={handleViewCart}
              className="btn-view-cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Xem giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartSuccessModal;
