const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51OD8M6K1RjpevDg2WdFS71a2pFvY1xBStagqxtxGxO6C5DqzZrxb39gYSJoMuUZS1JDGJVzeuDhrprcKpPwzvFZU00aKHC34Ms";
const stripe = require("stripe")(stripeSecretKey);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1ODCg8K1RjpevDg2Aieut0qQ",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
