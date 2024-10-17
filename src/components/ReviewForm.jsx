import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { createReview } from "../services/reviewService";

const ReviewForm = ({ fetchReviews }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    review_date: "",
    comments: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(formData);
      alert("Review submitted successfully!");
      fetchReviews(); // fetch updated reviews
      setFormData({
        employee_id: "",
        review_date: "",
        comments: "",
        rating: "",
      }); // Reset form
    } catch (error) {
      alert("Error submitting review", error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-center">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Employee ID"
          name="employee_id"
          variant="outlined"
          value={formData.employee_id}
          onChange={handleChange}
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
        />
        <TextField
          fullWidth
          label="Comments"
          name="comments"
          variant="outlined"
          value={formData.comments}
          onChange={handleChange}
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
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default ReviewForm;
