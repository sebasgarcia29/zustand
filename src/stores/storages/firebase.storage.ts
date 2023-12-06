/* eslint-disable no-useless-catch */
import { StateStorage, createJSONStorage } from "zustand/middleware"


const FIREBASE_URL = 'https://zustand-storage-seb-default-rtdb.firebaseio.com/zustand'

export const storageAPI: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {

        try {
            const data = await fetch(`${FIREBASE_URL}/${name}.json`).then(res => res.json())
            return JSON.stringify(data);
        } catch (error) {
            throw error;
        }

    },
    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${FIREBASE_URL}/${name}.json`, {
            method: 'PUT',
            body: value
        }).then(res => res.json())
        console.count('setItem')
        return;
    },
    removeItem: function (name: string): void | Promise<void> {
        console.log('removeItem', { name })
    }
}

export const firebaseStorage = createJSONStorage(() => storageAPI)