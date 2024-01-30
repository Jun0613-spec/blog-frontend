export default interface CommentListItem {
  postId: number;
  commentId: number;
  userName: string;
  profileImage: string | null;
  createdAt: string;
  content: string;
  email: string;
}
