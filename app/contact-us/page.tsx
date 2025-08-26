//With single data and mutiple useState for each field

// "use client";
// import React, { FormEvent, useState } from "react";

// const ContactUs = () => {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [comment, setComment] = useState("");

//   const [submittedData, setSubmittedData] = useState<{
//     userName: string;
//     email: string;
//     comment: string;
//   } | null>(null);

//   function handleSubmit(event: FormEvent<HTMLFormElement>): void {
//     event.preventDefault();

//     setSubmittedData({
//       userName,
//       email,
//       comment,
//     });

//     setUserName("");
//     setEmail("");
//     setComment("");
//   }

//   return (
//     <div className="container my-5">
//       <div className="row g-4">
//         {/* Contact Form */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3">
//             <div className="card-body p-4">
//               <h3 className="mb-4 text-center">Contact Us</h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="userName" className="form-label">
//                     User Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter user name"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="comment" className="form-label">
//                     Comment
//                   </label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     placeholder="Enter comment"
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-dark">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Preview Section - show only after submit */}
//         <div className="col-md-6">
//           {submittedData && (
//             <div className="card shadow-sm border-0 rounded-3">
//               <div className="card-body p-4">
//                 <h4 className="mb-3">Submitted Data</h4>
//                 <ul className="list-group">
//                   <li className="list-group-item">
//                     <strong>User Name:</strong> {submittedData.userName}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Email:</strong> {submittedData.email}
//                   </li>
//                   <li className="list-group-item">
//                     <strong>Comment:</strong> {submittedData.comment}
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

//With multiple objects in array and 2 useState
// "use client";
// import React, { FormEvent, useState } from "react";

// interface ContactData {
//   userName: string;
//   email: string;
//   comment: string;
// }

// const ContactUs = () => {
//   const [formData, setFormData] = useState<ContactData>({
//     userName: "",
//     email: "",
//     comment: "",
//   });

//   const [submissions, setSubmissions] = useState<ContactData[]>([]);

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>): void {
//     event.preventDefault();

//     setSubmissions((prev) => [...prev, formData]);

//     setFormData({ userName: "", email: "", comment: "" });
//   }

//   return (
//     <div className="container my-5">
//       <div className="row g-4">
//         {/* Contact Form */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3">
//             <div className="card-body p-4">
//               <h3 className="mb-4 text-center">Contact Us</h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="userName" className="form-label">
//                     User Name
//                   </label>
//                   <input
//                     type="text"
//                     name="userName"
//                     className="form-control"
//                     placeholder="Enter user name"
//                     value={formData.userName}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="comment" className="form-label">
//                     Comment
//                   </label>
//                   <textarea
//                     name="comment"
//                     className="form-control"
//                     rows={3}
//                     placeholder="Enter comment"
//                     value={formData.comment}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-dark">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Preview Section - show only after submit */}
//         <div className="col-md-6">
//           {submissions.length > 0 && (
//             <div className="card shadow-sm border-0 rounded-3">
//               <div className="card-body p-4">
//                 <h4 className="mb-3">Submitted Data</h4>
//                 <ul className="list-group">
//                   {submissions.map((entry, index) => (
//                     <li key={index} className="list-group-item">
//                       <strong>User Name:</strong> {entry.userName}
//                       <br />
//                       <strong>Email:</strong> {entry.email}
//                       <br />
//                       <strong>Comment:</strong> {entry.comment}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

// With array of objects and by local storage
// "use client";
// import React, { FormEvent, useEffect, useState } from "react";

// interface ContactData {
//   userName: string;
//   email: string;
//   comment: string;
// }

// const ContactUs = () => {
//   const [formData, setFormData] = useState<ContactData>({
//     userName: "",
//     email: "",
//     comment: "",
//   });

//   const [submissions, setSubmissions] = useState<ContactData[]>([]);

//   useEffect(() => {
//     const savedData = localStorage.getItem("userData");
//     if (savedData) {
//       setSubmissions(JSON.parse(savedData));
//     }
//   }, []);

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>): void {
//     event.preventDefault();

//     const newSubmissions = [...submissions, formData];

//     setSubmissions(newSubmissions);

//     localStorage.setItem("userData", JSON.stringify(newSubmissions));

//     setFormData({ userName: "", email: "", comment: "" });
//   }

//   return (
//     <div className="container my-5">
//       <div className="row g-4">
//         {/* Contact Form */}
//         <div className="col-md-6">
//           <div className="card shadow-sm border-0 rounded-3">
//             <div className="card-body p-4">
//               <h3 className="mb-4 text-center">Contact Us</h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="userName" className="form-label">
//                     User Name
//                   </label>
//                   <input
//                     type="text"
//                     name="userName"
//                     className="form-control"
//                     placeholder="Enter user name"
//                     value={formData.userName}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Enter email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="comment" className="form-label">
//                     Comment
//                   </label>
//                   <textarea
//                     name="comment"
//                     className="form-control"
//                     rows={3}
//                     placeholder="Enter comment"
//                     value={formData.comment}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-dark">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Submissions Preview */}
//         <div className="col-md-6">
//           {submissions.length > 0 && (
//             <div className="card shadow-sm border-0 rounded-3">
//               <div className="card-body p-4">
//                 <h4 className="mb-3">All Submissions</h4>
//                 <ul className="list-group">
//                    {submissions.map((entry, index) => (
//                     <li key={index} className="list-group-item">
//                       <strong>User Name:</strong> {entry.userName}
//                       <br />
//                       <strong>Email:</strong> {entry.email}
//                       <br />
//                       <strong>Comment:</strong> {entry.comment}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

//Using Redux
"use client";
import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, addSubmission } from "../store";
import { useRouter } from "next/navigation";

export default function ContactUsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    comment: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Form submitted", formData);

    // save to redux
    dispatch(addSubmission(formData));

    console.log("Redirecting to list page...");
    router.push("/contact-us-list");
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4">
              <h3 className="mb-4 text-center">Contact Us</h3>

              <form onSubmit={handleSubmit}>
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

                <div className="d-grid">
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
