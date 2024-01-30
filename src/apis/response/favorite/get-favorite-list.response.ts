import FavoriteListItem from "../../../types/interface/favorite-list-item.interface";
import Response from "../response";

export default interface GetFavoriteListResponse extends Response {
  favoriteList: FavoriteListItem[];
}
