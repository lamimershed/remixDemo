import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface BearState {
  content: [];
  setContent: (pageBlockData: []) => void;
  setBlockData: (index: number, newValue: {}) => void;
  setNewBlock: (index: number, newValue: {}) => void;
  setDeleteBlock: (ComponentId: string) => void;
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
  setNewBlock: (index, newValue) => {
    // console.log("index=====", index);
    newValue.ComponentId = uuidv4();
    if (index === undefined) {
      // setB((prev) => [...prev, newBlock]);
      return set((state) => {
        const newData = [...state.content, newValue];
        // newData.splice(index, 0, newValue);
        return { content: newData };
      });
    } else {
      return set((state) => {
        const newData = [...state.content];
        newData.splice(index, 0, newValue);
        return { content: newData };
      });
    }
  },
  setDeleteBlock: (ComponentId) => {
    console.log("===deletetd");
    return set((state) => {
      const newData = state.content.filter(
        (item) => item.ComponentId !== ComponentId
      );
      return { content: newData };
    });
  },
}));

export default useContentStore;
