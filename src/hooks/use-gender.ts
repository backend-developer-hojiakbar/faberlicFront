import { create } from "zustand";

interface GenderChange {
  gender: string;
  onGenderChange: (value: string) => void;
}

const useGender = create<GenderChange>((set) => ({
  gender: "",
  onGenderChange: (value: string) => set({ gender: value }),
}));

export default useGender;
