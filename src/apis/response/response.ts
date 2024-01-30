import ResponseCode from "../../types/enum/response-code.enum";

export default interface Response {
  code: ResponseCode;
  message: string;
}
