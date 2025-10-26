
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// import { createGalleryCardTemplate } from '.js/render-functions';

const createGalleryCardTemplate = imgInfo => {
  

  return `

    <li class="gallery-card">
    <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" data-large-img = "${imgInfo.largeImageURL}"/>
    <div class="stats-container">
        <ul class="stats-list">
            <li class="gallery-item">
                <span class="label">Likes</span>
                <span class="value">${imgInfo.likes}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Views</span>
                <span class="value">${imgInfo.views}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Comments</span>
                <span class="value">${imgInfo.comments}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Downloads</span>
                <span class="value">${imgInfo.downloads}</span>
            </li>
        </ul>
    </div>
</li>`
};

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

    console.log(searchedQuery)

    fetch(
        `https://pixabay.com/api/?key=52947144-373b760a7dc07b63f24b6c37a&q=${searchedQuery}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then (response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
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
    })
    .catch(err => {
        console.log(err);
    });
}

refs.searchForm.addEventListener('submit', onSearchFormSubmit)


//TODO_2 HTTP-запити
