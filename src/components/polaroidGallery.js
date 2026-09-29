// ==========================================================================
// POLAROID GALLERY COMPONENT
// Elegant static stacked cards with slow, luxurious hover expansion and Lightbox
// ==========================================================================

export function initPolaroids(onCardClick) {
  const cards = document.querySelectorAll('.polaroid-card');
  const stage = document.getElementById('polaroid-stage');
  if (!cards.length || !stage) return;

  let highestZ = 10;

  cards.forEach((card) => {
    // Prevent default browser drag on images
    const img = card.querySelector('img');
    if (img) img.setAttribute('draggable', 'false');

    // Bring to front on hover
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = ++highestZ;
    });

    // Clean click handler for Lightbox preview
    card.addEventListener('click', () => {
      const photoImg = card.querySelector('img');
      const title = card.querySelector('.card-title')?.innerText || '';
      if (photoImg && onCardClick) {
        onCardClick(photoImg.src, title);
      }
    });
  });
}
