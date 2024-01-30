import { create } from "zustand";

interface PostStore {
  title: string;
  content: string;
  postImageFileList: File[];
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setPostImageFileList: (postImageFileList: File[]) => void;
  resetPost: () => void;
}

const usePostStore = create<PostStore>((set) => ({
  title: "",
  content: "",
  postImageFileList: [],
  setTitle: (title) => set((state) => ({ ...state, title })),
  setContent: (content) => set((state) => ({ ...state, content })),
  setPostImageFileList: (postImageFileList) =>
    set((state) => ({ ...state, postImageFileList })),
  resetPost: () =>
    set((state) => ({
      ...state,
      title: "",
      content: "",
      postImageFileList: [],
    })),
}));

export default usePostStore;
