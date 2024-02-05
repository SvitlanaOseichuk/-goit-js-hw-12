import{i as l,S as g,a as y}from"./assets/vendor-951421c8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const L="https://pixabay.com/api/",b="42149629-e1e8d2a9238f015bc3d9ce966",o={form:document.getElementById("form"),resultContainer:document.getElementById("result-container"),loadingIndicator:document.querySelector(".loader"),loadMoreButton:document.querySelector(".load-more-button")},d=15;let m=1,c="";o.form.addEventListener("submit",v);o.loadMoreButton.addEventListener("click",p);function w(){o.resultContainer.innerHTML=""}function M(){o.loadingIndicator.style.display="block"}function u(){o.loadingIndicator.style.display="none"}async function v(a){a.preventDefault();const r=a.currentTarget;if(c=r.elements.search.value.trim(),w(),M(),c.length===0){l.show({message:"Please, try again!",color:"red"}),u(),o.loadMoreButton.classList.add("is-hidden");return}try{const n=(await h(c)).hits;if(n.length===0)l.show({message:"Sorry, there are no images matching your search query. Please try again!"});else{let e="";for(const s of n)e+=f(s);o.resultContainer.innerHTML=e;const t=new g(".image-container a",{captionsData:"alt",captionDelay:250})}n.length>0?(o.loadMoreButton.classList.remove("is-hidden"),o.loadMoreButton.addEventListener("click",p)):o.loadMoreButton.classList.add("is-hidden")}catch{l.show({message:"Sorry, there are no images matching your search query. Please try again!"})}finally{u(),r.reset()}}async function h(a){try{return(await y.get(L,{params:{key:b,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:d,page:m}})).data}catch(r){throw new Error(`Error fetching images: ${r.message}`)}}function f({likes:a,views:r,comments:i,downloads:n,tags:e,webformatURL:t,largeImageURL:s}){return`<li class="image-container">
      <a class="gallery-link" href="${s}">
       <img
         class="gallery-image"
         src="${t}"
         alt="${e}"
       />
      </a>
      <div class="overlay">
      <p>likes<br>${a}</p>
      <p>views<br>${r}</p>
      <p>comments<br>${i}</p>
      <p>downloads<br>${n}</p></div>
  </li>`}async function p(){m+=1;try{const i=(await h(c)).hits;if(i.length>0){let n=" ";for(const t of i)n+=f(t);o.resultContainer.innerHTML+=n;const e=new g(".image-container a",{captionsData:"alt",captionDelay:250});i.length>=d?o.loadMoreButton.classList.remove("is-hidden"):o.loadMoreButton.classList.add("is-hidden")}}catch(r){console.error("Error loading more pictures:",r)}const a=o.resultContainer.querySelector(".image-container").getBoundingClientRect().height;window.scrollBy({top:a*d,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
