import { create } from 'zustand'

export const useWorkspaceCreationState = create(set => ({
  name: '',
  imageUrl: '',
  updateImageUrl: imageUrl => set({ imageUrl }),
  updateName: name => set({ name }),
  currentStep: 1,
  setCurrentStep: currentStep => set({ currentStep }),
}));