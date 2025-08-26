"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [message, setMessage] = useState("");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">Navbar</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/"
                  onClick={() => setMessage("Home Page Clicked")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/about-us"
                  onClick={() => setMessage("About Page Clicked")}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/contact-us"
                  onClick={() => setMessage("Contact Page Clicked")}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/contact-us-list">
                  Contact Us List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/crud">
                  CRUD
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/getall-reviews">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {message && <p className="text-center fw-bold mt-3">{message}</p>}
    </>
  );
}
