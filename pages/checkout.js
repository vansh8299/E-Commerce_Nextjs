import Link from "next/link";
import React, { useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, subtotal, removeFromCart, addToCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
    }
    setTimeout(() => {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 3 &&
        address.length > 3 &&
        pincode.length > 3
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };

  // Razorpay Payment Logic
  const initiatePayment = async () => {
    const orderId = Math.floor(Math.random() * Date.now());
    const paymentData = {
      cart,
      subtotal,
      orderId,
      email: email,
      name,
      address,
      pincode,
      phone,
    };

    // Requesting backend to create an order
    const res = await fetch("/api/razorpayorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const { id: razorpayOrderId, currency, amount } = await res.json();

    // Razorpay options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "TrendingCloths",
      description: "Test Transaction",
      order_id: razorpayOrderId,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        const res = await fetch("/api/razorpaysuccess", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderId: razorpayOrderId, // Ensure orderId is sent
          }),
        });
        const result = await res.json();
        console.log(result);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container px-2 sm:m-auto">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="font-bold text-3xl my-8 text-center">Checkout</div>
      <div className="font-semibold text-xl">1. Delivery Details</div>

      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Address Field */}
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            name="address"
            id="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>

      {/* Phone and City Fields */}
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              onChange={handleChange}
              value={phone}
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">
              PinCode
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* State and PinCode Fields */}
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="font-semibold text-xl">2. Review Cart</div>
      <div className="siideCart bg-purple-100 p-6 m-2 mx-5">
        <ol className="list-decimal font-semibold ml-4">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 -mx-4 font-semibold">Your cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <FaCircleMinus
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-purple-500"
                    />{" "}
                    <span className="mx-2 text-sm">{cart[k].qty}</span>{" "}
                    <FaCirclePlus
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-purple-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total">Subtotal = ₹{subtotal}</span>
      </div>

      <div className="mx-0">
        <button
          disabled={disabled}
          onClick={initiatePayment}
          className="disabled:bg-purple-300 flex ml-5 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm"
        >
          <IoBagCheckSharp className="m-1" />
          Pay Now ₹{subtotal}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
