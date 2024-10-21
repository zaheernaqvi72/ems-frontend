import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { getEmployees } from "../services/employeeService";
import { useEffect } from "react";
import handleError from "../utils/handleError";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { createReview, updateReview, checkReviewExists } from "../services/reviewService";

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

  const showMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showMessage("error", "Please fill in all fields correctly!");
      return;
    }
    try {
      if (reqType === "create") {
        const reviewExists = await checkReviewExists(
          formData.employee_id,
          formData.review_date
        );
        if (reviewExists) {
          showMessage(
            "error",
            "Review for this employee on this date already exists!"
          );
          
        }

        await createReview(formData);
        fetchReviews();
        showMessage("success", "Review submitted successfully!");
      } else if (reqType === "edit") {
        await updateReview(editData.review_id, formData);
        fetchReviews();
        showMessage("success", "Review updated successfully!");
      }
      setFormData({
        employee_id: "",
        review_date: "",
        comments: "",
        rating: "",
      });
      setTimeout(closeModal, 3000);
    } catch (error) {
      showMessage("error", "Failed to submit review. Please try again.");
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

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">
        {reqType === "create" ? "Submit a Review" : "Edit Review"}
      </h2>
      {/* Display alerts for error or success */}
      {message.content && (
        <Stack sx={{ width: "100%", mt: 2, mb: 2 }} spacing={2}>
          <Alert variant="filled" severity={message.type}>
            {message.content}
          </Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          select
          label="Employee ID"
          name="employee_id"
          variant="outlined"
          value={formData.employee_id}
          onChange={handleChange}
          error={errors.employee_id} // Show error if field is invalid
          helperText={errors.employee_id ? "Employee ID is required!" : ""}
        >
          {/* Populate dropdown with employee IDs */}
          {employeeIds.length > 0 ? (
            employeeIds.map((id) => (
              <MenuItem key={id} value={id}>
                {id}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No employee id found</MenuItem>
          )}
        </TextField>
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
        <TextField
          fullWidth
          label="Rating (0-5)"
          name="rating"
          variant="outlined"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          inputProps={{ min: 0, max: 5 }}
          error={errors.rating} // Show error if field is invalid
          helperText={errors.rating ? "Rating is required!" : ""}
        />

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
