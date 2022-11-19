/* 
*1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
*2. Реализация делегирования на div.gallery и получение url большого изображения.
*3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
*4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
*5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
 */


import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const blockMarkup = createImagesGallery(galleryItems);
galleryContainer.insertAdjacentHTML("afterbegin", blockMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createImagesGallery(items) {
  return items.map(({preview, original, description}) =>
  `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`).join('');
};

function onGalleryContainerClick(evt) {
evt.preventDefault();
if (evt.target.nodeName !== 'IMG') {
  return;
}

const instance = basicLightbox.create(
  `<img src="${evt.target.dataset.source}">`,
  {
    onShow: function () {
      window.addEventListener("keydown", checkKeyEvent)
    },
    onClose: function () {
      window.removeEventListener("keydown", checkKeyEvent)
    }
  }
)
  
instance.show()

function checkKeyEvent (evt) {
  console.log(evt.code)
  if (evt.code === "Escape") {
    instance.close();
  }
}
}

