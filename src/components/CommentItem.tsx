import React, { useState } from "react";
import dayjs from "dayjs";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import defaultProfile from "../assets/default-profile.png";

import CommentListItem from "../types/interface/comment-list-item.interface";

import Avatar from "./Avatar";

import { useLoginUserStore } from "../stores/login-user.store";

import { AUTH_PATH, POST_DETAIL_PATH, POST_PATH } from "../constant";

import { deleteCommentRequest, updateCommentRequest } from "../apis";
import DeleteCommentResponse from "../apis/response/comment/delete-comment.response";
import Response from "../apis/response/response";
import UpdateCommentRequest from "../apis/request/comment/update-comment.request";
import UpdateCommentResponse from "../apis/response/comment/update-comment.response";

interface Props {
  commentListItem: CommentListItem;
}

const CommentItem: React.FC<Props> = ({ commentListItem }) => {
  const { commentId, userName, profileImage, createdAt, content } =
    commentListItem;

  const { postId } = useParams();
  const { loginUser } = useLoginUserStore();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const isCommenter = loginUser && loginUser.userName === userName;

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState<string>(content);

  const editCommentHandler = () => {
    if (loginUser && cookies.accessToken) {
      setIsEditing(!isEditing);
    }
  };

  const cancelEditComment = () => {
    setIsEditing(false);
    setEditedComment(content);
  };

  // Update Comment Response
  const updateCommentResponse = (
    responseBody: UpdateCommentResponse | Response | null
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "AF" || code === "NEU" || code === "NEP" || code === "NP")
      navigate(AUTH_PATH());
    if (code === "VF") toast.error("You must type something");
    if (code === "DBE") toast.error("DATABSE ERROR.");
    if (code !== "SU") return;

    if (!postId) {
      toast.error("Couldn't find the post");
      return;
    } else {
      navigate(POST_PATH() + "/" + POST_DETAIL_PATH(postId));
      toast.success("Successfully updated.");
    }
  };

  // Submit Comment Edit
  const submitEditComment = () => {
    if (!postId || !commentId || !cookies.accessToken) return;

    const requestBody: UpdateCommentRequest = {
      content: editedComment,
    };

    updateCommentRequest(
      postId,
      commentId,
      requestBody,
      cookies.accessToken
    ).then(updateCommentResponse);
  };

  // Delete Comment Response
  const deleteCommentResponse = (
    responseBody: DeleteCommentResponse | Response | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "VF") toast.error("Validation failed.");
    if (code === "NP") toast.error("No permission.");
    if (code === "DBE") toast.error("DATABASE ERROR.");
    if (code !== "SU") return;
  };

  const deleteCommentHandler = () => {
    if (!postId || !commentId || !loginUser || !cookies.accessToken) {
      toast.error("Something went wrong");
      return;
    }

    if (loginUser && cookies.accessToken) {
      if (window.confirm("Do you really want to delete the comment?")) {
        deleteCommentRequest(postId, commentId, cookies.accessToken).then(
          deleteCommentResponse
        );
        toast.success("Successfully deleted.");
        window.location.reload();
      } else {
        toast.error("Cancelled");
      }
    }
  };

  const getElapsedTime = () => {
    const now = dayjs();
    const commentCreatedAt = dayjs(createdAt);

    const gap = now.diff(commentCreatedAt, "s");
    if (gap < 1) return "0 sec ago";
    if (gap === 1) return "1 sec ago";
    if (gap < 60) return `${gap} secs ago`;

    const mins = Math.floor(gap / 60);
    if (mins === 1) return "1 min ago";
    if (mins < 60) return `${mins} mins ago`;

    const hours = Math.floor(gap / 3600);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(gap / 86400);
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(gap / 604800);
    if (weeks === 1) return "1 week ago";
    if (weeks < 4) return `${weeks} weeks ago`;

    const months = Math.floor(gap / (86400 * 30));
    if (months === 1) return "1 month ago";
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(gap / (86400 * 365));
    if (years === 1) return "1 year ago";
    if (years > 1) return `${years} years ago`;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div>
          <Avatar src={profileImage ? profileImage : defaultProfile} />
        </div>
        <div className="text-neutral-700 dark:text-neutral-200 text-base font-medium leading-tight cursor-pointer">
          {userName}
        </div>
        <div className="text-neutral-400 dark:text-neutral-400 text-base font-normal leading-tight">
          {getElapsedTime()}
        </div>
      </div>

      <div className="flex justify-between">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className="text-sm sm:text-base bg-transparent text-neutral-600 dark:text-neutral-200 resize-none w-full h-8 px-2 py-1 border border-neutral-300 dark:border-neutral-400 rounded focus:outline-none overflow-hidden textarea-lg"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              type="text"
            />
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={submitEditComment}
                className="bg-blue-500 dark:bg-blue-600 hover:opacity-70 text-white dark:text-neutral-200 px-1.5 rounded text-xs sm:text-xs md:text-base"
              >
                Save
              </button>
              <button
                onClick={cancelEditComment}
                className="bg-red-500 dark:bg-red-600 hover:opacity-70 text-white dark:text-neutral-200 px-1.5 rounded text-xs sm:text-xs md:text-base "
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="text-neutral-700 dark:text-neutral-200 text-sm md:text-base font-medium leading-tight">
            {content}
          </div>
        )}

        {isCommenter && (
          <div className="flex justify-end items-center gap-2">
            <button
              className="text-blue-500 dark:text-blue-600 p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-400 hover:opacity-60"
              onClick={editCommentHandler}
            >
              <MdModeEdit />
            </button>
            <button
              className="text-red-500 dark:text-red-600 p-1 rounded-full hover:bg-red-200 dark:hover:bg-red-400 hover:opacity-60"
              onClick={deleteCommentHandler}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
