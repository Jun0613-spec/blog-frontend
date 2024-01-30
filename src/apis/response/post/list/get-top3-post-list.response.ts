import PostListItem from "../../../../types/interface/post-list-item.interface";
import Response from "../../response";

export default interface GetTop3PostListResponse extends Response {
  top3List: PostListItem[];
}
