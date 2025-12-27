import { useState } from 'react';
import './SizeColorSelector.css';

const availableSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const availableColors = [
  { name: 'Đen', value: 'black', hex: '#000000' },
  { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
  { name: 'Xám', value: 'gray', hex: '#808080' },
  { name: 'Xanh dương', value: 'blue', hex: '#0066CC' },
  { name: 'Đỏ', value: 'red', hex: '#CC0000' },
  { name: 'Xanh lá', value: 'green', hex: '#00CC00' }
];

function SizeColorSelector({ onConfirm, onCancel, productName }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleConfirm = () => {
    if (!selectedSize) {
      alert('⚠️ Vui lòng chọn size!');
      return;
    }
    if (!selectedColor) {
      alert('⚠️ Vui lòng chọn màu sắc!');
      return;
    }
    onConfirm({ size: selectedSize, color: selectedColor });
  };

  return (
    <div className="size-color-modal-overlay" onClick={onCancel}>
      <div className="size-color-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Chọn Size và Màu</h3>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">
          <p className="product-name">{productName}</p>
          
          <div className="option-group">
            <label className="option-label">Chọn Size:</label>
            <div className="size-options">
              {availableSizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label className="option-label">Chọn Màu:</label>
            <div className="color-options">
              {availableColors.map(color => (
                <button
                  key={color.value}
                  className={`color-option ${selectedColor?.value === color.value ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor?.value === color.value && '✓'}
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="selected-color-name">Màu đã chọn: <strong>{selectedColor.name}</strong></p>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>Hủy</button>
          <button className="btn-confirm" onClick={handleConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

export default SizeColorSelector;
export { availableSizes, availableColors };

