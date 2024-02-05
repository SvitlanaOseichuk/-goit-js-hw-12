// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import axios from "axios";

// const URL ="https://pixabay.com/api/";
// const API_KEY = "42149629-e1e8d2a9238f015bc3d9ce966";

// const refs = {
//     form: document.getElementById("form"),
//     resultContainer: document.getElementById("result-container"),
//     loadingIndicator: document.querySelector(".loader"),
//     loadMoreButton: document.querySelector(".load-more-button")
// };

// let page = 1;
// let perPage = 12;
 

// const hiddenClass = "is-hidden";

// refs.form.addEventListener("submit", handleSearch);  

// function clearResultContainer() {
//     refs.resultContainer.innerHTML = "";
//     page = 1;
// }

// function showLoadingIndicator() {
//     refs.loadingIndicator.style.display = "block";
// }

// function hideLoadingIndicator() {
//     refs.loadingIndicator.style.display = "none";
// }


// async function handleSearch(event) { 

//     event.preventDefault();
//     const form = event.currentTarget;
//     const requestForSearch = form.elements.search.value.trim();

//     clearResultContainer();
//     showLoadingIndicator();


//     if ( requestForSearch.length === 0){
//             iziToast.show({
//                 message: "Please, try again!",
//                 color: "red"
//             });
//             hideLoadingIndicator();
//             refs.loadMoreButton.classList.add(hiddenClass);// delite mab
//             return;
//         }

// try{
//     const data = await searchPictures(requestForSearch);
// // console.log(data.hits);
//     const pictures = data.hits;
     
//     if (pictures.length === 0) {
//         iziToast.show({
//             message: "Sorry, there are no images matching your search query. Please try again!"
//         });
//     } else {
//         let markup = ""
//         for (const pic of pictures) {
//             markup +=createPicturesMarkup(pic);
//         }
//         refs.resultContainer.innerHTML = markup;
       
       
//         const lightbox = new SimpleLightbox(".image-container a", {
//             captionsData: "alt", 
//             captionDelay: 250,
//         });
//     }
//    if (pictures.length > 0) {
//     refs.loadMoreButton.classList.remove(hiddenClass);
//     refs.loadMoreButton.addEventListener("click", loadMoreSearch);
//    } else {
//     refs.loadMoreButton.classList.add(hiddenClass);
//    }

// } catch {
//     iziToast.show({
//         message: "Sorry, there are no images matching your search query. Please try again!"
//     });
// } finally {
//         hideLoadingIndicator();
//         form.reset();
//     }
// }


// async function searchPictures(requestForSearch) { 
//     try{
//      const res = await axios.get(URL,{
//             params: {
//             key: API_KEY,
//             q: requestForSearch,
//             image_type: "photo",
//             orientation: "horizontal",
//             safesearch: true,
//             per_page: 12,
//             page
//         },
//     });

//         return res.data;
//     } catch (error) {
//         throw new Error(`Error fetching images: ${error.message}`);
//     }
// }



// function createPicturesMarkup({likes, views, comments, downloads, tags, webformatURL, largeImageURL}) {
//     return `<li class="image-container">
//         <a class="gallery-link" href="${largeImageURL}">
//          <img
//            class="gallery-image"
//            src="${webformatURL}"
//            alt="${tags}"
//          />
//         </a>
//         <div class="overlay">
//         <p>likes<br>${likes}</p>
//         <p>views<br>${views}</p>
//         <p>comments<br>${comments}</p>
//         <p>downloads<br>${downloads}</p></div>
//     </li>
// `
// };




// async function loadMoreSearch() {
//     page += 1;
  
//     try {
//       const data = await searchPictures(refs.form.elements.search.value.trim());
//       const pictures = data.hits;
  
//       if (pictures.length > 0) {
//         let markup = '';
//         for (const pic of pictures) {
//           markup += createPicturesMarkup(pic);
//         }
//         refs.resultContainer.innerHTML += markup;
  
//         const lightbox = new SimpleLightbox('.image-container a', {
//           captionsData: 'alt',
//           captionDelay: 250,
//         });
  
