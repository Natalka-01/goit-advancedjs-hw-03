# Vanilla App Template

Цей проект було створено за допомогою Vite. Для знайомства та налаштування
додаткових можливостей [звернись до документації](https://vitejs.dev/).

# Image Search Gallery

A simple, responsive image gallery application built with vanilla JavaScript, leveraging the Pixabay API for image fetching, and utilizing **SimpleLightbox** for a smooth viewing experience and **iziToast** for user notifications.

---

## 🚀 Key Features

* **Image Search:** Users can search for images using a keyword query.
* **Dynamic Gallery:** Search results are dynamically rendered into a flexible grid layout.
* **SimpleLightbox Integration:** Click on any image to open a full-screen, responsive slideshow with captions (using the image's `alt` text).
* **Asynchronous Operations:** Uses modern Promises and asynchronous logic (`.then().catch().finally()`) to manage API calls.
* **Loading State:** A visual loader is displayed while waiting for the API response.
* **User Feedback:** **iziToast** notifications provide clear warnings for empty searches or when no results are found.

---

## 🛠️ Project Structure & Dependencies

The core logic of the application resides in `main.js`. It relies on the following external libraries and local modules:

### External Dependencies

| Dependency | Purpose |
| :--- | :--- |
| **SimpleLightbox** | Handles the image gallery light-box and slideshow functionality. |
| **iziToast** | Used for displaying stylish and non-intrusive notifications/alerts to the user. |

### Local Modules

| Module | Purpose |
| :--- | :--- |
| **`./js/pixabay-api.js`** | Contains the `fetchPhotosByQuery` function for making HTTP requests to the Pixabay API. |
| **`./js/render-functions.js`** | Contains the `createGalleryCardTemplate` function for generating the HTML markup for each image card. |

---

## ⚙️ Core Logic (`main.js`)

### 1. Lightbox Management

The `initLightbox()` function is responsible for:
* **Initialization:** Creating a new `SimpleLightbox` instance upon the first successful search.
* **Refresh:** Calling `lightboxInstance.refresh()` after every subsequent search to ensure the new images are included in the slideshow.

### 2. Event Handling

The primary functionality is driven by the `onSearchFormSubmit` function, which executes on form submission:

1.  **Prevent Default:** Stops the browser's default form submission action.
2.  **Input Validation:** Checks if the search query is empty and shows a **red warning toast** if it is.
3.  **UI Reset:** Clears the previous gallery content (`refs.gallery.innerHTML = ''`).
4.  **Loading State:** Activates the loader (`refs.loader.classList.add('is-active')`).
5.  **API Call:** Calls `fetchPhotosByQuery(searchedQuery)`.
6.  **Response Handling (`.then`):**
    * Checks if `data.hits.length === 0` and displays an error toast if no results are found.
    * Generates the HTML markup for the new gallery cards.
    * Inserts the new markup into the DOM.
    * Calls `initLightbox()` to update the gallery view.
7.  **Error Handling (`.catch`):** Logs any network or fetch errors to the console.
8.  **Cleanup (`.finally`):** Deactivates the loader (`refs.loader.classList.remove('is-active')`) regardless of the API call's success or failure.

---