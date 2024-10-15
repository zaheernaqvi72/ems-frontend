import { useState } from "react";
import { register } from "../services/authService";
import { TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { PersonAdd } from "@mui/icons-material";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Register <PersonAdd className="mr-2 text-green-500" />
        </h2>
        <div className="flex items-center mb-4">
          <TextField
            fullWidth
            name="first_name"
            label="First Name"
            variant="outlined"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <TextField
          fullWidth
          name="last_name"
          label="Last Name"
          variant="outlined"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="username"
          label="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4"
        >
          Register
        </Button>
        <h4 className="text-lg font-semibold">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-3">
            Please login
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default Register;
