import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },

    phone: { type: String, required: [true, "Phone number is required"], trim: true },
    age: { type: Number, required: [true, "Age is required"], min: 0, max: 120 },
    dateOfBirth: { type: Date, required: [true, "Date of birth is required"] },
    state: { type: String, required: [true, "State is required"], trim: true },
    city: { type: String, required: [true, "City is required"], trim: true },

    role: {
      type: String,
      enum: ["patient"],
      default: "patient",
      immutable: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Password Hashing Pre-Save Middleware
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Instance Method: Compare Password
patientSchema.methods.comparePassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static Method: Find Normalized Email
patientSchema.statics.findByEmail = function (email) {
  if (!email) return null;
  return this.findOne({ email: email.toLowerCase().trim() });
};

// Prevent Mongoose OverwriteModelError in Hot-Reload Environments
const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;