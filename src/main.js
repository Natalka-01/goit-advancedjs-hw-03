import iziToast from "izitoast";
// Additional style import for iziToast. This ensures the necessary CSS is loaded for the notifications.
import "izitoast/dist/css/iziToast.min.css";
import { createGalleryCardTemplate } from './js/render-functions'; // Function to create the HTML markup for a single gallery item.
import {fetchPhotosByQuery} from "./js/pixabay-api" // API call function to fetch images from Pixabay based on a search query.

// SimpleLightbox library import (as described in documentation). Used for creating a modal/slideshow view of the images.
import SimpleLightbox from "simplelightbox";
// Additional style import for SimpleLightbox. This ensures the necessary CSS is loaded for the lightbox component.
import "simplelightbox/dist/simple-lightbox.min.css";

// Variable to hold the SimpleLightbox instance. Initialized to null.
let lightboxInstance = null;

// LIGHTBOX INITIALIZATION/UPDATE FUNCTION
// This function initializes the SimpleLightbox or refreshes it after new images are added to the DOM.
const initLightbox = () => {
    // If the instance hasn't been created yet (first time loading gallery), create it.
    if (!lightboxInstance) {
        lightboxInstance = new SimpleLightbox('.js-gallery a', {
            // Target all <a> tags within the gallery container (.js-gallery) for the lightbox functionality.
            captionDelay: 250, // Delay in milliseconds before the caption appears.
            captionsData: 'alt', // Specify to use the 'alt' attribute of the image for the caption text.
        });
    } else {
        // If the instance already exists, refresh it to include any newly added images in the gallery.
        lightboxInstance.refresh();
    }
}


// Form elements references. Grouping DOM elements here makes them easy to access and manage.
const refs = {
    searchForm: document.querySelector('.js-search-form'), // Reference to the main search form element.
    gallery: document.querySelector('.js-gallery'), // Reference to the container where gallery cards are rendered.
    loader: document.querySelector('.js-loader'),
}

// Handler function executed when the search form is submitted.
const onSearchFormSubmit = event => {
    event.preventDefault(); // Prevent the default form submission and page reload.

    // Destructure the target element from the event object for easier access.
    const {target : searchForm} = event;

    // Get the value from the input field named 'user_query' and remove leading/trailing whitespace.
    const searchedQuery = searchForm.elements.user_query.value.trim()
    

    // Validation: Check if the search query is empty.
    if (searchedQuery.length === 0) {
        
            // Display an error notification using iziToast if the query is empty.
            iziToast.show({
            title: "WARNING",
            message: `Search query cannot be empty!`,
            color: 'red', // Set notification color to red for warnings/errors.
            position: 'topCenter', // Position the notification at the top center of the screen.

        });

        return; // Stop the function execution if the query is empty.
    }
    // Clear the existing gallery content before fetching and displaying new results.
    refs.gallery.innerHTML = '';

    refs.loader.classList.add('is-active')
    
    // Call the API function to fetch photos based on the user's query.
    fetchPhotosByQuery(searchedQuery)
    .finally(() => {
        refs.loader.classList.remove('is-active');
    })
    .then(data => {
        console.log(data)
        // Check if the API returned no results (hits array is empty).
        if (data.hits.length === 0){
            // Display a notification if no images were found for the query.
            iziToast.show({
    message: 'Sorry, there are no images matching your search query. Please try again!',
    color: 'red', // Set notification color to red.
    position: 'topCenter', // Position the notification.

});
    return // Stop execution if no hits are found.
        }

        // Map over the array of picture data (data.hits) and create an HTML card template for each.
        // Then, join the array of HTML strings into a single string.
        const galleryCardTemplate = data.hits.map(pictureInfo => createGalleryCardTemplate(pictureInfo)).join('')
        
        // Insert the generated HTML string of gallery cards into the gallery container.
        refs.gallery.innerHTML = galleryCardTemplate
        
        // Initialize or refresh the SimpleLightbox to include the newly rendered images.
        initLightbox();

    })
    // Handle any errors that occur during the fetch process (e.g., network error).
    .catch(err => {
        console.log(err);
    });
}

// Attach the event listener to the search form to trigger the submission handler.
refs.searchForm.addEventListener('submit', onSearchFormSubmit)