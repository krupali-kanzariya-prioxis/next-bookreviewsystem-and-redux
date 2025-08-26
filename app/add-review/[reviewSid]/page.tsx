"use client";

import { useParams } from "next/navigation";
import ReviewForm from "../../components/ReviewForm";

export default function UpdateReviewPage() {
  const { reviewSid } = useParams<{ reviewSid: string }>();
  return <ReviewForm reviewSid={reviewSid} />;
}
