1.1 Project Overview

This document outlines the requirements for the development of a modern, scalable eCommerce platform designed for a reseller business model. The system will facilitate three distinct user roles (Admin, Reseller, Customer) and integrate with third-party services for payments (Razorpay) and shipping (Delhivery). The primary goal is to empower resellers with tools to sell effectively while providing administrators with full oversight and control.

1.2 Problem Statement

The current process for managing resellers and orders is manual and inefficient. There is a need for an automated, centralized system to:

Streamline the reseller onboarding and approval process.

Provide a dedicated portal to manage their products and customers.

Automate key operations like invoice generation and shipping cost calculation.

2. Objectives & Goals

O1: Automate the Reseller Registration and Admin Approval workflow.

O2: Provide a dedicated Admin Dashboard for complete business oversight (users, orders, sales).

O3: Empower Resellers with a portal to view products, manage customers, and track orders.

O4: Deliver a seamless Customer checkout experience with integrated payment and real-time shipping costs.

O5: Automate post-purchase processes: PDF invoice generation, storage, and email delivery.

3. Scope
3.1 In-Scope

User Authentication and Role-Based Access Control (RBAC).

Reseller Registration and Approval Flow.

Admin, Reseller, and Customer portals/dashboards.

Product & Order Management.

Integrated Razorpay Payment Gateway.

Real-time Shipping Cost Calculation via Delhivery API.

Automated PDF Invoice generation and email distribution.

Media (images, invoices) storage in Firebase Storage.

3.2 Out-of-Scope

Development of native mobile applications (iOS/Android).

Multi-currency or multi-language support.

Advanced marketing features (email campaigns, coupons).

Inventory management and warehousing systems.

Customer product reviews and ratings.

4. Stakeholders & User Roles
Role	Description	Key Permissions
Admin	Platform administrator with full system access.	Manage products & users. Approve/Reject resellers. View all orders and sales reports.
Reseller	Approved third-party seller.	View assigned products. Manage their customer list. Place orders on behalf of customers. View their order history.
Customer	End-consumer who purchases products.	Added to the system by a Reseller. Receives order confirmation and invoice via email.

5. Current Plan

**Completed:**
*   **Reseller Registration:**
    *   Updated the registration form to include all required reseller details.
    *   Integrated with Firestore to save reseller applications with a `pending` status.
*   **Reseller Approval:**
    *   Created an admin page to view and manage pending reseller approvals.
    *   Implemented "Approve" and "Reject" functionality.
*   **Product Management:**
    *   Created an admin page to manage products.
    *   Implemented "Add" and "Delete" functionality for products.
*   **Reseller Dashboard:**
    *   Created a dedicated dashboard for resellers.
    *   Implemented functionality for resellers to view products and manage their customers.
*   **Shopping Cart:**
    *   Implemented a shopping cart with "Add to Cart" and "Remove from Cart" functionality.
*   **Checkout Flow:**
    *   Implemented Razorpay payment gateway.
    *   Implemented Delhivery shipping cost calculation.
    *   Automated invoice generation and email delivery.
    *   Made the checkout flow dynamic by calculating the total amount and product dimensions from the user's cart.
*   **Order Management:**
    *   Implemented a more robust order management system by creating an `orders` collection in Firestore.
    *   Created a new order with a `pending` status before payment and pass the order ID to Razorpay.
    *   Updated the order status to `completed` after successful payment.
    *   Fetched the order details from Firestore before calling the `generate-invoice` API.
