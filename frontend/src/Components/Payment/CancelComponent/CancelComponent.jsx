import { useNavigate } from "react-router-dom";

const CancelComponent = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <h1 className="text-2xl font-semibold mb-3">Cancel!</h1>
      <button
        onClick={() => handleNavigate()}
        className="text-blue-500 underline"
      >
        Go back to home page{">>>"}
      </button>
    </div>
  );
};
export default CancelComponent;
