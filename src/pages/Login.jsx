import { useState } from "react";
import { login } from "../services/authService";
import { TextField, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({

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
      const token = await login(formData);
      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Login failed", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Login <AccountCircle className="mr-2 text-blue-500" />
        </h2>

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

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
          Login
        </Button>
        <h4 className="text-lg font-semibold">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-500 hover:underline ml-3">
            Please register
          </Link>
        </h4>
      </form>
    </div>
  );
};

export default Login;
