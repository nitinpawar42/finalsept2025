# Project Blueprint

## Overview

This project is a web application built with [Astro.js](https://astro.build/), a web framework for building fast, content-focused websites. It's configured as a server-side rendered application using a Node.js adapter. The project is set up to be a "bring your own framework" environment, with integrations for Preact, React, Solid.js, Svelte, and Vue.js. Styling is handled by [Tailwind CSS](https://tailwindcss.com/), and the application includes a dark theme.

The backend is powered by [Firebase](https://firebase.google.com/), providing services for authentication and database management.

## Project Outline

### Framework & Integrations

*   **Framework:** Astro.js
*   **UI Frameworks:**
    *   Preact
    *   React
    *   Solid.js
    *   Svelte
    *   Vue.js
*   **Styling:** Tailwind CSS
    *   Dark mode enabled
    *   `tailwindcss-animate` plugin for animations
*   **Backend:** Firebase
    *   Authentication
    *   Firestore
*   **Deployment:** Server-side rendering with a Node.js adapter

### Current Change: Update Firebase Configuration & Enable Dark Theme

*   **Request:** The user requested to update the Firebase configuration and enable a dark theme.
*   **Steps Taken:**
    1.  The `.env` file was updated with the new Firebase project configuration. The environment variables were prefixed with `PUBLIC_` to make them accessible to the client-side, following Astro's convention.
    2.  The `src/firebase/client.js` file was updated to use the environment variables from the `.env` file for Firebase initialization, making the configuration more secure and maintainable.
    3.  It was confirmed that dark mode is enabled in the `tailwind.config.mjs` file (`darkMode: ["class"]`).
