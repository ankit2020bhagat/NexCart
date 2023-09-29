import mongoose from "mongoose";

const orderItem = new mongoose.Schema(
  {
    orderItem: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        requried: true,
      },
      country: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      update_time: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverable: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Oder", orderItem);
export default Order;
