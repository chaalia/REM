import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OD8M6K1RjpevDg2q6WULErzcied6ONalFrSkMc1xlaLe7akbHZ9lz7K8VV5DQbG1rkQjJiZYjwHIrsrvFWn5SFZ00VzJXIyc1"
);

class App extends Component {
  handleSubscription = async () => {
    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  render() {
    return (
      <div>
        <h2>Subscription Page</h2>
        <button onClick={this.handleSubscription}>Subscribe</button>
      </div>
    );
  }
}

export default App;
