// Get all the necessary DOM elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.getElementById('close-modal');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let images = [
    { src: '/images/image1.jpg', caption: 'Beautiful Sunset over the Ocean' },
    { src: '/images/image2.jpg', caption: 'A Peaceful Forest Landscape' },
    { src: '/images/image3.jpg', caption: 'Snowy Mountains in the Distance' }, // Fixed the missing quote here
    { src: '/images/image4.jpg', caption: 'Sunset Behind Tall Skyscrapers' }
    // Add more images here if needed
];

// Function to render images in the gallery
function renderGallery() {
    gallery.innerHTML = images.map((img, index) => `
        <div class="gallery-item" onclick="openModal(${index})">
            <img src="${img.src}" alt="Image ${index + 1}" class="gallery-image">
            <div class="caption">${img.caption}</div>
        </div>
    `).join('');
}

// Function to open the modal with the selected image
function openModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    updateModalImage();
}

// Function to close the modal
function closeModalFunction() {
    modal.style.display = 'none';
}

// Function to update modal image and caption
function updateModalImage() {
    if (images.length > 0) {
        modalImage.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    }
}

// Event Listeners
closeModal.addEventListener('click', closeModalFunction);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFunction(); });
prevBtn.addEventListener('click', () => navigateImage(-1));
nextBtn.addEventListener('click', () => navigateImage(1));

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'ArrowRight') navigateImage(1);
        if (e.key === 'Escape') closeModalFunction();
    }
});

// Function to navigate images in the modal
function navigateImage(direction) {
    if (images.length > 0) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        updateModalImage();
    }
}

// Render gallery on page load
window.addEventListener('load', renderGallery);
