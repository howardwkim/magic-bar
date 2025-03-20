# 🚀 Core Features & Vision

The platform allows users to upload a photo, apply AI-based style transfer, and purchase a custom canvas print with their selected artwork.

## 1️⃣ User Flow

### **User Uploads Image(s)**
- **Required:** Main image (uploaded by the user).
- **Required (at least one style image must be provided, whether as a selection or an upload):** 
  - User uploades style image of their choosing (up to four)
  - Use selects from our predfined style images (we will provide 4 options)
- **Optional** Prompt input to guide AI generation 

### **AI Image Generation**
- API call to generate a batch of transformed images.
- Users select one image or regenerate a new batch (limited to 20/day per session).
- Progress indicator + estimated wait time (~20 sec).

### **Selection & Purchase**
- Users choose their final image.
- At checkout, the system passes the image URL along with the order.
- Upon payment, the final high-resolution image is upscaled and delivered via an automated download link.

### **Admin & Data Management**
- Track all user actions (selected/rejected images, regenerations, purchases).
- Admin panel to view order details & linked generated images.

### **Storage**
- ✅ Keep uploaded images, style images, and purchased final images permanently.
- ❌ Delete rejected/generated images after 365 days.

---

## 🛠️ Technical Approach

### **1️⃣ Shopify Integration**
- **Implementation Strategy:**  
  - The script will be embedded in `theme.liquid` to integrate with the Shopify storefront.
  - "The Shopify integration will use a lightweight script loader pattern similar to analytics scripts, which will fetch the full UI and functionality from our backend server and inject it into the page. This allows for updates without modifying the Shopify theme code directly."
  - It will dynamically inject the user interface into the Shopify site.
  - The script will handle API calls to a backend for image generation and order processing.

- **Major Components for a Fully Working Script:**
  1. **User Interface (UI)**
     - A front-end modal or embedded component that users interact with.
     - UI should allow image uploads, prompt input, and style selection.
     - Must display generated images and allow users to finalize a selection.

  2. **Backend API**
     - Handles image processing requests.
     - Stores generated images and user preferences.
     - Passes the final selection to Shopify’s checkout system.
     - Provides authentication & order tracking.

  3. **Frontend-to-Backend Communication**
     - Script should send requests to the backend API upon user action.
     - Backend must return processed image results.
     - Selected image should be stored and linked to the Shopify order.

# **Instructions for the LLM on MVP Development**

## **1. Development Environment & Approach**
- The final implementation will involve embedding a script inside `theme.liquid` in Shopify.
- This script will make API calls to a backend that will deliver the UI/HTML/Javascript that will get embedded into the page.
- However, for the **MVP**, no backend is being developed yet.
- To accelerate development, I am working in a **local environment using an HTML file** to quickly iterate on UI and functionality.
- The current script assumes that the original script (which will eventually be embedded in Shopify) has already been called.

## **2. MVP Goals**
- Focus on front-end development and UI functionality without requiring backend dependencies.
- Simulate interactions that will eventually be handled via API calls.
- Ensure that when the MVP is complete, it can be adapted into the Shopify script seamlessly.

## **3. Future Integration Plan**
- Once the MVP is finalized, the code will be refactored into the script that gets embedded into Shopify.
- The backend API will be developed later and connected to the script for full functionality.

## **4. Key Considerations for the LLM**
- Do **not** suggest backend-dependent solutions at this stage.
- Do **not** assume direct Shopify integration for now—focus on HTML-based UI development.
- Any API calls should be mocked or simulated rather than requiring a live backend.
- The eventual goal is to transition this HTML-based MVP into a Shopify-compatible script.


---

This document will serve as the base for further development iterations.
