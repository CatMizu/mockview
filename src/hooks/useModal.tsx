// hooks/useModal.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ModalState {
  isOpen: boolean;
  bodyType: string;
  size: string;
  extraObject: any;
  title: string;
}

interface ModalContextType extends ModalState {
  openModal: (modalState: Partial<ModalState>) => void;
  closeModal: () => void;
}

const initialModalState: ModalState = {
  isOpen: false,
  bodyType: 'DEFAULT',
  size: 'md',
  extraObject: null,
  title: '',
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal = useCallback((newState: Partial<ModalState>) => {
    setModalState((prevState) => ({
      ...prevState,
      ...newState,
      isOpen: true,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      isOpen: false,
      bodyType: 'DEFAULT',
      size: 'md',
      extraObject: null,
      title: '',
    }));
  }, []);

  return (
    <ModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
