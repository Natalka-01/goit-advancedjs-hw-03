export const createGalleryCardTemplate = imgInfo => {

  return `
    <li class="gallery-card">
    <a class = "js-gallery-link" href = "${imgInfo.largeImageURL}"> <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}"/></a>
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