// Array to hold quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    // Add more quotes as needed
];

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");

    // Create elements to display the quote
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = randomQuote.text;
    
    const quoteCategoryElement = document.createElement('span');
    quoteCategoryElement.textContent = ` (${randomQuote.category})`;
    
    // Clear previous quotes
    quoteDisplay.innerHTML = '';
    
    // Append new quote
    quoteDisplay.appendChild(quoteTextElement);
    quoteDisplay.appendChild(quoteCategoryElement);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById("newQuoteText").value = '';
        document.getElementById("newQuoteCategory").value = '';
        displayRandomQuote(); // Optionally display the new quote
    } else {
        alert("Please enter both quote and category.");
    }
}

// Add event listener to "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Add event listener to "Add Quote" button
document.querySelector("button[onclick='addQuote()']").addEventListener("click", addQuote);
