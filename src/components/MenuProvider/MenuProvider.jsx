import React, { createContext, useContext, useState } from 'react';
import AsideMenu from '../asideMenu/AsideMenu';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export function MenuProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <MenuContext.Provider value={{ openMenu, closeMenu }}>
      {children}
      <AsideMenu open={isMenuOpen} onClose={closeMenu} />
    </MenuContext.Provider>
  );
}
