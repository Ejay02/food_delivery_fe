import { ref, provide, inject } from "vue";



const MODAL_MANAGEMENT_KEY = Symbol("modal-management");

export function createModalManagement() {
  const openModals = ref(new Set());

  function openModal(modalId) {
    openModals.value.add(modalId);
  }

  function closeModal(modalId) {
    openModals.value.delete(modalId);
  }

  function isModalOpen(modalId) {
    return openModals.value.has(modalId);
  }

  return {
    openModal,
    closeModal,
    isModalOpen,
  };
}

export function provideModalManagement() {
  const modalManagement = createModalManagement();
  provide(MODAL_MANAGEMENT_KEY, modalManagement);
  return modalManagement;
}

export function useModalManagement() {
  const modalManagement = inject(MODAL_MANAGEMENT_KEY);
  if (!modalManagement) {
    throw new Error("Modal management not provided");
  }
  return modalManagement;
}
