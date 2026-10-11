import Patient from "../models/Patient.model.js";
import generateToken from "../utils/generateToken.js";


// 🔹 REGISTER PATIENT
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password, phone, age, dateOfBirth, state, city } = req.body;

    if (!name || !email || !password || !phone || age === undefined || !dateOfBirth || !state || !city) {
      return res.status(400).json({
        message: "Name, email, password, phone, age, date of birth, state, and city are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingPatient = await Patient.findByEmail(normalizedEmail);

    if (existingPatient) {
      return res.status(409).json({
        message: "Patient already exists",
      });
    }

    // Password hashing handled in schema pre("save")
    const patient = await Patient.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone.trim(),
      age: Number(age),
      dateOfBirth,
      state: state.trim(),
      city: city.trim(),
    });

    const token = generateToken(patient);

    res.status(201).json({
      token,
      user: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        role: "patient",
        phone: patient.phone,
        age: patient.age,
        dateOfBirth: patient.dateOfBirth,
        state: patient.state,
        city: patient.city,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔹 LOGIN PATIENT
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findByEmail(email);

    if (!patient) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await patient.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(patient);

    res.status(200).json({
      token,
      user: {
        id: patient._id,
        email: patient.email,
        role: "patient",
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};