import User from "../../../stores/login-user.store";

import Response from "../response";

export default interface GetLoginUserResponse extends Response, User {}
