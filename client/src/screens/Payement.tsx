

interface IPayementProps {
}


interface ElementOption {
    clientSecret:any,
    appearance:any, 
}

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// import CheckoutForm from "./CheckoutForm";
import CheckoutForm from "../components/CheckoutFormStripe/CheckoutForm";
import newRequest from "../utils/newRequest";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NTLUhDeujXI8Gmvc0gKpda9yvR8IexJtLgASdqzusmnZ55cIgf5dyXBczt9SUEgsxqsEZapszM4mR4kotAJZn4700ZbRCBYHR");

const Payement: React.FunctionComponent<IPayementProps> = (props) => {
  const [clientSecret, setClientSecret] = useState("");
  const {user} = useSelector((state:any) => state.register);

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     fetch("/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
          };
        const res = await newRequest.post(
          `/order/create-payment-intent/${'64a1740ddd21582f0ba82501'}`
        ,{},config);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);


  const appearance = {
    theme: 'stripe',
  };
  const options:ElementOption = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}


export default Payement;
