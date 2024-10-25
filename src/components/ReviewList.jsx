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
  Typography,
  Paper,
  TablePagination,
  TableFooter,
  TableContainer,
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
import { getAllReviews, deleteReview } from "../services/reviewService";
import TablePaginationActions from "./Pagination";
import SnackbarComp from "./Snackbar";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [deleteReviewData, setDeleteReviewData] = useState(null);
  const [editData, setEditData] = useState({
    review_id: "",
    employee_id: "",
    review_date: "",
    comments: "",
    rating: "",
  });
  const [reqType, setReqType] = useState("");
  const [message, setMessage] = useState({ type: "", content: "" });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchReviews = async () => {
    try {
      const response = await getAllReviews();
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
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
        record.employee_id.toLowerCase().includes(searchQuery) ||
        record.review_date.includes(searchQuery) ||
        record.comments.toLowerCase().includes(searchQuery) ||
        record.rating.toString().includes(searchQuery)
    );
    setFilteredReviews(filteredData);
  }, [searchQuery, sortedReviews]);

  const handleEdit = (reviewId) => {
    const review = reviews.find((review) => review.review_id === reviewId);
    if (review) {
      setEditData(review);
      setReqType("edit");
      setFormModalOpen(true);
    } else {
      alert("Review not found!");
    }
  };

  const handleDeleteModalOpen = (reviewId) => {
    setDeleteReviewData(reviewId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteReview(deleteReviewData);
      setReviews((prev) =>
        prev.filter((review) => review.review_id !== deleteReviewData)
      );
      setDeleteModalOpen(false);
      setMessage({ type: "success", content: "Review deleted successfully" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    } catch (error) {
      setDeleteModalOpen(false);
      setMessage({
        type: "error",
        content: error.response?.data?.message || "Failed to delete review",
      });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
      throw error;
    }
  };

  const handleFormModal = () => {
    setReqType("create");
    setFormModalOpen(true);
  };

  const getStarColor = (rating) => {
    if (rating === 0) return "red";
    if (rating <= 2) return "red";
    if (rating <= 4) return "gold";
    return "green";
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredReviews.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="max-w-6xl m-auto p-4 bg-gray-100 shadow-md rounded-md">
      {/* Display success/error message */}
      {message.content && (
        <SnackbarComp
        message={message}
        position={{ vertical: "top", horizontal: "center" }}
        />
      )}
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
            {reqType === "create" ? (
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
            ) : null}
            <ReviewForm
              fetchReviews={fetchReviews}
              closeModal={() => setFormModalOpen(false)}
              editData={editData}
              reqType={reqType}
            />
          </div>
        </Box>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
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
          <Typography id="delete-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this review?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{
                padding: "5px 20px",
                fontSize: "16px",
                borderRadius: "30px",
                marginRight: "10px",
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
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              sx={{
                padding: "5px 20px",
                fontSize: "16px",
                borderRadius: "30px",
                marginLeft: "10px",
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
              onClick={() => setDeleteModalOpen(false)}
            >
              No, Cancel
            </Button>
          </Box>
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
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          backgroundColor: "rgb(243 244 246)",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
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
          {filteredReviews.length > 0 ? (
            <TableBody>
              {(rowsPerPage > 0
                ? filteredReviews.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredReviews).map((review) => (
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
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<Create />}
                          sx={{
                            padding: "5px 20px",
                            fontSize: "12px",
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
                          onClick={() => handleEdit(review.review_id)}
                        >
                          edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<HighlightOff />}
                          sx={{
                            padding: "5px 20px",
                            fontSize: "12px",
                            borderRadius: "30px",
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
                          onClick={() => {
                            handleDeleteModalOpen(review.review_id);
                          }}
                        >
                          delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  No review records found.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={filteredReviews.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReviewList;
