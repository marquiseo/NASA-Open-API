import create from 'zustand';

const useApodStore = create((set) => ({
    apodData: [],
    rangeOrCountData: [],
    error: '',
    setDateRange: (data) => set(data),
    setError: (error) => set({ error }),
    resetData: () => set({ apodData: [], rangeOrCountData: [] }),
}));

export default useApodStore;
