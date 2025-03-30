function displayStoredArt() {
    const artContainer = document.getElementById('artContainer');
    artContainer.innerHTML = ''; // Clear any existing content

    for (let i = 0; i < window.arraySizeArt; i++) {
        const artSrc = window.arrayArt[i];
        if (artSrc) { // Ensure the art source is not null or undefined
            const img = document.createElement('img');
            img.src = artSrc; // Set the image source to the stored art
            img.style.width = '150px'; // Set a fixed width for the images
            img.style.height = '150px'; // Set a fixed height for the images
            img.style.objectFit = 'cover'; // Ensure the image fits within the dimensions
            img.style.border = '2px solid white'; // Add a border for better visibility
            img.onerror = () => console.error(`Failed to load image at index ${i}:`, artSrc); // Log errors
            artContainer.appendChild(img);
        } else {
            console.warn(`No art found at index ${i}`); // Log missing art
        }
    }
}