//         if (pictures.length >= perPage) {
//           refs.loadMoreButton.classList.remove('is-hidden');
//         } else {
//           refs.loadMoreButton.classList.add('is-hidden');
//         }
//       }
//     } catch (error) {
//       console.error('Error loading more pictures:', error);
//     }
  
//     // Прокручування сторінки після завантаження додаткових зображень
//     const cardHeight = refs.resultContainer.querySelector('.image-container').getBoundingClientRect().height;
//     window.scrollBy({
//       top: cardHeight * perPage,
//       behavior: 'smooth',
//     });
//   }
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const URL = 'https://pixabay.com/api/';
const API_KEY = '42149629-e1e8d2a9238f015bc3d9ce966';

const refs = {
  form: document.getElementById('form'),
  resultContainer: document.getElementById('result-container'),
  loadingIndicator: document.querySelector('.loader'),
  loadMoreButton: document.querySelector('.load-more-button'),
};


const perPage = 15;
let page = 1;
let requestForSearch = ""; 

refs.form.addEventListener("submit", handleSearch);
refs.loadMoreButton.addEventListener("click", loadMoreSearch);

function clearResultContainer() {
  refs.resultContainer.innerHTML = "";
}

function showLoadingIndicator() {
  refs.loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
  refs.loadingIndicator.style.display = "none";
}

async function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  requestForSearch = form.elements.search.value.trim();

  clearResultContainer();
  showLoadingIndicator();

  if (requestForSearch.length === 0) {
    iziToast.show({
      message: "Please, try again!",
      color: "red",
    });
    hideLoadingIndicator();
    refs.loadMoreButton.classList.add("is-hidden");
    return;
  }

  try {
    const data = await searchPictures(requestForSearch);
    const pictures = data.hits;
    if (pictures.length === 0) {
          iziToast.show({
            message: "Sorry, there are no images matching your search query. Please try again!"
        });
    } else {
        let markup = ""
        for (const pic of pictures) {
            markup +=createPicturesMarkup(pic);
        }
    refs.resultContainer.innerHTML = markup;
               
               
        const lightbox = new SimpleLightbox(".image-container a", {
            captionsData: "alt", 
            captionDelay: 250,
        });
    }
    if (pictures.length > 0) {
    refs.loadMoreButton.classList.remove("is-hidden");
    refs.loadMoreButton.addEventListener("click", loadMoreSearch);
    } else {
     refs.loadMoreButton.classList.add("is-hidden");
    }
    
  } catch (error) {
    iziToast.show({
        message: "Sorry, there are no images matching your search query. Please try again!"
    });
  } finally {
    hideLoadingIndicator();
    form.reset();
  }
}

async function searchPictures(requestForSearch) {
  try {
    const res = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: requestForSearch,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}

function createPicturesMarkup({ likes, views, comments, downloads, tags, webformatURL, largeImageURL }) {
  return `<li class="image-container">
      <a class="gallery-link" href="${largeImageURL}">
       <img
         class="gallery-image"
         src="${webformatURL}"
         alt="${tags}"
       />
      </a>
      <div class="overlay">
      <p>likes<br>${likes}</p>
      <p>views<br>${views}</p>
      <p>comments<br>${comments}</p>
      <p>downloads<br>${downloads}</p></div>
  </li>`;
}


async function loadMoreSearch() {
    page += 1;
  
    try {
      const data = await searchPictures(requestForSearch);
      const pictures = data.hits;
  
      if (pictures.length > 0) {
        let markup = " ";
        for (const pic of pictures) {
          markup += createPicturesMarkup(pic);
        }
        refs.resultContainer.innerHTML += markup;
  
        const lightbox = new SimpleLightbox(".image-container a", {
          captionsData: "alt",
          captionDelay: 250,
        });
  
        if (pictures.length >= perPage) {
          refs.loadMoreButton.classList.remove("is-hidden");
        } else {
          refs.loadMoreButton.classList.add("is-hidden");
        }
      }
    } catch (error) {
      console.error("Error loading more pictures:", error);
    }

  }
  