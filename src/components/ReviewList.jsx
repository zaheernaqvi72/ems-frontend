import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  HighlightOff,
  Create,
  Star,
  Search,
  Add,
  Close,
} from "@mui/icons-material";
import ReviewForm from "./ReviewForm";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const fetchReviews = async () => {
    // Adding 5 dummy reviews here for testing purposes
    const dummyReviews = [
      {
        review_id: 1,
        employee_id: "1001",
        review_date: "2024-10-01",
        comments: "Very Poor!",
        rating: 0,
      },
      {
        review_id: 2,
        employee_id: "2002",
        review_date: "2024-10-02",
        comments: "Very Poor",
        rating: 0,
      },
      {
        review_id: 3,
        employee_id: "1003",
        review_date: "2024-10-03",
        comments: "Needs improvement in deadlines.",
        rating: 3,
      },
      {
        review_id: 4,
        employee_id: "2004",
        review_date: "2024-10-04",
        comments: "Great collaboration with the team.",
        rating: 5,
      },
      {
        review_id: 5,
        employee_id: "1005",
        review_date: "2024-10-05",
        comments: "Satisfactory performance.",
        rating: 3,
      },
      {
        review_id: 6,
        employee_id: "2006",
        review_date: "2024-10-06",
        comments: "Outstanding in problem-solving.",
        rating: 5,
      },
      {
        review_id: 7,
        employee_id: "1007",
        review_date: "2024-10-07",
        comments: "Could improve communication.",
        rating: 3,
      },
      {
        review_id: 8,
        employee_id: "2008",
        review_date: "2024-10-08",
        comments: "Consistently meets deadlines.",
        rating: 4,
      },
      {
        review_id: 9,
        employee_id: "1009",
        review_date: "2024-10-09",
        comments: "Not meeting expectations.",
        rating: 2,
      },
      {
        review_id: 10,
        employee_id: "2010",
        review_date: "2024-10-10",
        comments: "Excellent leadership skills.",
        rating: 5,
      },
      {
        review_id: 11,
        employee_id: "1011",
        review_date: "2024-10-11",
        comments: "Good but needs to be more proactive.",
        rating: 4,
      },
      {
        review_id: 12,
        employee_id: "2012",
        review_date: "2024-10-12",
        comments: "Poor performance under pressure.",
        rating: 2,
      },
      {
        review_id: 13,
        employee_id: "1013",
        review_date: "2024-10-13",
        comments: "Great teamwork and initiative.",
        rating: 5,
      },
      {
        review_id: 14,
        employee_id: "2014",
        review_date: "2024-10-14",
        comments: "Needs better time management.",
        rating: 3,
      },
      {
        review_id: 15,
        employee_id: "1015",
        review_date: "2024-10-15",
        comments: "Consistently produces high-quality work.",
        rating: 5,
      },
      {
        review_id: 16,
        employee_id: "2016",
        review_date: "2024-10-16",
        comments: "Improved performance over time.",
        rating: 4,
      },
      {
        review_id: 17,
        employee_id: "1017",
        review_date: "2024-10-17",
        comments: "Struggles with deadlines.",
        rating: 2,
      },
      {
        review_id: 18,
        employee_id: "2018",
        review_date: "2024-10-18",
        comments: "Effective problem solver.",
        rating: 4,
      },
      {
        review_id: 19,
        employee_id: "1019",
        review_date: "2024-10-19",
        comments: "Great innovation and creativity.",
        rating: 5,
      },
      {
        review_id: 20,
        employee_id: "2020",
        review_date: "2024-10-20",
        comments: "Inconsistent performance.",
        rating: 3,
      },
    ];

    setReviews(dummyReviews);
    setFilteredReviews(dummyReviews);
  };

  const handleEdit = (review) => {
    alert(`Edit review with ID: ${review.review_id}`);
    // Add functionality to edit the review here (optional)
  };

  const handleDelete = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.review_id !== reviewId)
    );
    alert("Review deleted successfully!");
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = reviews.filter(
      (record) =>
        record.employee_id.toString().includes(query) ||
        record.review_date.includes(query) ||
        record.comments.toLowerCase().includes(query) ||
        record.rating.toString().includes(query)
    );
    setFilteredReviews(filteredData);
  };
  const handleFormModal = () => {
    setFormModalOpen(true);
  };
  const getStarColor = (rating) => {
    if (rating <= 2) return "red";
    if (rating <= 4) return "#fbc740";
    if (rating == 0) return "red";
    return "green";
  };
  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-3xl font-bold m-3 text-center">Reviews</h2>
      <Modal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-description"
      >
        <Box
          className="modal-box"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgb(243 244 246)",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <div>
            <div className="absolute right-5 top-3">
              <Button
                variant="outlined"
                color="error"
                onClick={() => setFormModalOpen(false)}
                className="rounded-full"
                sx={{
                  minWidth: 0,
                  padding: "4px",
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Close />
              </Button>
            </div>
            <ReviewForm fetchReviews={fetchReviews} />
          </div>
        </Box>
      </Modal>
      <hr />
      <div className="flex justify-between items-center m-3">
        <TextField
          variant="outlined"
          color="primary"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by employee-id, review date, comments, or rating"
          sx={{
            width: "70%",
            padding: "12px 0px",
            fontSize: "16px",
            borderRadius: "20px",
            "& input": {
              transition: "all 0.3s ease",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "50px",
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-500" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleFormModal}
          startIcon={<Add />}
          sx={{
            padding: "10px 20px",
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
        >
          Add Review
        </Button>
      </div>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID No</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Review Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Comments</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredReviews.map((review) => (
            <TableRow key={review.review_id}>
              <TableCell sx={{ fontWeight: "bold" }}>
                {review.employee_id}
              </TableCell>
              <TableCell>{review.review_date}</TableCell>
              <TableCell>{review.comments}</TableCell>
              <TableCell>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    style={{
                      color:
                        review.rating === 0 || i < review.rating
                          ? getStarColor(review.rating)
                          : "gray",
                    }}
                  />
                ))}
              </TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleEdit(review)}>
                  <Create />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDelete(review.review_id)}
                >
                  <HighlightOff />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewList;
