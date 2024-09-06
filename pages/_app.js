import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
   console.log("UseEffect is using")
   try{
   if(localStorage.getItem("cart")){
    setCart(JSON.parse(localStorage.getItem("cart")))
   }
   else{

   }
  }catch(error){
    console.error(error)
    localStorage.clear()
  }
  
  }, [])

 const saveCart = (myCart) =>{
  localStorage.setItem("cart", myCart)
  let subt = 0;
  let keys = Object.keys(cart)
  for(let i=0; keys.length;i++){
    subt += myCart[keys[i]].price * myCart[keys[i]].qty;
  }
  setSubtotal(subt)
 }

  const addToCart = (itemCode,  qty, price, name, size, variant) => {
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qyt + qty;

     }
    else{
      newCart[itemCode] = {qty: 1, price, name, size, variant}
    } 
    setCart(newCart);
    saveCart(newCart)
    
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) =>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode]["qty"]<=0){
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () =>{
    setCart({})
    saveCart({})
  }
  return (
  <>
  <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}/>
  <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />;
  <Footer/>
  </>
  )
}
