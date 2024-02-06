import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import defaultProfile from "../../assets/default-profile.png";
import { MdArrowRightAlt, MdEdit, MdImage } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import Avatar from "../Avatar";
import PostItem from "../PostListItem";
import Pagination from "../Pagination";

import PostListItem from "../../types/interface/post-list-item.interface";

import {
  MAIN_PATH,
  POST_PATH,
  POST_UPLOAD_PATH,
  USER_PATH,
} from "../../constant";

import { useLoginUserStore } from "../../stores/login-user.store";

import usePagination from "../../hooks/pagination.hook";

import Response from "../../apis/response/response";
import {
  fileUploadRequest,
  getUserPostListRequest,
  getUserRequest,
  updateProfileImageRequest,
  updateUsernameRequest,
} from "../../apis";
import GetUserResponse from "../../apis/response/user/get-user.response";
import GetUserPostListResponse from "../../apis/response/post/list/get-user-post-list.response";
import UpdateProfileImageRequest from "../../apis/request/user/update-profile-image.request";
import UpdateProfileImageResponse from "../../apis/response/user/update-profile-image.response";
import UpdateUsernameRequest from "../../apis/request/user/update-username.request";
import UpdateUsernameResponse from "../../apis/response/user/update-username.response";

const UserPage = () => {
  const { userName } = useParams();

  const { loginUser, updateLoginUser } = useLoginUserStore();

  const [cookies] = useCookies();

  const navigate = useNavigate();

  const {
    currentPage,
    currentSection,
    viewList,
    viewPageList,
    totalSection,
    setCurrentPage,
    setCurrentSection,
    setTotalList,
  } = usePagination<PostListItem>(5);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [isMyPage, setIsMyPage] = useState<boolean>();

  const [isUsernameChange, setIsUsernameChange] = useState(false);

  const [username, setUsername] = useState("");

  const [changeUsername, setChangeUsername] = useState("");

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [count, setCount] = useState(0);

  //delete this later
  const [email, setEmail] = useState("");

  //Click Profile Image
  const profileImageClickHandelr = () => {
    if (!isMyPage) return;
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  //Change Profile Image
  const profileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files?.length) return;

    const file = event.target.files[0];
    const data = new FormData();
    data.append("file", file);

    fileUploadRequest(data).then(fileUploadResponse);
  };

  //Username Edit button
  const usernameEditButtonHandler = () => {
    if (!isUsernameChange) {
      setChangeUsername(username);
      setIsUsernameChange(!isUsernameChange);
      return;
    }

    const requestBody: UpdateUsernameRequest = { userName: changeUsername };
    updateUsernameRequest(requestBody, cookies.accessToken).then(
      updateUsernameResponse
    );
  };

  const onSideCardClickHandler = () => {
    if (isMyPage) {
      navigate(POST_PATH() + "/" + POST_UPLOAD_PATH());
    } else if (loginUser) {
      navigate(USER_PATH(loginUser.userName));
    } else {
      toast.error("Something went wrong");
    }
  };

  // Get User Response
  const getUserResponse = useCallback(
    (responseBody: GetUserResponse | Response | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") return "DATABASE ERROR";
      if (code === "NEU") toast.error("This user does not exist");
      if (code !== "SU") navigate(MAIN_PATH());

      const { email, userName, profileImage } = responseBody as GetUserResponse;
      setEmail(email);
      setUsername(userName);
      setProfileImage(profileImage);

      setIsMyPage(email === loginUser?.email);
    },
    [loginUser?.email, navigate]
  );

  // const getUserResponse = (responseBody: GetUserResponse | Response | null) => {
  //   if (!responseBody) return;
  //   const { code } = responseBody;
  //   if (code === "DBE") return "DATABASE ERROR";
  //   if (code === "NEU") toast.error("This user does not exist");
  //   if (code !== "SU") navigate(MAIN_PATH());

  //   const { email, userName, profileImage } = responseBody as GetUserResponse;
  //   setEmail(email);
  //   setUsername(userName);
  //   setProfileImage(profileImage);

  //   setIsMyPage(email === loginUser?.email);
  // };

  //File Upload Response
  const fileUploadResponse = (profileImage: string | null) => {
    if (!profileImage) return;
    if (!cookies.accessToken) return;

    const requestBody: UpdateProfileImageRequest = { profileImage };
    updateProfileImageRequest(requestBody, cookies.accessToken).then(
      updateProfileImageResponse
    );
  };

  // Update ProfileImage Response
  const updateProfileImageResponse = (
    responseBody: UpdateProfileImageResponse | Response | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF") toast.error("AUTHORIZATION FAILED");
    if (code === "DBE") toast.error("DATABASE ERROR");
    if (code !== "SU") return;

    if (!userName) return;
    getUserRequest(userName).then(getUserResponse);
  };

  // Edit Username Response
  const updateUsernameResponse = (
    responseBody: UpdateUsernameResponse | Response | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;

    if (code === "DU") toast.error("This username is already in used");
    if (code === "DBE") toast.error("DATABASE ERROR");
    if (code !== "SU") return null;

    getUserRequest(changeUsername).then((updatedUserResponse) => {
      const updatedUser = updatedUserResponse as GetUserResponse;
      getUserResponse(updatedUser);

      navigate(USER_PATH(changeUsername));
      toast.success("Username has been changed");
      setIsUsernameChange(false);

      updateLoginUser(updatedUser);
    });
  };

  // Get Post List Response
  const getUserPostListResponse = useCallback(
    (responseBody: GetUserPostListResponse | Response | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "NEU") {
        toast.error("This user does not exist");
        navigate(MAIN_PATH());
        return;
      }
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return null;

      const { userPostList } = responseBody as GetUserPostListResponse;
      setTotalList(userPostList);
      setCount(userPostList.length);
    },
    [navigate, setTotalList]
  );

  // const getUserPostListResponse = (
  //   responseBody: GetUserPostListResponse | Response | null
  // ) => {
  //   if (!responseBody) return;
  //   const { code } = responseBody;
  //   if (code === "NEU") {
  //     toast.error("This user does not exist");
  //     navigate(MAIN_PATH());
  //     return;
  //   }
  //   if (code === "DBE") return "DATABASE ERROR";
  //   if (code !== "SU") return null;

  //   const { userPostList } = responseBody as GetUserPostListResponse;
  //   setTotalList(userPostList);
  //   setCount(userPostList.length);
  // };

  useEffect(() => {
    if (!userName) return;
    getUserRequest(userName).then(getUserResponse);
    getUserPostListRequest(userName).then(getUserPostListResponse);
  }, [userName, getUserResponse, getUserPostListResponse]);

  return (
    <>
      <div className="border-y-[1px] dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 flex justify-center px-2 py-4 md:py-8">
        <div className="w-full md:w-[1200px] min-w-[280px] max-w-[1200px] flex flex-col md:flex-row items-center gap-6">
          {isMyPage ? (
            <div
              className="flex justify-center items-center bg-neutral-300 dark:bg-neutral-700 rounded-full"
              onClick={profileImageClickHandelr}
            >
              {profileImage === null ? (
                <div className="w-20 h-20 flex justify-center items-center bg-neutral-300 dark:bg-neutral-700 rounded-full hover:opacity-70 cursor-pointer">
                  <MdImage className="w-8 h-8" />
                </div>
              ) : (
                <Avatar src={profileImage} isLarge />
              )}

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={profileImageChangeHandler}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center bg-neutral-300 dark:bg-neutral-700 rounded-full">
              <Avatar
                src={profileImage ? profileImage : defaultProfile}
                isLarge
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2">
              {isMyPage ? (
                <>
                  {isUsernameChange ? (
                    <input
                      className=" text-neutral-700 dark:text-neutral-200 text-2xl font-medium bg-neutral-200 dark:bg-neutral-700 rounded border-none outline-none p-0"
                      type="text"
                      size={username.length + 2}
                      value={changeUsername}
                      onChange={(e) => setChangeUsername(e.target.value)}
                    />
                  ) : (
                    <p className=" text-neutral-700 dark:text-neutral-200 text-2xl font-medium leading-tight">
                      {userName}
                    </p>
                  )}

                  <button
                    className="p-1.5 hover:bg-neutral-200 hover:dark:bg-neutral-700 rounded-full"
                    onClick={usernameEditButtonHandler}
                  >
                    <MdEdit
                      className="text-neutral-700 dark:text-neutral-200 hover:opacity-70"
                      size={14}
                    />
                  </button>
                </>
              ) : (
                <p className=" text-neutral-700 dark:text-neutral-200 text-2xl font-medium leading-tight">
                  {userName}
                </p>
              )}
            </div>
            <p className=" text-neutral-500 dark:text-neutral-400  text-base font-medium leading-tight">
              {email}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex justify-center bg-neutral-50 dark:bg-neutral-800 px-4 md:px-0 py-6 md:py-10">
        <div className="w-full md:w-[1200px] flex flex-col gap-5">
          <p className=" text-neutral-700 dark:text-neutral-100 text-2xl font-medium leading-tight">
            {isMyPage ? `My Posts ${count}` : `Posts ${count}`}
          </p>
          <div className=" w-full grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-6">
            {count === 0 ? (
              <p className=" w-full h-20 flex justify-center items-center text-neutral-400 dark:text-neutral-500 text-2xl font-medium leading-tight">
                No posts
              </p>
            ) : (
              <div className="col-1/2 flex flex-col gap-4">
                {viewList.map((item) => (
                  <PostItem key={item.postId} postListItem={item} />
                ))}
              </div>
            )}
            <div className="col-1">
              <div
                className=" w-full h-16 bg-white dark:bg-neutral-700 hidden md:flex justify-center items-center cursor-pointer hover:opacity-70 rounded-lg"
                onClick={onSideCardClickHandler}
              >
                {isMyPage ? (
                  <div className="flex justify-center items-center gap-2 text-neutral-700 dark:text-neutral-200">
                    <p className="text-lg font-medium leading-tight">
                      Upload Post
                    </p>
                    <FiEdit size={20} />
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2 text-neutral-700 dark:text-neutral-200">
                    <p className="text-lg font-medium leading-tight">
                      My Posts
                    </p>

                    <MdArrowRightAlt size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {count !== 0 && (
              <Pagination
                currentPage={currentPage}
                currentSection={currentSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
