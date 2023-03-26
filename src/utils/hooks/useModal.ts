import { useState, useCallback } from 'react';

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleModal = useCallback(() => setIsModalOpen((s) => !s), []);

  return { isModalOpen, openModal, closeModal, toggleModal };
}

export default useModal;
