import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className=" h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-semibold text-2xl">Something went wrong!</h1>
      <button
        className="underline text-blue-500"
        onClick={() => handleNavigate()}
      >
        homePage
      </button>
    </div>
  );
};

export default ErrorPage;
