"use client";

import { useEffect, useState } from "react";
import { getReviewById, addOrUpdateReview } from "../services/reviewServices";

interface ReviewFormProps {
  reviewSid?: string;
}

export default function ReviewForm({ reviewSid }: ReviewFormProps) {
  const [bookId, setBookId] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (reviewSid) {
    getReviewById(reviewSid).then((review) => {
      if (review) {  // ✅ check for null before using
        setBookId(review.bookId.toString());
        setReviewerName(review.reviewerName);
        setRating(review.rating);
        setComment(review.comment);
      }
    });
  }
}, [reviewSid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      bookId: Number(bookId),
      reviewerName,
      rating,
      comment,
    };

    try {
      await addOrUpdateReview(payload, reviewSid);
      alert(reviewSid ? "Review updated!" : "Review added!");
      window.location.href = "/getall-reviews";
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4" style={{ width: "600px", borderRadius: "12px" }}>
        <h2 className="mb-4 text-center">{reviewSid ? "Update Review" : "Add Review"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Book ID</label>
            <input
              type="text"
              className="form-control"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reviewer Name</label>
            <input
              type="text"
              className="form-control"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rating (1–5)</label>
            <input
              type="number"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Comment</label>
            <textarea
              className="form-control"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark px-4" disabled={loading}>
              {loading ? "Saving..." : reviewSid ? "Update Review" : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
