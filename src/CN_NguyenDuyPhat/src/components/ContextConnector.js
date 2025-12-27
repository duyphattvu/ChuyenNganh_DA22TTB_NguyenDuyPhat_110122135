import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';

const ContextConnector = () => {
  const { setInventoryHook } = useCart();
  const inventory = useInventory();

  useEffect(() => {
    // Kết nối inventory context với cart context
    setInventoryHook(inventory);
  }, [inventory, setInventoryHook]);

  return null; // Component này không render gì
};

export default ContextConnector;