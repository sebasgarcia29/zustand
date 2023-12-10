import { StateCreator } from "zustand";



export interface DateInterface {
    eventdate: number;

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (parcialDate: string) => void;
    setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateInterface> = (set, get) => ({
    eventdate: new Date().getTime(),

    eventYYYYMMDD: () => {
        const formatDate = new Date(get().eventdate)
        return formatDate.toISOString().split('T')[0]
    },
    eventHHMM: () => {
        const formatDate = new Date(get().eventdate)
        const hours = formatDate.getHours().toString().padStart(2, '0');
        const minutes = formatDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`
    },

    setEventDate: (partialDate: string) => set((state) => {
        const date = new Date(partialDate);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const newDate = new Date(state.eventdate);
        newDate.setFullYear(year, month, day);
        return { eventdate: newDate.getTime() }
    }),


    setEventTime: (eventTime: string) => set((state) => {
        const hours = parseInt(eventTime.split(':')[0]);
        const minutes = parseInt(eventTime.split(':')[1]);


        const newDate = new Date(state.eventdate);
        newDate.setHours(hours, minutes);

        return { eventdate: newDate.getTime() }
    })
})


//? With Persist
// export const createDateSlice: StateCreator<DateInterface> = (set, get) => ({
//     eventdate: new Date().getTime(),

//     eventYYYYMMDD: () => {
//         const formatDate = new Date(get().eventdate)
//         return formatDate.toISOString().split('T')[0]
//     },
//     eventHHMM: () => {
//         const formatDate = new Date(get().eventdate)
//         const hours = formatDate.getHours().toString().padStart(2, '0');
//         const minutes = formatDate.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`
//     },

//     setEventDate: (partialDate: string) => set((state) => {
//         const date = new Date(partialDate);
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const day = date.getDate();

//         const newDate = new Date(state.eventdate);
//         newDate.setFullYear(year, month, day);
//         return { eventdate: newDate.getTime() }
//     }),


//     setEventTime: (eventTime: string) => set((state) => {
//         const hours = parseInt(eventTime.split(':')[0]);
//         const minutes = parseInt(eventTime.split(':')[1]);


//         const newDate = new Date(state.eventdate);
//         newDate.setHours(hours, minutes);

//         return { eventdate: newDate.getTime() }
//     })
// })





