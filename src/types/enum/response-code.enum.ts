export enum ResponseCode {
  SUCCESS = "SU",

  VALIDATION_FAILED = "VF",
  DUPLICATE_EMAIL = "DE",
  DUPLICATE_USERNAME = "DU",
  NOT_EXISTED_USER = "NEU",
  NOT_EXISTED_POST = "NEP",

  SIGN_IN_FAIL = "SF",
  AUTHORIZATION_FAIL = "AF",

  NO_PERMISSION = "NP",

  DATABASE_ERROR = "DBE",
}

export default ResponseCode;
