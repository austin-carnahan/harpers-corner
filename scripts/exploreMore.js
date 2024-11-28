
// Text Entry Functionality
document.getElementById("submit-text").addEventListener("click", () => {
    const input = document.getElementById("text-input").value;
    const display = document.getElementById("text-display");

    if (input.trim()) {
        // Append new text as a new line
        const newLine = document.createElement("p");
        newLine.textContent = input;
        display.appendChild(newLine);

        // Clear the input box
        document.getElementById("text-input").value = "";
    }
});

// Background Color Functionality
document.getElementById("change-color").addEventListener("click", () => {
    const color = document.getElementById("color-input").value;

    if (/^#[0-9A-F]{6}$/i.test(color)) {
        document.body.style.backgroundColor = color;
    } else {
        alert("Please enter a valid hex color code (e.g., #ff5733).");
    }
});

document.getElementById("random-color").addEventListener("click", () => {
    // Generate a random hex color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    document.body.style.backgroundColor = randomColor;
    alert(`Random color: ${randomColor}`);
});


document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('text-input');
    const emojiButton = document.getElementById('emoji-button');
    const emojiPicker = document.getElementById('emoji-picker');

    // Toggle the visibility of the emoji picker when the button is clicked
    emojiButton.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });

    // Handle emoji selection
    emojiPicker.addEventListener('emoji-click', event => {
        inputField.value += event.detail.unicode;
        emojiPicker.style.display = 'none'; // Hide the picker after selection
    });

    // Handle text submission
    const submitButton = document.getElementById('submit-text');
    const textDisplay = document.getElementById('text-display');

    submitButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            textDisplay.appendChild(paragraph);
            inputField.value = ''; // Clear the input field
        }
    });
});