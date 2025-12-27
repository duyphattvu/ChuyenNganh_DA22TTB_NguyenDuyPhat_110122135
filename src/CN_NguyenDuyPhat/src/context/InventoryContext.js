import React, { createContext, useState, useContext, useEffect } from 'react';
import { allProducts, saleProducts } from '../data/products';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState({});

  // Khởi tạo tồn kho từ localStorage hoặc dữ liệu mặc định
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    let currentInventory = savedInventory ? JSON.parse(savedInventory) : {};
    
    // Kiểm tra và thêm tồn kho cho sản phẩm mới (nếu chưa có)
    let hasNewProducts = false;
    
    // Thêm tồn kho cho sản phẩm thường
    allProducts.forEach(product => {
      if (!currentInventory[product.id]) {
        currentInventory[product.id] = {
          stock: Math.floor(Math.random() * 60) + 10,
          reserved: 0
        };
        hasNewProducts = true;
      }
    });
    
    // Thêm tồn kho cho sản phẩm khuyến mãi
    saleProducts.forEach(product => {
      if (!currentInventory[product.id]) {
        currentInventory[product.id] = {
          stock: Math.floor(Math.random() * 40) + 5,
          reserved: 0
        };
        hasNewProducts = true;
      }
    });
    
    setInventory(currentInventory);
    if (hasNewProducts || !savedInventory) {
      localStorage.setItem('inventory', JSON.stringify(currentInventory));
    }
  }, []);

  // Lưu inventory vào localStorage khi thay đổi
  useEffect(() => {
    if (Object.keys(inventory).length > 0) {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  // Lấy số lượng tồn kho của sản phẩm
  const getStock = (productId) => {
    return inventory[productId]?.stock || 0;
  };

  // Lấy số lượng có thể bán (tồn kho - đã đặt)
  const getAvailableStock = (productId) => {
    const item = inventory[productId];
    if (!item) return 0;
    return Math.max(0, item.stock - item.reserved);
  };

  // Đặt hàng (reserve sản phẩm)
  const reserveProduct = (productId, quantity) => {
    const available = getAvailableStock(productId);
    if (available < quantity) {
      return false; // Không đủ hàng
    }

    setInventory(prev => {
      const newInventory = {
        ...prev,
        [productId]: {
          ...prev[productId],
          reserved: (prev[productId]?.reserved || 0) + quantity
        }
      };
      localStorage.setItem('inventory', JSON.stringify(newInventory));
      return newInventory;
    });
    return true;
  };

  // Hủy đặt hàng (unreserve sản phẩm)
  const unreserveProduct = (productId, quantity) => {
    setInventory(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        reserved: Math.max(0, (prev[productId]?.reserved || 0) - quantity)
      }
    }));
  };

  // Xác nhận bán hàng (trừ tồn kho thực tế)
  const confirmSale = (productId, quantity) => {
    setInventory(prev => {
      const item = prev[productId];
      if (!item) return prev;

      const newInventory = {
        ...prev,
        [productId]: {
          stock: Math.max(0, item.stock - quantity),
          reserved: Math.max(0, item.reserved - quantity)
        }
      };
      
      // Lưu ngay vào localStorage
      localStorage.setItem('inventory', JSON.stringify(newInventory));
      
      return newInventory;
    });
  };

  // Nhập hàng (tăng tồn kho)
  const addStock = (productId, quantity) => {
    setInventory(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        stock: (prev[productId]?.stock || 0) + quantity
      }
    }));
  };

  // Kiểm tra sản phẩm có còn hàng không
  const isInStock = (productId) => {
    return getAvailableStock(productId) > 0;
  };

  // Lấy trạng thái tồn kho
  const getStockStatus = (productId) => {
    const available = getAvailableStock(productId);
    if (available === 0) return 'out-of-stock';
    if (available <= 5) return 'low-stock';
    return 'in-stock';
  };

  // Reset inventory (để test hoặc cập nhật)
  const resetInventory = () => {
    const defaultInventory = {};
    
    // Thêm tồn kho cho sản phẩm thường
    allProducts.forEach(product => {
      defaultInventory[product.id] = {
        stock: Math.floor(Math.random() * 60) + 10,
        reserved: 0
      };
    });
    
    // Thêm tồn kho cho sản phẩm khuyến mãi
    saleProducts.forEach(product => {
      defaultInventory[product.id] = {
        stock: Math.floor(Math.random() * 40) + 5,
        reserved: 0
      };
    });
    
    setInventory(defaultInventory);
    localStorage.setItem('inventory', JSON.stringify(defaultInventory));
  };

  const value = {
    inventory,
    getStock,
    getAvailableStock,
    reserveProduct,
    unreserveProduct,
    confirmSale,
    addStock,
    isInStock,
    getStockStatus,
    resetInventory
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};