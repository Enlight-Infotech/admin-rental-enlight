import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // -------------------------
  // VALIDATION FUNCTION
  // -------------------------
  const validate = () => {
    const newErrors = {};

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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -------------------------
  // HANDLE LOGIN
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5500/api/auth/login", {
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      setApiError("Invalid email or password");
    }
  };

  return (
    <div style={{marginTop: '20px'}}>
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
          {/* Logo */}
          <img src="/en-logo.webp" alt="logo" style={{ height: 70 }} />

          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            Admin Login
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
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, padding: "10px", fontSize: "16px" }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
}
