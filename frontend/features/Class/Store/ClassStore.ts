import { create } from "zustand";
import { Class } from "../Type/ClassType";
import { getClasses } from "../Api/ClassApi";

interface ClassState {
  classes: Record<number, Class>;
  setClasses: (classes: Class[]) => void;
  getClassById: (id: number) => string | undefined;
  addClass: (cls: Class) => void;
  deleteClass: (id: number) => void;
  fetchClasses: () => void;
  updateClass: (cls: Class) => void;
}

const useClassStore = create<ClassState>((set, get) => ({
  classes: {},
  setClasses: (classes: Class[]) =>
    set(() => ({
      classes: classes.reduce((acc, cls) => {
        acc[cls.id] = cls;
        return acc;
      }, {} as Record<number, Class>),
    })),
    fetchClasses: async () => {
      const res = await getClasses();
      if (res.succeeded && res.value) {
        get().setClasses(res.value.items);
      }
    },
  getClassById: (id: number) => {
    return get().classes[id]?.className;
  },

  addClass: (cls: Class) =>
    set((state) => ({
      classes: { ...state.classes, [cls.id]: cls },
    })),

  deleteClass: (id: number) =>
    set((state) => {
      const newClasses = { ...state.classes };
      delete newClasses[id];
      return { classes: newClasses };
    }),

  updateClass: (cls: Class) =>
    set((state) => ({
      classes: { ...state.classes, [cls.id]: cls },
    })),
}));

export default useClassStore;