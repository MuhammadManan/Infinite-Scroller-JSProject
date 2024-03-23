// require("dotenv").config({ path: "info.env" });

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Helper function to set Attributes on dom Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// unsplash API
const count = 30;
// const apiKey = process.env.UNSPLASH_ACCESS_KEY;
const apiKey = "bEYxMr5av2xXfs4G6KdGTskwA3pg9b5KAQABIwQS8MQ";
// const apiKey = "yZmDhjzLGqoihb1B6v7-wpe45DsIZkv1Kj2kIpncnr8";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// imageLoaded function
function imageLoaded() {
  //   console.log("images are loaded");
  imagesLoaded++;
  //   console.log("images Loaded : ", imagesLoaded);
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    // console.log("ready: ", ready);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //   console.log("Total Images: ", totalImages);
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a> </a>
    // then put both inside imageContinaer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    // console.log(response);
    photosArray = await response.json();
    // console.log(photosArray);
    // console.log(photosArray[0].alt_description);
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    // if (imagesLoaded === totalImages) {
    //   loader.hidden = false;
    //  }
    // console.log("load more!");
    ready = false;
    getPhotos();
  }
});

getPhotos();
