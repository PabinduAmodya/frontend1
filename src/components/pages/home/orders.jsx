import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full max-w-4xl border border-gray-300 shadow-lg rounded-lg overflow-hidden">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="p-4 text-left">Order ID</th>
      <th className="p-4 text-left">Status</th>
      <th className="p-4 text-left">Date</th>
      <th className="p-4 text-left">Total</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order, index) => (
      <tr
        key={order.orderId}
        className={`cursor-pointer transition-all duration-300 ${
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        } hover:bg-gray-200 hover:shadow-sm`}
        onClick={() => handleRowClick(order)}
      >
        <td className="p-4 border-b text-gray-900 font-medium">{order.orderId}</td>
        <td
          className={`p-4 border-b font-semibold ${
            order.status === "Pending" ? "text-gray-500" :
            order.status === "Completed" ? "text-gray-700" :
            "text-gray-900"
          }`}
        >
          {order.status}
        </td>
        <td className="p-4 border-b text-gray-700">
          {new Date(order.date).toLocaleDateString()}
        </td>
        <td className="p-4 border-b text-black font-bold">
          LKR {calculateTotal(order.orderedItems).toFixed(2)}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] p-6 rounded-lg shadow-lg overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <p>
              <span className="font-semibold">Order ID:</span> {selectedOrder.orderId}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {selectedOrder.status}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(selectedOrder.date).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Name:</span> {selectedOrder.name}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {selectedOrder.address}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {selectedOrder.phone}
            </p>
            <p>
              <span className="font-semibold">Notes:</span> {selectedOrder.notes || "None"}
            </p>
            <h3 className="text-md font-bold mt-4">Ordered Items:</h3>
            <div className="border-t border-gray-200 mt-2 pt-2">
              {selectedOrder.orderedItems.map((item, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <span className="font-semibold">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> LKR {item.price.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Quantity:</span> {item.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Subtotal:</span>{" "}
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mt-1 rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
