import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mt-4">Oops! Product Not Found</h1>

      {/* Message */}
      <p className="text-gray-600 mt-2 text-lg">
        The product you're looking for doesn't exist or has been removed.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
}
