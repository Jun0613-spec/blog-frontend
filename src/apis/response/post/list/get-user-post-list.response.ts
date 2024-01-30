import PostListItem from "../../../../types/interface/post-list-item.interface";
import Response from "../../response";

export default interface GetUserPostListResponse extends Response {
  userPostList: PostListItem[];
}
