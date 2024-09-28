const Razorpay = require("razorpay");
import Order from "../../modals/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Destructure values from the request body
    const { email, orderId, address, subtotal, cart } = req.body;

    // Create and save the order in MongoDB
    let order = new Order({
      email: email,
      orderId: orderId,
      address: address,
      amount: subtotal,
      products: cart,
    });
    await order.save();

    // Initialize Razorpay instance with the correct keys
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET,
    });

    // Create the order on Razorpay
    const options = {
      amount: subtotal * 100, // Razorpay accepts amount in paise (₹1 = 100 paise)
      currency: "INR",
      receipt: orderId.toString(),
    };

    try {
      // Generate the Razorpay order
      const razorpayOrder = await razorpay.orders.create(options);

      // Send back the generated order to the frontend
      res.status(200).json(razorpayOrder);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle incorrect HTTP methods
    res.status(405).json({ error: "Method not allowed" });
  }
};

// Wrap the handler with the MongoDB connection middleware
export default connectDb(handler);
