import { Photo } from './Photo.js';

const imageFiles = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photos = Object.entries(imageFiles).map(([path, src], index) => {
  const category = path.split('/')[3];

  return new Photo({
    id: `photo-${index + 1}`,
    src,
    alt: `A memory from ${category}`,
    caption: '',
    category,
  });
});

export default photos;
