import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROLES from '../enums/roles'

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(1);

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // -------------------------
  // VALIDATION FUNCTION
  // -------------------------
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------
  // HANDLE REGISTER
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5500/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      if (res.data?.message === "User registered successfully") {
        navigate("/");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{ padding: 4, width: 400, borderRadius: 3, textAlign: "center" }}
      >
        <img src="/en-logo.webp" alt="logo" style={{ height: 70 }} />

        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          Register New Admin
        </Typography>

        {/* API Error */}
        {apiError && (
          <Typography color="error" sx={{ mt: 1, mb: 1 }}>
            {apiError}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2 }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mt: 2 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          {/* ROLE DROPDOWN */}
          <TextField
            select
            fullWidth
            label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ mt: 2 }}
            error={!!errors.role}
            helperText={errors.role}
          >
            <MenuItem value={'1'}>Super Admin</MenuItem>
            <MenuItem value={'2'}>Admin</MenuItem>
          </TextField>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, padding: "10px", fontSize: "16px" }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
