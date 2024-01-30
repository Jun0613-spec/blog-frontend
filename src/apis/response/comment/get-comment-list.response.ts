import CommentListItem from "../../../types/interface/comment-list-item.interface";
import Comment from "../../../types/interface/comment.interface";
import Response from "../response";

export default interface GetCommentListResponse extends Response {
  commentList: CommentListItem[];
}
