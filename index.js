import{i as c,S as u}from"./assets/vendor-5ObWk2rO.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const p=s=>`
    <li class="gallery-card">
    <a class = "js-gallery-link" href = "${s.largeImageURL}"> <img class="gallery-img" src="${s.webformatURL}" alt="${s.tags}"/></a>
    <div class="stats-container">
        <ul class="stats-list">
            <li class="gallery-item">
                <span class="label">Likes</span>
                <span class="value">${s.likes}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Views</span>
                <span class="value">${s.views}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Comments</span>
                <span class="value">${s.comments}</span>
            </li>
            <li class="gallery-item">
                <span class="label">Downloads</span>
                <span class="value">${s.downloads}</span>
            </li>
        </ul>
    </div>
</li>`,m=s=>{const l=new URLSearchParams({key:"52947144-373b760a7dc07b63f24b6c37a",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${l}`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()})};let i=null;const d=()=>{i?i.refresh():i=new u(".js-gallery a",{captionDelay:250,captionsData:"alt"})},o={searchForm:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")},y=s=>{s.preventDefault();const{target:l}=s,t=l.elements.user_query.value.trim();if(t.length===0){c.show({title:"WARNING",message:"Search query cannot be empty!",color:"red",position:"topCenter"});return}o.gallery.innerHTML="",o.loader.classList.add("is-active"),m(t).finally(()=>{o.loader.classList.remove("is-active")}).then(a=>{if(console.log(a),a.hits.length===0){c.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topCenter"});return}const e=a.hits.map(r=>p(r)).join("");o.gallery.innerHTML=e,d()}).catch(a=>{console.log(a)})};o.searchForm.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
