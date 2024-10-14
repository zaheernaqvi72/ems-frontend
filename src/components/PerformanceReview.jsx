// import  { useState } from 'react';
// import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
// import { createReview, getReviewsByEmployeeId } from '../services/reviewService';

// const PerformanceReview = () => {
//   const [formData, setFormData] = useState({
//     employee_id: '',
//     review_date: '',
//     comments: '',
//     rating: ''
//   });

//   const [reviews, setReviews] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createReview(formData);
//       alert('Review submitted successfully!');
//       fetchReviews();
//     } catch (error) {
//       alert('Error submitting review', error);
//     }
//   };

//   const fetchReviews = async () => {
//     const data = await getReviewsByEmployeeId(formData.employee_id);
//     setReviews(data);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Performance Review</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <TextField
//           fullWidth
//           label="Employee ID"
//           name="employee_id"
//           variant="outlined"
//           value={formData.employee_id}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           label="Review Date"
//           name="review_date"
//           type="date"
//           variant="outlined"
//           value={formData.review_date}
//           onChange={handleChange}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           fullWidth
//           label="Comments"
//           name="comments"
//           variant="outlined"
//           value={formData.comments}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           label="Rating"
//           name="rating"
//           variant="outlined"
//           value={formData.rating}
//           onChange={handleChange}
//         />
//         <Button variant="contained" color="primary" type="submit">
//           Submit
//         </Button>
//       </form>
//       <h2 className="text-xl font-semibold mt-6 mb-4">Review Records</h2>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Employee ID</TableCell>
//             <TableCell>Review Date</TableCell>
//             <TableCell>Comments</TableCell>
//             <TableCell>Rating</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {reviews.map((review) => (
//             <TableRow key={review.review_id}>
//               <TableCell>{review.employee_id}</TableCell>
//               <TableCell>{review.review_date}</TableCell>
//               <TableCell>{review.comments}</TableCell>
//               <TableCell>{review.rating}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default PerformanceReview;

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { createReview } from "../services/reviewService";

const PerformanceReview = () => {
  const [formData, setFormData] = useState({
    employee_id: "",
    review_date: "",
    comments: "",
    rating: "",
  });

  const [reviews, setReviews] = useState([]);
  const [setSelectedReview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(formData);
      alert("Review submitted successfully!");
      fetchReviews(); // fetch updated reviews
    } catch (error) {
      alert("Error submitting review", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    // Adding 5 dummy reviews here for testing purposes
    const dummyReviews = [
      {
        review_id: 1,
        employee_id: "E001",
        review_date: "2024-10-01",
        comments: "Excellent work!",
        rating: 5,
      },
      {
        review_id: 2,
        employee_id: "E002",
        review_date: "2024-10-02",
        comments: "Good performance.",
        rating: 4,
      },
      {
        review_id: 3,
        employee_id: "E003",
        review_date: "2024-10-03",
        comments: "Needs improvement in time management.",
        rating: 3,
      },
      {
        review_id: 4,
        employee_id: "E004",
        review_date: "2024-10-04",
        comments: "Satisfactory performance.",
        rating: 4,
      },
      {
        review_id: 5,
        employee_id: "E005",
        review_date: "2024-10-05",
        comments: "Outstanding work on the project!",
        rating: 5,
      },
    ];

    setReviews(dummyReviews);
  };

  const handleEdit = (review) => {
    setFormData({
      employee_id: review.employee_id,
      review_date: review.review_date,
      comments: review.comments,
      rating: review.rating,
    });
    setSelectedReview(review);
  };

  const handleDelete = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.review_id !== reviewId)
    );
    alert("Review deleted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-bold mb-4 text-center">
        Performance Review
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-md mb-6">
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
            label="Rating"
            name="rating"
            variant="outlined"
            value={formData.rating}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Reviews</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Review Date</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.review_id}>
              <TableCell>{review.employee_id}</TableCell>
              <TableCell>{review.review_date}</TableCell>
              <TableCell>{review.comments}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>
                {/* Separate buttons for Edit and Delete */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(review)}
                  style={{ marginRight: "8px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(review.review_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PerformanceReview;
