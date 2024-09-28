const crypto = require("crypto");
import Order from "../../modals/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  console.log("HEloo");
  if (req.method === "POST") {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      STATUS,
      ORDERID,
    } = req.body;

    const secret = process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = shasum.digest("hex");

    if (digest === razorpay_signature) {
      // Payment is verified
      if (STATUS === "TXN_SUCCESS") {
        try {
          // Updating the order status to "Paid"
          const updatedOrder = await Order.findOneAndUpdate(
            { orderId: ORDERID },
            { status: "Paid", paymentInfo: JSON.stringify(req.body) },
            { new: true } // This will return the updated order document
          );

          if (updatedOrder) {
            console.log("Order status updated to Paid:", updatedOrder);
            return res.redirect(200, "/order"); // Redirect to order page if payment is successful
          } else {
            console.log("Order not found or update failed");
            return res.status(404).json({ error: "Order not found" });
          }
        } catch (error) {
          console.error("Failed to update the order:", error.message);
          return res.status(500).json({
            error: "Failed to update the order",
            details: error.message,
          });
        }
      } else if (STATUS === "PENDING") {
        try {
          // Updating the order status to "Pending"
          const updatedOrder = await Order.findOneAndUpdate(
            { orderId: ORDERID },
            { status: "Pending", paymentInfo: JSON.stringify(req.body) },
            { new: true }
          );

          if (updatedOrder) {
            console.log("Order status updated to Pending:", updatedOrder);
            return res.redirect(200, "/order"); // Redirect if payment is pending
          } else {
            return res.status(404).json({ error: "Order not found" });
          }
        } catch (error) {
          console.error("Failed to update the order:", error.message);
          return res.status(500).json({
            error: "Failed to update the order",
            details: error.message,
          });
        }
      }
      res
        .status(200)
        .json({ status: "Payment verified, but no status update" });
    } else {
      // Payment verification failed
      return res.status(400).json({ status: "Payment verification failed" });
    }
  } else {
    // Handle incorrect HTTP methods
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default connectDb(handler);
