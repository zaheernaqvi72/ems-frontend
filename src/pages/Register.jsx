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
import PasswordChecklist from "react-password-checklist";
import SnackbarComp from "../components/Snackbar";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate password constraints
  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const hasCapital = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 5;

    return {
      minLength: hasMinLength,
      specialChar: hasSpecialChar,
      number: hasNumber,
      capital: hasCapital,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", content: "" }); // Clear previous messages

    try {
      if (
        !validatePassword(formData.password).minLength ||
        !validatePassword(formData.password).specialChar ||
        !validatePassword(formData.password).number ||
        !validatePassword(formData.password).capital
      ) {
        setMessage({
          type: "error",
          content:
            "Password must contain at least 5 characters, a number, a special character, and a capital letter.",
        });
        setIsSubmitting(false);

        setTimeout(() => {
          setMessage({ type: "", content: "" });
          setFormData({ ...formData, password: "" });
        }, 2000);
        return;
      }

      await register(formData);
      setMessage({ type: "success", content: "Registration successful!" });

      setTimeout(() => {
        setMessage({ type: "", content: "" });
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Assuming `error.response.data.message` holds the message from API
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      if (errorMessage.includes("username already exists")) {
        setMessage({
          type: "error",
          content: "Username already exists. Please choose a different one.",
        });
      } else if (errorMessage.includes("email already exists")) {
        setMessage({
          type: "error",
          content: "Email already exists. Please use a different email.",
        });
      } else {
        setMessage({
          type: "error",
          content: `Registration failed! ${errorMessage}`,
        });
      }

      // Clear the error message after 2 seconds
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
    <div className="w-full flex justify-center items-center flex-row">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-gray-100 p-6 rounded-md shadow-md space-y-4"
      >
        {/* Display success/error message */}
        {message.content && <SnackbarComp message={message} />}
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
          required
        >
          <MenuItem value="Manager/Principal/Head">
            Manager/Principal/Head
          </MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </TextField>

        <div className="flex justify-between mb-4">
          
          <TextField
            name="first_name"
            label="First Name"
            variant="outlined"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="mb-4"
            style={{ width: "48%" }}
          />
          <TextField
            name="last_name"
            label="Last Name"
            variant="outlined"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="mb-4"
            style={{ width: "48%" }} 
          />
        </div>

        <div className="flex justify-between mb-4">
        <TextField
          
          name="username"
          label="Username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          required
          className="mb-4"
          style={{ width: "48%" }}
        />

        <TextField
      
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          required
          className="mb-4"
          style={{ width: "48%" }}
        />
        </div>

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

        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital"]}
          minLength={5}
          value={formData.password}
          onChange={(isValid) => {
            console.log("Password is valid:", isValid);
          }}
          style={{ fontSize: '12px' }}
        />

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
            !formData.first_name ||
            !formData.last_name ||
            !formData.username ||
            !formData.email ||
            !formData.password
          }
        >
          {isSubmitting ? "Registering..." : "Register"}
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
