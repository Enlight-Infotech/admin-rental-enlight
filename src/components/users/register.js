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

          {/* FULL NAME + ROLE (same row on desktop) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",     // mobile stacked
                md: "1fr 1fr", // desktop row
              },
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              select
              label="Select Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              error={!!errors.role}
              helperText={errors.role}
            >
              <MenuItem value={"1"}>Super Admin</MenuItem>
              <MenuItem value={"2"}>Admin</MenuItem>
            </TextField>
          </Box>

          {/* EMAIL */}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* PASSWORD + CONFIRM PASSWORD (same row desktop) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Box>

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
