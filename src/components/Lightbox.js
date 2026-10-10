export default function createLightbox() {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photo viewer');

  dialog.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" type="button" aria-label="Close photo viewer">
        <span aria-hidden="true">&times;</span>
      </button>
      <button class="lightbox-prev" type="button" aria-label="Previous photo">
        <span aria-hidden="true">&#8592;</span>
      </button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" alt="" />
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      <button class="lightbox-next" type="button" aria-label="Next photo">
        <span aria-hidden="true">&#8594;</span>
      </button>
    </div>
  `;

  const image = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  const closeButton = dialog.querySelector('.lightbox-close');
  const previousButton = dialog.querySelector('.lightbox-prev');
  const nextButton = dialog.querySelector('.lightbox-next');

  let visiblePhotos = [];
  let currentIndex = 0;
  let previousBodyOverflow = '';

  function showPhoto(index) {
    currentIndex = (index + visiblePhotos.length) % visiblePhotos.length;
    const photo = visiblePhotos[currentIndex];

    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = photo.caption || '';
    caption.hidden = !photo.caption;
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  closeButton.addEventListener('click', close);
  previousButton.addEventListener('click', () => showPhoto(currentIndex - 1));
  nextButton.addEventListener('click', () => showPhoto(currentIndex + 1));

  let touchStartX = 0;
  let touchStartY = 0;
  let isTrackingSwipe = false;

  const swipeThreshold = 50;

  image.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' || !dialog.open) return;

    touchStartX = event.clientX;
    touchStartY = event.clientY;
    isTrackingSwipe = true;
  });

  image.addEventListener('pointerup', (event) => {
    if (!isTrackingSwipe || !dialog.open) return;

    isTrackingSwipe = false;

    const deltaX = event.clientX - touchStartX;
    const deltaY = event.clientY - touchStartY;

    const isHorizontalSwipe =
      Math.abs(deltaX) >= swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY);

    if (!isHorizontalSwipe) return;

    if (deltaX < 0) {
      showPhoto(currentIndex + 1);
    } else {
      showPhoto(currentIndex - 1);
    }
  });

  image.addEventListener('pointercancel', () => {
    isTrackingSwipe = false;
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    }
  });

  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousBodyOverflow;
  });

  document.body.append(dialog);

  return {
    open(photos, index) {
      if (!photos.length || index < 0 || index >= photos.length) return;

      visiblePhotos = photos;
      showPhoto(index);
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      if (!dialog.open) dialog.showModal();
      closeButton.focus();
    },
  };
}
