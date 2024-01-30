import Response from "../response";

export default interface GetRelationWordListResponse extends Response {
  relativeWordList: string[];
}
