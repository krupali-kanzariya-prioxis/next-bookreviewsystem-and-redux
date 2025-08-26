"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  getReviews,
  deleteReview,
  ReviewResponseModel,
  ApiResponse,
  Filter,
} from "../services/reviewServices";

export default function GetAllReviews() {
  const [reviews, setReviews] = useState<ReviewResponseModel[]>([]);
  const [meta, setMeta] = useState<ApiResponse["meta"] | null>(null);
  const [loading, setLoading] = useState(false);

  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  const [filterKey, setFilterKey] = useState<string>("");
  const [filterCond, setFilterCond] = useState<string>("=");
  const [filterValue, setFilterValue] = useState<string>("");

  const filters: Filter[] | undefined = useMemo(() => {
    if (!filterKey || filterValue === "") return undefined;
    return [{ key: filterKey, value: filterValue, condition: filterCond }];
  }, [filterKey, filterCond, filterValue]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviews({
        page,
        pageSize,
        searchText,
        sortColumn,
        sortOrder,
        filters,
      });
      setReviews(data.result);
      setMeta(data.meta);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, pageSize, searchText, sortColumn, sortOrder, filters]);

  const handleDelete = async (reviewSid: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(reviewSid);
      setReviews((prev) => prev.filter((r) => r.reviewSID !== reviewSid));
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Reviews</h1>
        <Link href="/add-review" className="btn btn-dark btn-sm">
          Add Review
        </Link>
      </div>

      {/* Controls */}
      <div className="row g-2 mb-3">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Search text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={sortColumn}
            onChange={(e) => setSortColumn(e.target.value)}
          >
            <option value="">Sort column…</option>
            <option value="ReviewDate">ReviewDate</option>
            <option value="Rating">Rating</option>
            <option value="ReviewerName">ReviewerName</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "ASC" | "DESC")
            }
          >
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            min={1}
            placeholder="Page size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Math.max(1, Number(e.target.value) || 1));
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="row g-2 mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterKey}
            onChange={(e) => {
              setFilterKey(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Filter field…</option>
            <option value="Rating">Rating</option>
            <option value="ReviewerName">ReviewerName</option>
            <option value="Status">Status</option>
            <option value="BookId">BookId</option>
            <option value="ReviewDate">ReviewDate</option>
          </select>
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={filterCond}
            onChange={(e) => {
              setFilterCond(e.target.value);
              setPage(1);
            }}
          >
            <option value="=">=</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
            <option value="LIKE">LIKE</option>
          </select>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <input
              ref={filterKey === "ReviewDate" ? dateInputRef : null}
              className="form-control"
              placeholder={
                filterKey === "ReviewDate" ? "Select date" : "Filter value"
              }
              type={filterKey === "ReviewDate" ? "date" : "text"}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setPage(1);
              }}
            />
            {filterKey === "ReviewDate" && (
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => dateInputRef.current?.showPicker()}
              >
                📅
              </span>
            )}
          </div>
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setFilterKey("");
              setFilterValue("");
              setPage(1);
            }}
          >
            Clear filter
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.reviewSID} className="col-md-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{review.reviewerName}</h5>
                  <p className="card-text">⭐ {review.rating}</p>
                  <Link
                    href={`/review/${review.reviewSID}`}
                    className="btn btn-dark btn-sm me-2"
                  >
                    View More
                  </Link>
                  <Link
                    href={`/add-review/${review.reviewSID}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(review.reviewSID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.total_page_num > 0 ? (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
          >
            Previous
          </button>

          <span className="mx-3">
            Page {page} of {meta.total_page_num}
          </span>

          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => setPage((p) => Math.min(p + 1, meta.total_page_num))}
            disabled={page >= meta.total_page_num}
          >
            Next
          </button>
        </div>
      ) : (
        <p className="text-center mt-4">No reviews found.</p>
      )}
    </div>
  );
}