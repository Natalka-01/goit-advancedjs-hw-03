//TODO1 Форма пошуку
const refs = {
    searchForm: document.querySelector('.js-search-form')
}

const onSearchFormSubmit = event => {
    event.preventDefault();

    const {target : searchForm} = event;

    const searchedQuery = searchForm.elements.user_query.value.trim()
    

    if (searchedQuery.length === 0) {
        alert("It can't me empty!")

        return;
    }

    console.log(searchedQuery)
}

refs.searchForm.addEventListener('submit', onSearchFormSubmit)
