// Enhanced particle creation for better visibility across all pages
(function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Clear any existing particles
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    } else {
        console.error("Particles container not found!");
        return;
    }
    
    const colors = ['#e74c3c', '#3498db', '#9b59b6', '#f1c40f', '#1abc9c', '#ffffff'];
    const numberOfParticles = 70; // Increased for better visibility
    
    // Create particles with improved visibility
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties with improved values
        const size = Math.random() * 20 + 8; 
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const bottom = Math.random() * 100;
        const duration = Math.random() * 25 + 15; // Extended duration
        const delay = Math.random() * 10;
        
        // Apply styles directly with higher opacity
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${left}%;
            bottom: ${bottom}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.6 + 0.4}; /* Higher opacity */
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Force browser to recognize the particles
    particlesContainer.offsetHeight;
})();

// Continuously add new particles to ensure they're always visible
setInterval(function() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const existingParticles = particlesContainer.querySelectorAll('.particle');
    const colors = ['#e74c3c', '#3498db', '#9b59b6', '#f1c40f', '#1abc9c', '#ffffff', '#2ecc71', '#e67e22', '#34495e', '#c0392b', '#16a085', '#8e44ad'];
    
    // Add new particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 20 + 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            left: ${left}%;
            bottom: -10%;
            animation-duration: ${duration}s;
            animation-delay: 0s;
            opacity: ${Math.random() * 0.6 + 0.4};
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Remove old particles if there are too many
    if (existingParticles.length > 200) {
        for (let i = 0; i < 15; i++) {
            if (existingParticles[i]) {
                existingParticles[i].remove();
            }
        }
    }
}, 10000); // More frequent updates

// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const poemBtn = document.querySelector('.poem-btn');
    const backToTopBtn = document.getElementById('backToTop');
    const poemBackToTopBtn = document.getElementById('poemBackToTop');
    
    // Navigate to poem
    if (poemBtn) {
        poemBtn.addEventListener('click', () => {
            document.getElementById('poem').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Back to top from poem
    if (poemBackToTopBtn) {
        poemBackToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Regular back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight / 2) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll down arrow functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('gallery').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Gallery functionality
    const gallery = document.getElementById('imageGallery');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentImageEl = document.getElementById('currentImage');
    const totalImagesEl = document.getElementById('totalImages');
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Configuration for image loading - Updated for all 746 images
    const TOTAL_IMAGES = 50; 
    const EXTENSIONS = ['.jpg', '.heic', '.jpeg', '.mp4'];
    const FOLDER_PATH = 'Michelle/';
    
    let currentImageIndex = 0;
    const images = [];
    const thumbnails = [];
    let isLoading = true;
    
    // Function to try loading an image with different extensions
    async function loadImageWithExtensions(number) {
        return new Promise((resolve, reject) => {
            let extensionIndex = 0;
            
            function tryNextExtension() {
                if (extensionIndex >= EXTENSIONS.length) {
                    reject(new Error(`Failed to load image ${number} with any extension`));
                    return;
                }
                
                const path = `${FOLDER_PATH}${number}${EXTENSIONS[extensionIndex]}`;
                const img = new Image();
                
                img.onload = () => {
                    img.alt = `Michelle Image ${number}`;
                    resolve(img);
                };
                
                img.onerror = () => {
                    extensionIndex++;
                    tryNextExtension();
                };
                
                img.src = path;
            }
            
            tryNextExtension();
        });
    }
    
    // Load images and add them to gallery
    (async function loadAllImages() {
        let loadedCount = 0;
        const imagesToLoad = TOTAL_IMAGES; // Load all images
        const batchSize = 20; // Process in batches for better performance
        let currentBatch = 1;
        
        // Function to load a batch of images
        async function loadBatch(start, end) {
            console.log(`Loading batch ${currentBatch}: images ${start} to ${end}`);
            
            for (let i = start; i <= end; i++) {
                if (i > imagesToLoad) break;
                
                try {
                    const img = await loadImageWithExtensions(i);
                    img.className = loadedCount === 0 ? 'active' : '';
                    gallery.appendChild(img);
                    images.push(img);
                    
                    // Create thumbnail (only for first 100 images to save memory)
                    if (loadedCount < 100) {
                        const thumbnail = new Image();
                        thumbnail.src = img.src;
                        thumbnail.classList.add('thumbnail');
                        if (loadedCount === 0) thumbnail.classList.add('active');
                        thumbnail.dataset.index = loadedCount;
                        
                        thumbnail.addEventListener('click', () => {
                            showImage(parseInt(thumbnail.dataset.index));
                        });
                        
                        thumbnailsContainer.appendChild(thumbnail);
                        thumbnails.push(thumbnail);
                    }
                    
                    loadedCount++;
                    
                    // Update counter
                    currentImageEl.textContent = '1';
                    totalImagesEl.textContent = loadedCount.toString();
                    
                    // Show first 10 images immediately
                    if (loadedCount === 10) {
                        loadingSpinner.style.display = 'none';
                        isLoading = false;
                    }
                } catch (error) {
                    console.log(error.message);
                    // Skip to next image if this one fails with all extensions
                }
            }
            
            return loadedCount;
        }
        
        // Load initial batch to get the gallery functioning quickly
        await loadBatch(1, batchSize);
        
        // Then load the rest in batches in the background
        (async function loadRemainingBatches() {
            let startImage = batchSize + 1;
            
            while (startImage <= imagesToLoad) {
                const endImage = Math.min(startImage + batchSize - 1, imagesToLoad);
                currentBatch++;
                await loadBatch(startImage, endImage);
                startImage = endImage + 1;
                
                // Small delay between batches to keep UI responsive
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            console.log(`All ${loadedCount} images loaded`);
            loadingSpinner.style.display = 'none';
            isLoading = false;
            
            // Update the total count one final time
            totalImagesEl.textContent = loadedCount.toString();
        })();
    })();
    
    // Navigation functions
    function showImage(index) {
        if (images.length === 0 || (isLoading && images.length <= index)) return;
        
        // Handle index wraparound
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        // Hide current image
        images[currentImageIndex].classList.remove('active');
        
        // Update thumbnail selection (if available)
        if (currentImageIndex < thumbnails.length) {
            thumbnails[currentImageIndex].classList.remove('active');
        }
        
        // Show new image
        currentImageIndex = index;
        images[currentImageIndex].classList.add('active');
        
        // Update thumbnail (if available)
        if (currentImageIndex < thumbnails.length) {
            thumbnails[currentImageIndex].classList.add('active');
            thumbnails[currentImageIndex].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'center' 
            });
        }
        
        // Update counter
        currentImageEl.textContent = (currentImageIndex + 1).toString();
    }
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
        }
    });
    
    // Auto slideshow (uncomment if you want this feature)

    let slideshowInterval = setInterval(() => {
        if (!isLoading) {
            showImage(currentImageIndex + 1);
        }
    }, 5000);
    
    // Pause slideshow when hovering over the gallery
    gallery.addEventListener('mouseenter', () => {
        clearInterval(slideshowInterval);
    });
    
    // Resume slideshow when mouse leaves
    gallery.addEventListener('mouseleave', () => {
        slideshowInterval = setInterval(() => {
            if (!isLoading) {
                showImage(currentImageIndex + 1);
            }
        }, 5000);
    });

    
    // Add jump-to functionality
    const jumpToInput = document.getElementById('jumpToInput');
    const jumpToBtn = document.getElementById('jumpToBtn');
    const totalImagesHeader = document.getElementById('totalImagesHeader');
    
    // Update the total images display in header
    if (totalImagesHeader) {
        totalImagesHeader.textContent = TOTAL_IMAGES.toString();
    }
    
    // Handle jump to specific image
    if (jumpToBtn && jumpToInput) {
        jumpToBtn.addEventListener('click', () => {
            const targetImage = parseInt(jumpToInput.value);
            if (targetImage && targetImage >= 1 && targetImage <= images.length) {
                showImage(targetImage - 1); // Convert from 1-based to 0-based index
                jumpToInput.value = '';
            }
        });
        
        // Also handle Enter key press
        jumpToInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                jumpToBtn.click();
            }
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Create and manage particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const colors = [
            'rgba(168, 81, 110, 0.5)', // Pink
            'rgba(212, 165, 165, 0.4)', // Light pink
            'rgba(240, 208, 208, 0.4)', // Very light pink
            'rgba(255, 255, 255, 0.5)', // White
            'rgba(124, 77, 105, 0.3)'  // Dark pink
        ];
        
        // Number of particles based on screen size
        const width = window.innerWidth;
        const numberOfParticles = width < 768 ? 50 : 100;
        
        // Create particles
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Randomly choose between different particle types
            const particleType = Math.random() > 0.7 ? 
                (Math.random() > 0.5 ? 'heart' : 'star') : 'circle';
            particle.classList.add(particleType);
            
            // Random properties
            const size = particleType === 'heart' ? 
                (Math.random() * 15 + 10) : (Math.random() * 6 + 2);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Duration and delay
            const duration = Math.random() * 60 + 30;
            const delay = Math.random() * 20;
            
            // Apply styles
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background-color: ${particleType === 'circle' ? color : 'transparent'};
                left: ${left}%;
                top: ${top}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.7 + 0.3};
                box-shadow: 0 0 ${Math.random() * 10 + 5}px ${color};
            `;
            
            // Special styles for heart and star particles
            if (particleType === 'heart') {
                particle.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${encodeURIComponent(color)}" d="M50 90 C100 65 100 25 75 10 C60 0 50 10 50 20 C50 10 40 0 25 10 C0 25 0 65 50 90 Z"/></svg>')`;
                particle.style.backgroundSize = 'contain';
            } else if (particleType === 'star') {
                particle.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${encodeURIComponent(color)}" d="M50 0 L63 38 H100 L69 61 L82 100 L50 76 L18 100 L31 61 L0 38 H37 Z"/></svg>')`;
                particle.style.backgroundSize = 'contain';
            }
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Recreate particles occasionally to keep the animation fresh
    setInterval(function() {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            createParticles();
        }
    }, 60000); // Refresh every minute
    
    // Add additional particles occasionally
    setInterval(function() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        // Add a few new particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle', 'heart');
            
            const size = Math.random() * 20 + 15;
            const color = 'rgba(168, 81, 110, 0.6)';
            const left = Math.random() * 100;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${encodeURIComponent(color)}" d="M50 90 C100 65 100 25 75 10 C60 0 50 10 50 20 C50 10 40 0 25 10 C0 25 0 65 50 90 Z"/></svg>');
                background-size: contain;
                left: ${left}%;
                top: 110%;
                animation: floatUp 30s linear forwards;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }, 10000);
});
