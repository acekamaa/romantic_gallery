const categories = [
  { value: 'all', label: 'All memories' },
  { value: 'birthdays', label: 'birthdays' },
  { value: 'valentines', label: 'valentines' },
  { value: 'randoms', label: 'randoms' },
  { value: 'day1', label: 'Day 1' },
];

export default function renderGallery(photos, activeCategory = 'all') {
  const filteredPhotos =
    activeCategory === 'all' ? photos : photos.filter((photo) => photo.category === activeCategory);

  return `
    <nav class="gallery-filters" aria-label="Filter photos by category">
      ${categories
        .map(
          ({ value, label }) => `
            <button
              class="filter-button ${activeCategory === value ? 'active' : ''}"
              data-category="${value}"
              aria-pressed="${activeCategory === value}"
            >
              ${label}
            </button>
          `
        )
        .join('')}
    </nav>

    <div class="photo-grid">
      ${filteredPhotos
        .map(
          (photo, index) => `
            <article class="photo-card">
              <button
                class="photo-open-button"
                type="button"
                data-photo-index="${index}"
                aria-label="Open photo: ${photo.alt}"
              >
                <img
                  src="${photo.src}"
                  alt="${photo.alt}"
                  loading="lazy"
                  class="gallery-image"
                />
              </button>

              ${photo.caption ? `<p class="photo-caption">${photo.caption}</p>` : ''}
            </article>
          `
        )
        .join('')}
    </div>
  `;
}
