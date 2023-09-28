import { create } from "zustand";

interface BearState {
  content: [];
  setContent: (pageBlockData: []) => void;
  setBlockData: (index: number, newValue: {}) => void;
}

const useContentStore = create<BearState>()((set) => ({
  content: [],
  setContent: (pageBlockData) => set((state) => ({ content: pageBlockData })),
  setBlockData: (index, newValue) =>
    set((state) => {
      const newData = [...state.content];
      newData[index] = newValue;
      return { content: newData };
    }),
}));

export default useContentStore;
