import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { PersonSlice, createPersonSlice } from "./person.slice";
import { GuestInterface, createGuestSlice } from './guest.slice';
import { DateInterface, createDateSlice } from './date.slice';
import { ConfirmationInterface, createConfirmationSlice } from "./confirmation.slice";

type ShareState = PersonSlice & GuestInterface & DateInterface & ConfirmationInterface

export const useWeddingBoundStore = create<ShareState>()(
    // persist(
    devtools(
        (...a) => ({
            ...createPersonSlice(...a),
            ...createGuestSlice(...a),
            ...createDateSlice(...a),
            ...createConfirmationSlice(...a),
        }),
    ),
    //     {
    //         name: 'wedding-store',
    //     }
    // ),
);