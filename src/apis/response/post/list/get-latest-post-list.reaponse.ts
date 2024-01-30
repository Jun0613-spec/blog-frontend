import PostListItem from "../../../../types/interface/post-list-item.interface";
import Response from "../../response";

export default interface GetLatestPostListResponse extends Response {
  latestList: PostListItem[];
}
