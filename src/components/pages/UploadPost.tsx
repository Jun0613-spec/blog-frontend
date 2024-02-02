import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { MAIN_PATH } from "../../constant";

import usePostStore from "../../stores/post.store";

const PostWrite = () => {
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { title, setTitle } = usePostStore();
  const { content, setContent } = usePostStore();
  const { postImageFileList, setPostImageFileList } = usePostStore();
  const { resetPost } = usePostStore();

  const [cookies] = useCookies();

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const navigate = useNavigate();

  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if (!contentRef.current) return null;
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map((item) => item);
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    const newPostImageFileList = postImageFileList.map((item) => item);
    newPostImageFileList.push(file);
    setPostImageFileList(newPostImageFileList);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";
  };

  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";

    const newImageUrls = imageUrls.filter(
      (url, index) => index !== deleteIndex
    );
    setImageUrls(newImageUrls);

    const newPostImageFileList = postImageFileList.filter(
      (file, index) => index !== deleteIndex
    );
    setPostImageFileList(newPostImageFileList);
  };

  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate(MAIN_PATH());
      return;
    }
    resetPost();
  }, []);

  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-zinc-800">
      <div className="w-full lg:w-11/12 xl:w-10/12 bg-white dark:bg-zinc-800 px-6 py-8 lg:py-20">
        <div className="flex flex-col lg:gap-10">
          <div className="w-full">
            <input
              className="w-full text-black/70 dark:text-white text-base md:text-2xl lg:text-4xl font-medium leading-tight border-none bg-transparent outline-none"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="divider" />
          <div className="w-full flex flex-row items-center gap-4">
            <textarea
              ref={contentRef}
              className="w-full resize-none text-black/70 dark:text-white text-base md:text-2xl lg:text-4xl font-medium tight border-none bg-transparent outline-none
              "
              placeholder="Type here"
              value={content}
              onChange={onContentChangeHandler}
            />

            <button className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-full">
              <CiImageOn
                className="lg:w-6 lg:h-6 text-black dark:text-white"
                onClick={onImageUploadButtonClickHandler}
              />
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChangeHandler}
            />
          </div>
          {/* ImageBox */}
          <div className="flex flex-col gap-5 w-full lg:w-auto">
            {imageUrls.map((imageUrl, index) => (
              <div className="lg:w-full relative">
                <img src={imageUrl} alt="" className="w-full" />
                <button className="w-6 h-6 flex items-center justify-center cursor-pointer rounded-full absolute right-5 top-5 text-gray-300 dark:text-white">
                  <AiOutlineClose
                    onClick={() => onImageCloseButtonClickHandler(index)}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;
