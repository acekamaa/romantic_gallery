import './styles/main.css';
import photos from './data/gallery.js';
import renderGallery from './components/Gallery.js';
import createLightbox from './components/Lightbox.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header">
    <a class="site-title" href="/" aria-label="Romantic Gallery home">
      Our Story
    </a>

    <nav class="site-navigation" aria-label="Main navigation">
      <a href="#memories">Memories</a>
      <a href="#about">Our Story</a>
    </nav>
  </header>

  <main>
    <section class="gallery-intro" id="memories">
      <p class="eyebrow">A collection of our moments</p>
      <h1>Every picture tells our story.</h1>
      <p class="intro-text">
        A little place for the memories that mean everything.
      </p>
    </section>

    <section class="gallery-content" aria-label="Photo gallery">
      <div id="gallery-container"></div>
    </section>
  </main>

  <footer class="site-footer" id="about">
    <p>Made with love, for us.</p>
  </footer>
`;

const galleryContainer = document.querySelector('#gallery-container');
const lightbox = createLightbox();

let activeCategory = 'all';

function getVisiblePhotos() {
  return activeCategory === 'all'
    ? photos
    : photos.filter((photo) => photo.category === activeCategory);
}

function updateGallery() {
  galleryContainer.innerHTML = renderGallery(photos, activeCategory);
}

galleryContainer.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const filterButton = target.closest('[data-category]');
  if (filterButton) {
    activeCategory = filterButton.dataset.category;
    updateGallery();
    return;
  }

  const photoButton = target.closest('[data-photo-index]');
  if (photoButton) {
    lightbox.open(getVisiblePhotos(), Number(photoButton.dataset.photoIndex));
  }
});

updateGallery();
