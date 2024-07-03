import { create } from "zustand";

interface FilterProps {
  text: string;
  onChange: (value: string) => void;
}

const useFilter = create<FilterProps>((set) => ({
  text: "",
  onChange: (value: string) => set({ text: value }),
}));

export default useFilter;
