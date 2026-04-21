import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      trim: true,
      min: [0, "Subscription Price must be greater than 0"],
    },
    currency: {
      type: String,
      required: [true, "Subscription Currency is required"],
      trim: true,
      enum: ["USD", "EUR", "GBP", "PKR"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "other",
      ],
      required: [true, "Subscription Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription Start Date is required"],
      validate: {
        validator: (value) => value < new Date(),
        message: "Start Date must be less than current date",
      },
      trim: true,
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal Date must be greater than Start Date",
      },
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Auto Calculate Renewal Date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }

  // Auto Update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
