
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import { createGalleryCardTemplate } from './js/render-functions';
import {fetchPhotosByQuery} from "./js/pixabay-api"

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

let lightboxInstance = null;

// 🔑 ФУНКЦІЯ ІНІЦІАЛІЗАЦІЇ/ОНОВЛЕННЯ LIGHTBOX
const initLightbox = () => {
    // Якщо екземпляр ще не створено, створюємо його вперше
    if (!lightboxInstance) {
        lightboxInstance = new SimpleLightbox('.js-gallery a', {
            // Використовуємо .js-gallery a, щоб таргетувати всі посилання 
            // всередині контейнера галереї
            captionDelay: 250,
            captionsData: 'alt',
        });
    } else {
        // Якщо екземпляр вже існує, оновлюємо його (метод refresh())
        lightboxInstance.refresh();
    }
}


//TODO1 Форма пошуку
const refs = {
    searchForm: document.querySelector('.js-search-form'),
    gallery: document.querySelector('.js-gallery')
}

const onSearchFormSubmit = event => {
    event.preventDefault();

    const {target : searchForm} = event;

    const searchedQuery = searchForm.elements.user_query.value.trim()
    

    if (searchedQuery.length === 0) {
        
            iziToast.show({
            title: "WARRNING",
            message: `It can't be empty!`,
            color: 'red', // blue, red, green, yellow
            position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center

        });

        return;
    }
    refs.gallery.innerHTML = '';
    fetchPhotosByQuery(searchedQuery)
    .then(data => {
        console.log(data)
        if (data.hits.length === 0){
            iziToast.show({
    message: 'Sorry, there are no images matching your search query. Please try again!',
    color: 'red', // blue, red, green, yellow
    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center

});
    return
        }

        const galleryCardTemplate = data.hits.map(pictureInfo => createGalleryCardTemplate(pictureInfo)).join('')
        refs.gallery.innerHTML = galleryCardTemplate
        initLightbox();

    })
    .catch(err => {
        console.log(err);
    });
}

refs.searchForm.addEventListener('submit', onSearchFormSubmit)


