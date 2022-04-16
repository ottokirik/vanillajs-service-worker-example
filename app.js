import { Gallery } from '/image-list.js';

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');

      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const imageSection = document.getElementById('gallery-section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);

  if (!imageResponse.ok) {
    throw new Error(`Image did not load successfully. Error code: ${imageResponse.statusText || imageResponse.status}`);
  }

  return imageResponse.blob();
};

const createGallery = async (galleryImage, parent) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);

    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');

    myCaption.textContent = `${galleryImage.name}: Taken by ${galleryImage.credit}`;
    myImage.src = URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);

    parent.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

registerServiceWorker();
Gallery.images.map((item) => createGallery(item, imageSection));
