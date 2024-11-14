import { useState } from "react";
import { TextField, Button, Autocomplete, Rating } from "@mui/material";
import PropTypes from "prop-types";
import { getEmployees } from "../services/employeeService";
import { useEffect } from "react";
import handleError from "../utils/handleError";
import {
  createReview,
  updateReview,
  checkReviewExists,
} from "../services/reviewService";
import SnackbarComp from "./Snackbar";

const ReviewForm = ({ fetchReviews, closeModal, reqType, editData }) => {
  const [employeeIds, setEmployeeIds] = useState([]);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [todayDate, setTodayDate] = useState("");
  const [errors, setErrors] = useState({
    employee_id: false,
    review_date: false,
    comments: false,
    rating: false,
  });
  const [formData, setFormData] = useState({
    employee_id: "",
    review_date: "",
    comments: "",
    rating: "",
  });
  const [rating, setRating] = useState(formData.rating || 0);

  // Prefill form data if in edit mode
  useEffect(() => {
    if (reqType === "edit" && editData) {
      setFormData({
        employee_id: editData.employee_id || "",
        review_date: editData.review_date || "",
        comments: editData.comments || "",
        rating: editData.rating || "",
      });
    }
  }, [reqType, editData]);

  // Fetch employee IDs when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getEmployees();
        const emp_ids = [];
        for (let i = 0; i < employeeData.length; i++) {
          emp_ids.push(employeeData[i].employee_id);
        }

        setEmployeeIds(emp_ids);
      } catch (error) {
        setMessage({
          type: "error",
          content: "Failed to fetch employee IDs. Please try again.",
        });
        handleError(error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    // Get the year, month, and day from the date object
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with leading zero

    // Format as YYYY-MM-DD
    const today = `${year}-${month}-${day}`;
    setTodayDate(today);
  }, []);

  const validateForm = () => {
    const newErrors = {
      employee_id: formData.employee_id === "",
      review_date:
        formData.review_date === "" ||
        new Date(formData.review_date) > new Date(todayDate),

      comments: formData.comments === "",
      rating: formData.rating === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).includes(true); // Return false if any error exists
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({
        type: "error",
        content: "Please fill in all fields correctly!",
      });
      return;
    }
    try {
      if (reqType === "create") {
        const reviewExists = await checkReviewExists(
          formData.employee_id,
          formData.review_date
        );
        if (reviewExists) {
          setMessage({
            type: "error",
            content: "Review for this employee on this date already exists!",
          });
        }

        await createReview(formData);
        setMessage({
          type: "success",
          content: "Review submitted successfully",
        });
        setFormData({
          employee_id: "",
          review_date: "",
          comments: "",
          rating: "",
        });
        
        fetchReviews();
        setTimeout(() => {
          closeModal();
          setMessage({ type: "", content: "" });
        }, 3000);
      } else if (reqType === "edit") {
        await updateReview(editData.review_id, formData);

        setMessage({ type: "success", content: "Review updated successfully" });
        setFormData({
          employee_id: "",
          review_date: "",
          comments: "",
          rating: "",
        });
        fetchReviews();
        setTimeout(() => {
          closeModal();
          setMessage({ type: "", content: "" });
        }, 3000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        content: error.response?.data?.message || "Failed to submit review",
      });
      formData.employee_id = "";
      formData.review_date = "";
      handleError(error);
    } finally {
      setErrors({
        employee_id: false,
        review_date: false,
        comments: false,
        rating: false,
      });
    }
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
    handleChange({ target: { name: "rating", value: newValue } }); // Update the form data
  };

  const getStarColor = (rating) => {
    if (rating === 0) return "red";
    if (rating <= 2) return "red";
    if (rating <= 4) return "gold";
    return "green";
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">
        {reqType === "create" ? "Submit a Review" : "Edit Review"}
      </h2>

      {/* Display success/error message */}
      {message.content && (
        <SnackbarComp
          position={{ vertical: "top", horizontal: "center" }}
          message={message}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Autocomplete
          options={employeeIds}
          getOptionLabel={(option) => option.toString()}
          value={formData.employee_id}
          onChange={(event, newValue) =>
            handleChange({ target: { name: "employee_id", value: newValue } })
          }
          isOptionEqualToValue={(option, value) =>
            option == value || value == null
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Employee ID"
              variant="outlined"
              error={errors.employee_id} // Show error if field is invalid
              helperText={errors.employee_id ? "Employee ID is required!" : ""}
            />
          )}
          sx={{ width: "100%" }}
          placeholder="Combo box"
        />
        <TextField
          fullWidth
          label="Review Date"
          name="review_date"
          type="date"
          variant="outlined"
          value={formData.review_date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={errors.review_date} // Show error if field is invalid
          helperText={
            errors.review_date ? "Please select today or a past date!" : ""
          }
          inputProps={{ max: todayDate }}
        />
        <TextField
          fullWidth
          label="Comments"
          name="comments"
          variant="outlined"
          value={formData.comments}
          onChange={handleChange}
          error={errors.comments} // Show error if field is invalid
          helperText={errors.comments ? "Comments are required!" : ""}
        />
        <div className="flex justify-center m-lg-auto">
          <Rating
            label="Rating"
            name="rating"
            value={rating}
            onChange={(event, newValue) =>
              handleRatingChange(newValue) && getStarColor(rating)
            }
            max={5}
            style={{ fontSize: "45px", color: getStarColor(rating) }}
          />
          {errors.rating && (
            <div style={{ color: "red", marginTop: "10px" }}>
              Rating is required!
            </div>
          )}
        </div>

        <Button
          variant="outlined"
          color="primary"
          type="submit"
          sx={{
            padding: "5px 20px",
            fontSize: "16px",
            borderRadius: "30px",
            marginRight: "10px",

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
        >
          {reqType === "create" ? "Submit Review" : "Update Review"}
        </Button>
        {reqType == "edit" ? (
          <Button
            variant="outlined"
            color="error"
            onClick={closeModal}
            sx={{
              padding: "5px 20px",
              fontSize: "16px",
              borderRadius: "30px",
              marginLeft: "10px",
              "&:hover": {
                borderColor: "error.main",
                backgroundColor: "transparent",
                color: "#f44336",
                transform: "scale(1.05)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            Cancel
          </Button>
        ) : null}
      </form>
    </>
  );
};

ReviewForm.propTypes = {
  fetchReviews: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  reqType: PropTypes.string.isRequired,
  editData: PropTypes.object,
};

export default ReviewForm;
