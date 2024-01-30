import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { GiFeather } from "react-icons/gi";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { MAIN_PATH } from "../../constant";

import Input from "../../components/Input";

import Response from "../../apis/response/response";
import LoginResponse from "../../apis/response/auth/login-response";
import { loginRequest, registerRequest } from "../../apis";
import LoginRequest from "../../apis/request/auth/login.request";
import RegisterResponse from "../../apis/response/auth/register-response";
import RegisterRequest from "../../apis/request/auth/register.request";

export default function Authentication() {
  const [view, setView] = useState<"login" | "register">("login");

  const [cookies, setCookies] = useCookies();

  const navigator = useNavigate();

  const [error, setError] = useState(false);

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);

  //    Login    //
  const LoginCard = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      setEmail(event.target.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      setPassword(event.target.value);
    };

    const loginResponse = (responseBody: LoginResponse | Response | null) => {
      if (!responseBody) {
        toast.error("Something went wrong");
        return;
      }

      const { code } = responseBody;

      if (code === "DBE") toast.error("Database error.");
      if (code === "SF" || code === "VF") setError(true);
      if (code !== "SU") return;

      const { token, expirationTime } = responseBody as LoginResponse;

      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      setCookies("accessToken", token, { expires, path: MAIN_PATH() });

      navigator(MAIN_PATH());
    };

    const onLoginButtonClickHandler = () => {
      const requestBody: LoginRequest = { email, password };
      loginRequest(requestBody).then(loginResponse);
    };

    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;

      if (!passwordRef.current) return;

      passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      onLoginButtonClickHandler();
    };

    const linkToRegisterButtonClickHandler = () => {
      setView("register");
    };

    return (
      <div className="rounded-lg p-8 bg-neutral-100 dark:bg-neutral-700">
        <div className="h-[400px] flex flex-col justify-between">
          <div className="space-y-12">
            <div className="flex items-center justify-center">
              <p className="text-black dark:text-neutral-200 text-xl font-semibold leading-tight  ">
                Login
              </p>
            </div>
            <Input
              label="Email Address"
              placeholder="Email Address"
              error={error}
              value={email}
              onChange={onEmailChange}
              onKeyDown={onEmailKeyDownHandler}
              ref={emailRef}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              error={error}
              value={password}
              onChange={onPasswordChange}
              onKeyDown={onPasswordKeyDownHandler}
              ref={passwordRef}
            />
          </div>

          {error && (
            <div className="-mb-1">
              <p className="text-red-500 text-xs font-normal leading-tight whitespace-pre-wrap">
                Incorrect email or password.
              </p>
            </div>
          )}

          <button
            className="w-full h-10 bg-black
              hover:opacity-70
              dark:bg-neutral-800 
              dark:hover:opacity-60 text-white text-lg font-medium leading-tight rounded-2xl 
              dark:hover:bg-opacity-60
            "
            onClick={onLoginButtonClickHandler}
          >
            Login
          </button>
          <div className="flex justify-center ">
            <p className=" text-black/70 dark:text-neutral-300 text-sm font-normal leading-tight">
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-black 
                  dark:text-neutral-200
                  dark:hover:text-neutral-50 hover:text-black/60"
                onClick={linkToRegisterButtonClickHandler}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  //    Register    //
  const RegisterCard = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordCheckError, setPasswordCheckError] = useState(false);

    const [userNameErrorMesage, setUserNameErrorMessage] = useState("");
    const [emailErrorMesage, setEmailErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
      useState("");

    const [isAgreedPersonalError, setIsAgreedPersonalError] = useState(false);

    const [agreedPersonal, setAgreedPersonal] = useState(false);

    const handleChange = () => {
      setAgreedPersonal(!agreedPersonal);
      setIsAgreedPersonalError(false);
    };

    const onUserNameKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;

      if (!emailRef.current) return;

      emailRef.current.focus();
    };

    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;

      if (!passwordRef.current) return;

      passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;

      if (!passwordCheckRef.current) return;

      passwordCheckRef.current.focus();
    };

    const onPasswordCheckKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      onRegisterButtonClickHandler();
    };

    const onUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
      setUserNameError(false);
      setUserNameErrorMessage("");
    };

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
      setEmailError(false);
      setEmailErrorMessage("");
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setPasswordError(false);
      setPasswordErrorMessage("");
    };

    const onPasswordCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(event.target.value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage("");
    };

    const linkToLoginButtonClickHandler = () => {
      setView("login");
    };

    const registerResponse = (
      responseBody: RegisterResponse | Response | null
    ) => {
      if (!responseBody) {
        toast.error("Something went wrong.");
        return;
      }

      const { code } = responseBody;

      if (code === "DU") {
        setUserNameError(true);
        setUserNameErrorMessage("This username is already in used.");
      }
      if (code === "DE") {
        setEmailError(true);
        setEmailErrorMessage("This email is already in used.");
      }

      if (code === "VF") toast.error("You must enter everthing.");

      if (code === "DBE") toast.error("Database Error.");

      if (code !== "SU") return;

      setView("login");
    };

    const onRegisterButtonClickHandler = () => {
      const hasUserName = userName.trim().length > 0;
      if (!hasUserName) {
        setUserNameError(true);
        setUserNameErrorMessage("Check your name.");
        toast.error("Check your name again");
      }

      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);

      if (!isEmailPattern) {
        setEmailError(true);
        setEmailErrorMessage("Check your email address.");
        toast.error("Check your email again.");
      }

      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage("Password must be minimum 8 characters.");
        toast.error("Password must be minimum 8 characters.");
      }

      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage("Check your password.");
        toast.error("Check your password again.");
      }

      if (!agreedPersonal) setIsAgreedPersonalError(true);

      if (
        !hasUserName ||
        !isEmailPattern ||
        !isCheckedPassword ||
        !isEqualPassword ||
        !agreedPersonal
      )
        return;

      const requestBody: RegisterRequest = {
        userName,
        email,
        password,
        agreedPersonal,
      };

      registerRequest(requestBody).then(registerResponse);
    };

    return (
      <div className="rounded-lg pt-12 px-12 pb-8 bg-neutral-100 dark:bg-neutral-700">
        <div className="h-full space-y-3 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center justify-center">
              <p className="text-black dark:text-neutral-200 text-xl font-semibold leading-tight ">
                Register
              </p>
            </div>
            <Input
              label="Username *"
              placeholder="Username"
              error={userNameError}
              message={userNameErrorMesage}
              value={userName}
              onChange={onUserNameChange}
              onKeyDown={onUserNameKeyDownHandler}
              ref={userNameRef}
            />
            <Input
              label="Email Address *"
              placeholder="Email Address"
              error={emailError}
              message={emailErrorMesage}
              value={email}
              onChange={onEmailChange}
              onKeyDown={onEmailKeyDownHandler}
              ref={emailRef}
            />
            <Input
              label="Password *"
              type="password"
              placeholder="Password"
              error={passwordError}
              message={passwordErrorMessage}
              value={password}
              onChange={onPasswordChange}
              onKeyDown={onPasswordKeyDownHandler}
              ref={passwordRef}
            />
            <Input
              label="Password Check *"
              type="password"
              placeholder="Password Check"
              error={passwordCheckError}
              message={passwordCheckErrorMessage}
              value={passwordCheck}
              onChange={onPasswordCheckChange}
              onKeyDown={onPasswordCheckKeyDownHandler}
              ref={passwordCheckRef}
            />
          </div>
          <div className="flex flex-col space-y-6">
            {error && (
              <div className="-mb-1">
                <p className="text-red-500 text-xs font-normal leading-tight whitespace-pre-wrap">
                  Something went wrong.
                </p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div>
                <div className="cursor-pointer" onClick={handleChange}>
                  {!agreedPersonal ? (
                    <AiOutlineCheckCircle
                      size={20}
                      className="text-black dark:text-white"
                    />
                  ) : (
                    <AiFillCheckCircle
                      size={20}
                      className="text-black dark:text-white"
                    />
                  )}
                </div>
              </div>
              <div
                className={
                  isAgreedPersonalError
                    ? "font-extrabold text-red-500"
                    : "extrabold text-black dark:text-white"
                }
              >
                Terms of use
              </div>
            </div>
            <button
              className="w-full h-10 bg-black
              hover:opacity-70
              dark:bg-neutral-800 
              dark:hover:opacity-60 text-white text-lg font-medium leading-tight rounded-2xl 
              dark:hover:bg-opacity-60
            "
              onClick={onRegisterButtonClickHandler}
            >
              Register
            </button>
            <div className="auth-description-box flex justify-center ">
              <p className="auth-description text-black/70 dark:text-neutral-300 text-sm font-normal leading-tight">
                Already have an account?{" "}
                <span
                  className="auth-description-link cursor-pointer text-black 
                  dark:text-neutral-200
                  dark:hover:text-neutral-50 hover:text-black/60"
                  onClick={linkToLoginButtonClickHandler}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex justify-center lg:items-center bg-auth bg-cover">
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl md:text-4xl lg:text-5xl text-white dark:text-black">
          <GiFeather />
        </div>
        <p className="text-white dark:text-black text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-center">
          Welcome to Blogfy
        </p>
        <div className="w-full h-auto mt-8">
          {view === "login" && <LoginCard />}
          {view === "register" && <RegisterCard />}
        </div>
      </div>
    </div>
  );
}
