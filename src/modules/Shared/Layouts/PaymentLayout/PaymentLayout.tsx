import { Outlet } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');
const defaultOptions:StripeElementsOptions = {
   appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#0066cc",
      colorBackground: "#f6f9fc",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "4px",
    },
  },
  }


export default function PaymentLayout() {
  return <>
  <Elements stripe={stripePromise} options={defaultOptions} >
          <Outlet/>
        </Elements>
  </>
}
