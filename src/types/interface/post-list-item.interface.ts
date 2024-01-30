export default interface PostListItem {
  postId: number;
  title: string;
  content: string;
  postTitleImage: string | null;
  favoriteCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  postUserName: string;
  postUserProfileImage: string | null;
}
