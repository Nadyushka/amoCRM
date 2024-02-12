import {defineStore} from "pinia";
import {api} from "../services/api";
import {ContentTypes} from "../types/content";


export const useContentStore = defineStore("content", {
    state: () => ({
        isLoading: false,
        leads: [],
        contacts: [],
        companies: []

    }),
    getters: {},
    actions: {
        async createContent(type: ContentTypes) {
            try {
                this.isLoading = true

                const res = await api.post(`${type}`)

                this[type] = res.data?.['_embedded']?.type

            } catch {

            } finally {
                this.isLoading = false
            }
        },
    },
});
