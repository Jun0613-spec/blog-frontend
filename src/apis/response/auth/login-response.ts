import Response from "../response";

export default interface LoginResponse extends Response {
  token: string;
  expirationTime: number;
}
