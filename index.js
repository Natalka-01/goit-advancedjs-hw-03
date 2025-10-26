import{i as c,S as u}from"./assets/vendor-5ObWk2rO.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();let n=null;const p=()=>{n?n.refresh():n=new u(".js-gallery a",{captionDelay:250,captionsData:"alt"})},m=r=>`

    <li class="gallery-card">
    <a class = "js-gallery-link" href = "${r.largeImageURL}"> <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}"/></a>
    <div class="stats-container">
        <ul class="stats-list">
            <li class="gallery-item">
                <span class="label">Likes</span>
                <span class="value">${r.likes}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Views</span>
                <span class="value">${r.views}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Comments</span>
                <span class="value">${r.comments}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Downloads</span>
                <span class="value">${r.downloads}</span>
            </li>
        </ul>
    </div>
</li>`,i={searchForm:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery")},y=r=>{r.preventDefault();const{target:a}=r,l=a.elements.user_query.value.trim();if(l.length===0){c.show({title:"WARRNING",message:"It can't be empty!",color:"red",position:"topCenter"});return}console.log(l),i.gallery.innerHTML="",fetch(`https://pixabay.com/api/?key=52947144-373b760a7dc07b63f24b6c37a&q=${l}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{if(console.log(t),t.hits.length===0){c.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topCenter"});return}const e=t.hits.map(s=>m(s)).join("");i.gallery.innerHTML=e,p()}).catch(t=>{console.log(t)})};i.searchForm.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
