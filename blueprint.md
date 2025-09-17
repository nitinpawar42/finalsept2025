# Project Blueprint

## Overview

This project is a static-first web application built with Astro.js. It's designed to be a fast, performant, and scalable e-commerce platform. The application leverages Astro's "Islands Architecture" to deliver minimal JavaScript by default, ensuring an exceptional user experience and top-tier Core Web Vitals. The project is set up to be developed within the Firebase Studio environment and utilizes various Firebase services.

### Core Technologies

*   **Frontend Framework:** Astro.js
*   **UI Frameworks:** React, Vue, Svelte, Solid.js, Preact
*   **Styling:** Tailwind CSS
*   **Backend:** Firebase (Authentication, Firestore, DataConnect)

## Implemented Features

*   **Authentication:** User login and profile management.
*   **E-commerce:** Product browsing, cart functionality, checkout process with Razorpay integration, and order confirmation.
*   **Admin Dashboard:** Management of products, resellers, and approvals.
*   **Reseller Dashboard:** Reseller-specific views and information.
*   **API Endpoints:** Various API routes for handling tasks like calculating shipping, creating orders, and verifying payments.

## Project Structure

*   `src/pages`: Contains the different pages of the application, with file-based routing.
*   `src/components`: Reusable components, including Astro components and components from other UI frameworks.
*   `src/layouts`: Layout components for different sections of the site (e.g., admin, reseller, main layout).
*   `src/firebase`: Firebase client and admin configurations.
*   `dataconnect`: Firebase DataConnect schema and queries.
*   `public`: Static assets like images and fonts.

## Current Request: Initial Setup and Cleanup

*   **Objective:** Initial project setup and cleanup of unnecessary files.
*   **Steps:**
    *   Configured Git to allow merging of unrelated histories.
    *   Removed the `README.md` file.
    *   Removed the `norkogfer` file.
    *   Created this `blueprint.md` file to document the project.
