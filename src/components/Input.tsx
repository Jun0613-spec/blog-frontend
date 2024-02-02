import React, { ChangeEvent, KeyboardEvent, forwardRef } from "react";

interface Props {
  label?: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  message?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    message,
    onKeyDown,
  } = props;

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-neutral-800 dark:text-neutral-50 text-sm font-normal leading-tight">
        {label}
      </div>
      <div
        className={
          error
            ? "bg-transparent flex items-center pl-0 pr-2 py-3 border-b-red-500 border-b border-solid"
            : "flex items-center pl-0 pr-4 py-3 border-b-neutral-400 border-b border-solid"
        }
      >
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDownHandler}
          className="flex-1 text-neutral-800 dark:text-white text-base font-normal leading-tight border-none outline-none bg-transparent"
        />
      </div>
      {message !== undefined && (
        <div className=" text-red-500 text-xs font-normal leading-tight">
          {message}
        </div>
      )}
    </div>
  );
});

export default Input;
