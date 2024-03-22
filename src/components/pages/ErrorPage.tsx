import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-white dark:bg-neutral-700">
      <h1 className="text-9xl font-extrabold text-neutral-500 dark:text-white tracking-widest">
        404
      </h1>
      <div className="bg-red-600 text-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <Link
          to="/"
          className="relative inline-block text-sm font-medium text-white group active:text-opacity-60 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-red-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 bg-neutral-500 border border-current">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
};

export default ErrorPage;
