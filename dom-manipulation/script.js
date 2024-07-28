// Array to hold quotes
let quotes = [];

// Load quotes from local storage on page load
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
        showRandomQuote(); // Optionally display a quote when loaded
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;

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
        saveQuotes(); // Save quotes to local storage
        showRandomQuote(); // Optionally display the new quote
    } else {
        alert("Please enter both quote and category.");
    }
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

    const textInput = document.createElement('input');
    textInput.id = 'newQuoteText';
    textInput.type = 'text';
    textInput.placeholder = 'Enter a new quote';
    
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
    
    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
    
    document.body.appendChild(formContainer);
}

// Function to export quotes as JSON
function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes = importedQuotes;
            saveQuotes();
            showRandomQuote(); // Optionally display a quote
            alert('Quotes imported successfully!');
        } catch (e) {
            alert('Failed to import quotes. Invalid JSON format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Create the add quote form and import/export buttons on page load
function initialize() {
    createAddQuoteForm();

    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes as JSON';
    exportButton.addEventListener('click', exportToJson);

    const importFileInput = document.createElement('input');
    importFileInput.type = 'file';
    importFileInput.id = 'importFile';
    importFileInput.accept = '.json';
    importFileInput.addEventListener('change', importFromJsonFile);

    document.body.appendChild(exportButton);
    document.body.appendChild(importFileInput);

    loadQuotes(); // Load quotes from local storage
}

// Add event listener to "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize the app
initialize();
