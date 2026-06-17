import create from 'zustand';

const useMapStore = create((set) => ({
  center: [20, 0],
  zoom: 2,
  selectedLocation: null,
  showSatelliteData: true,
  showNaturalEvents: true,
  selectedDataType: 'all',

  setCenter: (lat, lng) => set({ center: [lat, lng] }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  toggleSatelliteData: () => set((state) => ({ showSatelliteData: !state.showSatelliteData })),
  toggleNaturalEvents: () => set((state) => ({ showNaturalEvents: !state.showNaturalEvents })),
  setSelectedDataType: (type) => set({ selectedDataType: type }),
}));

export default useMapStore;
export { useMapStore };
