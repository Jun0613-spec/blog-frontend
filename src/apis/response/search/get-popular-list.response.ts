import Response from "../response";

export default interface GetPopularListResponse extends Response {
  popularWordList: string[];
}
