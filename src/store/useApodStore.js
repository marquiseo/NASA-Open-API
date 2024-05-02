import create from 'zustand';
import axios from 'axios';

const useApodStore = create((set) => ({
    apodData: [],
    rangeOrCountData: [],
    error: '',

    fetchTodayApod: async () => {
        set({ error: '' });
        try {
            const response = await axios.get('http://localhost:8080/api/nasa/apod/today');
            set({ apodData: response.data ? [response.data] : [] });
        } catch (err) {
            set({ error: 'Failed to fetch today\'s APOD: ' + err.message });
        }
    },

    fetchApodByParams: async (params) => {
        set({ error: '' });
        try {
            const response = await axios.get('http://localhost:8080/api/nasa/apod/query', { params });
            set({ rangeOrCountData: response.data ? response.data : [] });
        } catch (err) {
            set({ error: 'Failed to fetch APOD data: ' + err.message });
        }
    },

    resetData: () => {
        set({ apodData: [], rangeOrCountData: [] });
    }
}));

export default useApodStore;
