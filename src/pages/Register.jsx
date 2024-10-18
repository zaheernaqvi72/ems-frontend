import { useState } from "react";
import { register } from "../services/authService";
import {
  TextField,
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [formData, setFormData] = useState({
    user_type: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
      console.error("Registration failed:", error);
      alert("Registration failed! Please try again.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-100 p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Register <PersonAdd className="mr-2 text-green-500" />
        </h2>
        <TextField
          fullWidth
          select
          label="User Type"
          name="user_type"
          variant="outlined"
          value={formData.user_type}
          onChange={handleChange}
        >
          <MenuItem value="Manager/Principal/Head">Manager/Principal/Head</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </TextField>
        <TextField
          fullWidth
          name="first_name"
          label="First Name"
          variant="outlined"
          value={formData.first_name}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          fullWidth
          name="last_name"
          label="Last Name"
          variant="outlined"
          value={formData.last_name}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          fullWidth
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          className="mb-4"
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className="mt-4"
        >
          Register
        </Button>
        <h4 className="text-lg font-semibold text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-2">
            Please login
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default Register;
