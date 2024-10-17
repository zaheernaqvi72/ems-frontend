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
  const [sortedReviews, setSortedReviews] = useState([]);

  const dummyReviews = [
    {
      review_id: 1,
      employee_id: "1001",
      review_date: "2015-05-12",
      comments: "Excellent work!",
      rating: 4,
    },
    {
      review_id: 2,
      employee_id: "2002",
      review_date: "2016-07-22",
      comments: "Good performance.",
      rating: 3,
    },
    {
      review_id: 3,
      employee_id: "1003",
      review_date: "2017-09-18",
      comments: "Needs improvement in deadlines.",
      rating: 2,
    },
    {
      review_id: 4,
      employee_id: "2004",
      review_date: "2018-02-15",
      comments: "Great collaboration with the team.",
      rating: 5,
    },
    {
      review_id: 5,
      employee_id: "1005",
      review_date: "2019-10-30",
      comments: "Satisfactory performance.",
      rating: 3,
    },
    {
      review_id: 6,
      employee_id: "2006",
      review_date: "2020-03-11",
      comments: "Outstanding in problem-solving.",
      rating: 5,
    },
    {
      review_id: 7,
      employee_id: "1007",
      review_date: "2021-08-29",
      comments: "Could improve communication.",
      rating: 3,
    },
    {
      review_id: 8,
      employee_id: "2008",
      review_date: "2015-12-21",
      comments: "Consistently meets deadlines.",
      rating: 4,
    },
    {
      review_id: 9,
      employee_id: "1009",
      review_date: "2016-06-03",
      comments: "Not meeting expectations.",
      rating: 2,
    },
    {
      review_id: 10,
      employee_id: "2010",
      review_date: "2022-01-15",
      comments: "Excellent leadership skills.",
      rating: 5,
    },
    {
      review_id: 11,
      employee_id: "1011",
      review_date: "2023-09-23",
      comments: "Good but needs to be more proactive.",
      rating: 4,
    },
    {
      review_id: 12,
      employee_id: "2012",
      review_date: "2017-04-09",
      comments: "Poor performance under pressure.",
      rating: 1,
    },
    {
      review_id: 13,
      employee_id: "1013",
      review_date: "2018-11-19",
      comments: "Great teamwork and initiative.",
      rating: 5,
    },
    {
      review_id: 14,
      employee_id: "2014",
      review_date: "2019-05-27",
      comments: "Needs better time management.",
      rating: 3,
    },
    {
      review_id: 15,
      employee_id: "1015",
      review_date: "2020-12-05",
      comments: "Consistently produces high-quality work.",
      rating: 5,
    },
    {
      review_id: 16,
      employee_id: "2016",
      review_date: "2021-03-22",
      comments: "Improved performance over time.",
      rating: 4,
    },
    {
      review_id: 17,
      employee_id: "1017",
      review_date: "2022-07-18",
      comments: "Struggles with deadlines.",
      rating: 2,
    },
    {
      review_id: 18,
      employee_id: "2018",
      review_date: "2015-11-13",
      comments: "Effective problem solver.",
      rating: 4,
    },
    {
      review_id: 19,
      employee_id: "1019",
      review_date: "2016-02-09",
      comments: "Great innovation and creativity.",
      rating: 5,
    },
    {
      review_id: 20,
      employee_id: "2020",
      review_date: "2017-06-21",
      comments: "Inconsistent performance.",
      rating: 2,
    },
    {
      review_id: 21,
      employee_id: "1002",
      review_date: "2018-08-10",
      comments: "Good team player.",
      rating: 4,
    },
    {
      review_id: 22,
      employee_id: "1012",
      review_date: "2019-03-14",
      comments: "Shows initiative.",
      rating: 5,
    },
    {
      review_id: 23,
      employee_id: "2003",
      review_date: "2020-09-16",
      comments: "Struggles with new tasks.",
      rating: 2,
    },
    {
      review_id: 24,
      employee_id: "1014",
      review_date: "2021-05-02",
      comments: "Good technical skills.",
      rating: 4,
    },
    {
      review_id: 25,
      employee_id: "2005",
      review_date: "2022-11-26",
      comments: "Strong in leadership.",
      rating: 5,
    },
    {
      review_id: 26,
      employee_id: "1016",
      review_date: "2023-04-30",
      comments: "Needs to work on punctuality.",
      rating: 3,
    },
    {
      review_id: 27,
      employee_id: "2007",
      review_date: "2016-09-08",
      comments: "A good mentor for the team.",
      rating: 4,
    },
    {
      review_id: 28,
      employee_id: "1018",
      review_date: "2017-11-12",
      comments: "Satisfactory, but can improve.",
      rating: 3,
    },
    {
      review_id: 29,
      employee_id: "2009",
      review_date: "2018-10-01",
      comments: "Needs to improve attention to detail.",
      rating: 2,
    },
    {
      review_id: 30,
      employee_id: "1020",
      review_date: "2020-02-19",
      comments: "Exceptional work ethic.",
      rating: 5,
    },
  ];

  const fetchReviews = async () => {
    setReviews(dummyReviews);
  };

  useEffect(() => {
    fetchReviews();
    const sorted = [...reviews].sort(
      (a, b) => new Date(b.review_date) - new Date(a.review_date)
    );
    setSortedReviews(sorted);
  }, [reviews]);

  useEffect(() => {
    const filteredData = sortedReviews.filter(
      (record) =>
        record.employee_id.toString().includes(searchQuery) ||
        record.review_date.includes(searchQuery) ||
        record.comments.toLowerCase().includes(searchQuery) ||
        record.rating.toString().includes(searchQuery)
    );
    setFilteredReviews(filteredData);
  }, [searchQuery, sortedReviews]);

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

  const handleFormModal = () => {
    setFormModalOpen(true);
  };

  const getStarColor = (rating) => {
    if (rating === 0) return "red";
    if (rating <= 2) return "red";
    if (rating <= 4) return "gold";
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
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
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
            <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
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