*   **Admin Dashboard:**
    *   Created an Astro page for the admin dashboard at `src/pages/admin.astro`.
    *   Created the React component `src/components/AdminDashboard.jsx` to render the dashboard.
    *   Installed the following dependencies: `recharts`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-progress`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, and `tailwind-merge`.
    *   Updated `tailwind.config.mjs` to include styles for the dashboard.
    *   Created the following UI components in `src/components/ui`:
        *   `button.jsx`
        *   `card.jsx`
        *   `dialog.jsx`
        *   `input.jsx`
        *   `progress.jsx`
    *   Created `src/lib/utils.js` to merge Tailwind CSS classes.
*   **Customer Details in Checkout:**
    *   Updated `src/pages/api/create-order.js` to include `customerId` in the order data.
    *   Modified `src/pages/checkout.astro` to include a customer selection dropdown, and pass the selected `customerId` when creating an order.
    *   Updated `src/pages/api/verify-payment.js` to use the `customerId` from the order to fetch the correct customer's details from the `customers` collection for generating the invoice.
*   **Admin Dashboard Data:**
    *   Implemented data fetching in `src/components/AdminDashboard.jsx` to display real-time data for total sales, recent orders, and pending reseller approvals.

6. Functional Requirements
6.1 User Management & Authentication (FR1)

FR1.1: The system shall allow users to register and log in using Firebase Auth (Email/Password).

FR1.2: The system shall assign a role (admin, reseller, customer) to each user upon registration.

FR1.3: Reseller registrations shall be set to a pending status until approved by an Admin.

6.2 Reseller Registration & Approval Flow (FR2)

FR2.1: A prospective reseller shall fill a form providing: Full Name, PAN, Mobile, Email, Full Address, and Pincode.

FR2.2: Admin shall be notified of a new registration and can Approve or Reject it from their dashboard.

FR2.3: Upon rejection, Admin must provide a reason.

FR2.4: Upon approval, the reseller's status is updated, and they receive login credentials via email.

6.3 Product Management (FR3)

FR3.1 (Admin): Admin can Create, Read, Update, and Delete (CRUD) products.

FR3.2: Each product shall have: Name, Description, Price, Dimensions (LxBxH), Weight, Image(s), and an optional Video URL.

FR3.3 (Reseller): Resellers can only view products assigned to them.

6.4 Order Management & Checkout (FR4)

FR4.1: A Reseller can add products to a cart and proceed to checkout on behalf of a Customer.

FR4.2: At checkout, the system shall call the Delhivery API to calculate and display real-time shipping costs based on product dimensions, weight, and destination pincode.

FR4.3: The system shall integrate with Razorpay to process payments securely.

FR4.4: Upon successful payment, an order shall be created and tagged with the resellerId and customerId.

6.5 Invoice Generation & Email (FR5)

FR5.1: Upon order confirmation, the system shall automatically generate a PDF invoice.

FR5.2: The generated PDF shall be saved to Firebase Storage, and the download URL shall be stored in the orders collection.

FR5.3: The invoice PDF shall be emailed to the customer's email address provided at checkout.

6.6 Dashboard & Reporting (FR6)

FR6.1 (Admin Dashboard): Shall display overviews of: Total Sales, Recent Orders, and Pending Reseller Approvals.

FR6.2 (Reseller Dashboard): Shall display: Customer List and Order History.

7. Data Model (Firestore Schema)

Collection: users

{
  "id": "string",
  "email": "string",
  "role": "admin" | "reseller" | "customer",
  "createdAt": "timestamp",
  "resellerApprovalStatus": "pending" | "approved" | "rejected",
  "resellerDetails": {
    "fullName": "string",
    "pan": "string",
    "mobile": "string",
    "address": "string",
    "pincode": "string"
  }
}


Collection: products

{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "dimensions": { "length": "number", "breadth": "number", "height": "number" },
  "weight": "number",
  "imageURL": "string",
  "videoURL": "string (optional)",
  "isActive": "boolean"
}


Collection: customers

{
  "id": "string",
  "resellerId": "string",
  "name": "string",
  "email": "string",
  "mobile": "string",
  "address": "string"
}


Collection: orders

{
  "id": "string",
  "userId": "string",
  "customerId": "string",
  "items": [
    {
      "productId": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "shippingAddress": "string",
  "totalAmount": "number",
  "shippingCost": "number",
  "paymentStatus": "pending" | "completed" | "failed",
  "invoiceURL": "string",
  "createdAt": "timestamp"
}

Collection: cart

{
  "id": "string",
  "userId": "string",
  "productId": "string",
  "quantity": "number"
}

8. External Integrations
Service	Purpose	Key Data Exchanged
Razorpay	Payment Processing	Payment intent creation, confirmation status, transaction ID
Delhivery API	Shipping Cost Calculation	Sender/Receiver pincodes, product weight & dimensions → returns shipping cost
Firebase Auth	User Authentication	User login, registration, and session management
Firebase Storage	File Storage	Storage and retrieval of product images and PDF invoices
Email Service (SendGrid/NodeMailer)	Transactional Emails	Sending invoices and order confirmations to customers
9. Success Metrics (KPIs)

Reduction in reseller onboarding time by 75%.

Successful processing of 99.5% of payments without errors.

Automated invoice delivery within 5 minutes of order completion.