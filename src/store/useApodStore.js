import { create } from 'zustand';
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

    fetchApodByDate: async (params) => {
        set({ error: '' });
        try {
            let apiUrl = 'http://localhost:8080/api/nasa/apod/query';
            const query = new URLSearchParams();

            if (params.date) {
                query.append('date', params.date);

            }
            if (params.thumbs) {
                query.append('thumbs', params.thumbs);
            }

            apiUrl += '?' + query.toString();

            const response = await axios.get(apiUrl);
            if (response.data && Array.isArray(response.data)) {
                set({ apodData: response.data });
            } else if (response.data) {
                set({ apodData: [response.data] });
            } else {
                set({ apodData: [] });
            }
        } catch (err) {
            set({ error: `Failed to fetch APOD data: ${err.message}` });
        }
    },

    fetchApodByParams: async (params) => {
        set({ error: '' });
        try {
            const response = await axios.get('http://localhost:8080/api/nasa/apod/query', { params });
            if ('date' in params && Object.keys(params).length === 1) {
                set({ apodData: response.data ? [response.data] : [] });
            } else {
                set({ rangeOrCountData: response.data ? response.data : [] });
            }
        } catch (err) {
            set({ error: `Failed to fetch APOD data: ${err.message}` });
        }
    },

    resetData: () => {
        set({ apodData: [], rangeOrCountData: [] });
    }
}));

export default useApodStore;




