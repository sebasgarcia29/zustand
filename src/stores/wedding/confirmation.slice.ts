import { StateCreator } from "zustand";



export interface ConfirmationInterface {
    isConfirmed: boolean;
    setIsConfirmed: (isConfirmed: boolean) => void;
}

export const createConfirmationSlice: StateCreator<ConfirmationInterface> = (set) => ({
    isConfirmed: false,
    setIsConfirmed: (isConfirmed: boolean) => set({ isConfirmed })
})