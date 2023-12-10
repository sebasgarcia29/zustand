import { StateCreator } from "zustand";


export interface GuestInterface {
    guestCount: number;
    setGuestCount: (count: number) => void;
}


export const createGuestSlice: StateCreator<GuestInterface> = (set) => ({
    guestCount: 0,
    setGuestCount: (count: number) => set({
        guestCount: count > 0 ? count : 0
    }),
})