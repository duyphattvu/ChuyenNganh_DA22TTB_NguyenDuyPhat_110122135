import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Load giỏ hàng từ localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        return parsedCart;
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const [inventoryHook, setInventoryHook] = useState(null);

  // Lưu giỏ hàng vào localStorage khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Lắng nghe sự thay đổi localStorage (khi đăng xuất)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        setCartItems([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Kiểm tra định kỳ để xử lý trường hợp cùng tab
    const interval = setInterval(() => {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart && cartItems.length > 0) {
        setCartItems([]);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [cartItems.length]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Tìm item có cùng id, size và màu
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color?.value === product.color?.value
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && 
          item.size === product.size && 
          item.color?.value === product.color?.value
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId, size = null, color = null) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => {
        if (size && color) {
          return item.id === productId && item.size === size && item.color?.value === color.value;
        }
        return item.id === productId;
      });
      if (itemToRemove && inventoryHook) {
        // Unreserve sản phẩm khi xóa khỏi giỏ hàng
        inventoryHook.unreserveProduct(productId, itemToRemove.quantity);
      }
      if (size && color) {
        return prevItems.filter(item => 
          !(item.id === productId && item.size === size && item.color?.value === color.value)
        );
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (productId, quantity, size = null, color = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    
    setCartItems(prevItems => {
      const currentItem = prevItems.find(item => {
        if (size && color) {
          return item.id === productId && item.size === size && item.color?.value === color.value;
        }
        return item.id === productId;
      });
      if (currentItem && inventoryHook) {
        const difference = quantity - currentItem.quantity;
        if (difference > 0) {
          // Tăng số lượng - cần reserve thêm
          const success = inventoryHook.reserveProduct(productId, difference);
          if (!success) {
            alert('❌ Không đủ hàng trong kho!');
            return prevItems; // Không thay đổi nếu không đủ hàng
          }
        } else if (difference < 0) {
          // Giảm số lượng - unreserve
          inventoryHook.unreserveProduct(productId, Math.abs(difference));
        }
      }
      
      return prevItems.map(item => {
        if (size && color) {
          if (item.id === productId && item.size === size && item.color?.value === color.value) {
            return { ...item, quantity };
          }
        } else {
          if (item.id === productId) {
            return { ...item, quantity };
          }
        }
        return item;
      });
    });
  };

  // Xóa toàn bộ giỏ hàng
  // skipUnreserve = true khi đã confirmSale (đã trừ tồn kho)
  const clearCart = (skipUnreserve = false) => {
    if (inventoryHook && !skipUnreserve) {
      // Unreserve tất cả sản phẩm trong giỏ hàng
      cartItems.forEach(item => {
        inventoryHook.unreserveProduct(item.id, item.quantity);
      });
    }
    setCartItems([]);
  };

  // Tính tổng tiền
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Tính tổng số lượng
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    setInventoryHook
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
