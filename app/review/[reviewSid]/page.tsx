"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {ReviewResponseModel} from "../../services/reviewServices";

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ReviewDetails() {
  const { reviewSid } = useParams();
  const [review, setReview] = useState<ReviewResponseModel | null>(null);

  useEffect(() => {
    if (!reviewSid) return;
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:5156/api/Review/${reviewSid}`);
        const data: ReviewResponseModel = await response.json();
        setReview(data);
      } catch (error) {
        console.error("Error fetching review details:", error);
      }
    };
    fetchReview();
  }, [reviewSid]);

  if (!review) return <p className="text-center mt-4">Loading review...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Review Details</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">{review.reviewerName}</h5>
          <p className="card-text">⭐ {review.rating} / 5</p>
          <p className="card-text"><strong>Comment:</strong> {review.comment}</p>
          <p className="card-text"><strong>Reviewed on:</strong> {formatDate(review.reviewDate)}</p>
          <p className="card-text"><strong>Status:</strong> {review.status}</p>
          <p className="card-text text-muted">
            Created: {formatDate(review.createdAt)} <br />
            Last updated: {formatDate(review.lastModifiedAt)}
          </p>
          <a href="/getall-reviews" className="btn btn-dark">← Back</a>
        </div>
      </div>
    </div>
  );
}
