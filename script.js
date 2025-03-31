const hiraganaToggle = document.getElementById('hiragana-toggle');
const katakanaToggle = document.getElementById('katakana-toggle');
const romajiToggle = document.getElementById('romaji-toggle');
const originsToggle = document.getElementById('origins-toggle');
const kanaGrid = document.getElementById('kana-grid');
const kanaButtons = kanaGrid.querySelectorAll('.kana-button'); // Select only buttons, not placeholders

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

// Initial check for script visibility
ensureOneScriptVisible();