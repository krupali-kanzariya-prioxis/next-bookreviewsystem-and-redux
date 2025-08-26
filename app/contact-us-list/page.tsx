"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, deleteSubmission, updateSubmission, loadFromLocalStorage } from "../store";
import { AppDispatch } from "../store";

export default function ContactUsListPage() {
  const submissions = useSelector((state: RootState) => state.contact.submissions);
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
    setIsMounted(true);
  }, [dispatch]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ userName: "", email: "", comment: "" });

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setFormData(submissions[index]);
    const modal = document.getElementById("editModal");
    if (modal) {
      (window as any).bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (editIndex !== null) {
      dispatch(updateSubmission({ index: editIndex, updatedData: formData }));
      const modal = document.getElementById("editModal");
      if (modal) {
        (window as any).bootstrap.Modal.getOrCreateInstance(modal).hide();
      }
    }
  };

  if (!isMounted) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6">
          {submissions.length > 0 && (
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <h4 className="mb-3">All Submissions</h4>
                <ul className="list-group">
                  {submissions.map((entry, index) => (
                    <li key={index} className="list-group-item">
                      <strong>User Name:</strong> {entry.userName}
                      <br />
                      <strong>Email:</strong> {entry.email}
                      <br />
                      <strong>Comment:</strong> {entry.comment}
                      <div className="mt-2">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => dispatch(deleteSubmission(index))}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Contact</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    name="comment"
                    className="form-control"
                    rows={3}
                    value={formData.comment}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}