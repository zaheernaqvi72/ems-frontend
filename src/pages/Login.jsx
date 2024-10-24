import { useState } from "react";
import { login } from "../services/authService";
import {
  TextField,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import SnackbarComp from "../components/Snackbar";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    user_type: "",
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
    setIsSubmitting(true);
    setMessage({ type: "", content: "" }); // Clear previous message before submitting

    try {
      const token = await login(formData);
      localStorage.setItem("token", token);
      setMessage({ type: "success", content: "Login successful!" });
      setFormData({ user_type: "", username: "", email: "", password: "" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      setMessage({
        type: "error",
        content: "Login failed! Check your credentials or user type.",
      });
      setFormData({ ...formData, password: "" });
      // Optionally clear the message after a certain time
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 2000);
    } finally {
      setIsSubmitting(false);
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
        {/* Display success/error message */}
      {message.content && (
        <SnackbarComp
        message={message}
        />
      )}
        <h2 className="text-2xl font-bold text-center mb-4">
          Login <AccountCircle className="mr-2 text-blue-500" />
        </h2>
        <TextField
          fullWidth
          select
          label="User Type"
          name="user_type"
          variant="outlined"
          value={formData.user_type}
          onChange={handleChange}
          required
        >
          <MenuItem value="Manager/Principal/Head">
            Manager/Principal/Head
          </MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </TextField>
        <TextField
          fullWidth
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          required
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
            required
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
          variant="outlined"
          color="primary"
          type="submit"
          sx={{
            padding: "5px 20px",
            fontSize: "16px",
            borderRadius: "30px",
            "&:hover": {
              borderColor: "success.main",
              backgroundColor: "transparent",
              color: "#3f51b5",
              transform: "scale(1.05)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
          disabled={
            isSubmitting ||
            !formData.user_type ||
            !formData.username ||
            !formData.email ||
            !formData.password
          }
        >
          {isSubmitting ? "Logging..." : "Login"}
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
