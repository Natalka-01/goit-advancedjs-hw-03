export const fetchPhotosByQuery = query => {

    const fetchParams = new URLSearchParams(
        {
            key: '52947144-373b760a7dc07b63f24b6c37a',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    );
    return  fetch(
        `https://pixabay.com/api/?${fetchParams}`
    )
    .then (response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })

};