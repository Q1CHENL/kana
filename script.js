const hiraganaToggle = document.getElementById('hiragana-toggle');
const katakanaToggle = document.getElementById('katakana-toggle');
const romajiToggle = document.getElementById('romaji-toggle');
const originsToggle = document.getElementById('origins-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const kanaGrid = document.getElementById('kana-grid');
const kanaButtons = kanaGrid.querySelectorAll('.kana-button');
const navButtons = document.querySelectorAll('.nav-button');
const navSlider = document.querySelector('.nav-slider');

// Initialize the slider position on load
function initializeNavSlider() {
    const activeButton = document.querySelector('.nav-button.active');
    if (activeButton && navSlider) {
        positionSlider(activeButton);
    }
}

// Function to position the slider
function positionSlider(button) {
    navSlider.style.width = `${button.offsetWidth}px`;
    navSlider.style.left = `${button.offsetLeft}px`;
}

// Navigation functionality without slide effects
navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetPageId = this.getAttribute('data-page') + '-page';
        const targetPage = document.getElementById(targetPageId);
        
        // Don't do anything if the clicked page is already active
        if (targetPage.classList.contains('active-page')) return;
        
        // Get currently active button and page
        const currentActiveButton = document.querySelector('.nav-button.active');
        const currentPageId = currentActiveButton.getAttribute('data-page') + '-page';
        const currentPage = document.getElementById(currentPageId);
        
        // Update active button status
        currentActiveButton.classList.remove('active');
        this.classList.add('active');
        
        // Move the slider to the active button
        positionSlider(this);
        
        // Simple display toggle without animations
        currentPage.classList.remove('active-page');
        targetPage.classList.add('active-page');
    });
});

// Function to reset all cards to front face
function resetAllCards() {
    kanaButtons.forEach(button => {
        button.classList.remove('is-flipped');
    });
}

// Function to ensure at least one script is visible
function ensureOneScriptVisible() {
    if (!hiraganaToggle.checked && !katakanaToggle.checked) {
        // If both are unchecked, re-check the one that was just unchecked
        if (event.target === hiraganaToggle) {
            katakanaToggle.checked = true;
        } else {
            hiraganaToggle.checked = true;
        }
    }

    // Update class on grid based on toggle states
    kanaGrid.classList.toggle('hiragana-hidden', !hiraganaToggle.checked);
    kanaGrid.classList.toggle('katakana-hidden', !katakanaToggle.checked);
}

// Script toggle event listeners
hiraganaToggle.addEventListener('change', function (event) {
    ensureOneScriptVisible();
});

katakanaToggle.addEventListener('change', function (event) {
    ensureOneScriptVisible();
});

// --- Switch Logic for Romaji ---
romajiToggle.addEventListener('change', function () {
    if (this.checked) {
        // Show Romaji: Remove class from grid, reset all cards
        kanaGrid.classList.remove('romaji-hidden');
        resetAllCards(); // Reset flips when showing Romaji again
    } else {
        // Hide Romaji: Add class to grid
        kanaGrid.classList.add('romaji-hidden');
        // Note: Cards remain in their last state (flipped or not) until clicked again or reset
    }
});

// --- Card Flip Logic ---
kanaGrid.addEventListener('click', function (event) {
    // Only allow flipping if Romaji is hidden
    if (!kanaGrid.classList.contains('romaji-hidden')) {
        return; // Do nothing if Romaji is visible
    }

    // Find the clicked button (traverse up if needed)
    const clickedButton = event.target.closest('.kana-button');

    // Check if the click was actually on a button and not a placeholder
    if (clickedButton) {
        clickedButton.classList.toggle('is-flipped');
    }
});

// --- Origins Switch Logic ---
originsToggle.addEventListener('change', function () {
    if (this.checked) {
        // Show Origins: Remove class from grid
        kanaGrid.classList.remove('origins-hidden');
    } else {
        // Hide Origins: Add class to grid
        kanaGrid.classList.add('origins-hidden');
    }
});

// --- Dark Mode Toggle Logic ---
darkModeToggle.addEventListener('click', function() {
    // Toggle the dark mode class on the body
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Save the preference to localStorage
    if (isDarkMode) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode preference
function checkDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize settings
function initializeSettings() {
    ensureOneScriptVisible();
    checkDarkModePreference();
    initializeNavSlider(); // Initialize nav slider position
}

// Run initialization when page loads
initializeSettings();

// Also update slider position if window is resized
window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.nav-button.active');
    if (activeButton) {
        positionSlider(activeButton);
    }
});