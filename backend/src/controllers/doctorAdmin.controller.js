import generateToken from "../utils/generateToken.js";
import Doctor from "../models/Doctor.model.js";
import Admin from "../models/Admin.modal.js";


// ======================
// 🔹 LOGIN DOCTOR
// ======================
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findByEmail(email);
    if (!doctor || !(await doctor.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid doctor credentials" });
    }
    const token = generateToken(doctor);

    res.status(200).json({
      token,
      user: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: "doctor",
        department: doctor.department,
        specialization: doctor.specialization,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ======================
// 🔹 LOGIN ADMIN
// ======================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    let admin = await Admin.findByEmail(normalizedEmail);
    let adminData;

    if (admin) {
      if (!(await admin.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid admin credentials" });
      }
      admin.lastLogin = new Date();
      await admin.save();
      adminData = admin;
    } else if (
      normalizedEmail === process.env.ADMIN_EMAIL?.trim().toLowerCase() &&
      password === process.env.ADMIN_PASSWORD
    ) {
      adminData = {
        email: normalizedEmail,
        role: "admin",
        name: process.env.ADMIN_NAME || "Hospital Administrator",
        isSuperAdmin: true,
      };
    } else {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = generateToken(adminData);

    res.status(200).json({
      token,
      user: {
        id: adminData._id || null,
        name: adminData.name,
        email: adminData.email,
        role: "admin",
        isSuperAdmin: adminData.isSuperAdmin ?? true,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      department,
      specialization,
      licenseNumber,
    } = req.body;

    if (!name || !email || !password || !department || !specialization || !licenseNumber) {
      return res.status(400).json({
        message: "Name, email, password, department, specialization, and license number are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (await Doctor.findByEmail(normalizedEmail)) {
      return res.status(409).json({ message: "A doctor with this email already exists" });
    }

    const doctor = await Doctor.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone?.trim() || "",
      department: department.trim(),
      specialization: specialization.trim(),
      licenseNumber: licenseNumber.trim(),
    });
    const token = generateToken(doctor);

    return res.status(201).json({
      token,
      user: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        role: "doctor",
        department: doctor.department,
        specialization: doctor.specialization,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerAdmin = async (_req, res) => {
  return res.status(403).json({
    message: "Hospital administrator accounts are provisioned by the hospital",
  });
};