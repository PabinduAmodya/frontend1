export default function ShippingPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Details</h2>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your name" required />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded-md" placeholder="Enter your phone number" required />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea className="w-full p-2 border rounded-md" placeholder="Enter your address" required />
            </div>
  
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md text-lg font-medium hover:bg-gray-700 transition">
              Save & Continue
            </button>
          </form>
        </div>
      </div>
    );
  }
  