import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feePerConsultation: {
      type: Number,
      required: [true, "fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    // timings: {
    //   type: Object,
    //   required: [true, "work timing is required"],
    // },
    fromTime: {
      type: Object,
      required: [true, "work timing is required"],
    },
    toTime: {
      type: Object,
      required: [true, "work timing is required"],
    },
  },
  { timestamps: true }
);

export const doctorModel = mongoose.model("doctors", doctorSchema);

