let quotes = [];
const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL
const syncInterval = 60000; // 60 seconds for periodic sync

// Load quotes and last selected category from local storage on page load
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    const lastCategory = localStorage.getItem('lastCategory');
    
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
        showRandomQuote(); // Optionally display a quote
        populateCategories();
    }
    
    if (lastCategory) {
        document.getElementById('categoryFilter').value = lastCategory;
        filterQuotes(); // Apply the last selected filter
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Fetch quotes from the server and handle data
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl); // Fetch quotes from mock API
        const serverQuotes = await response.json();
        handleServerResponse(serverQuotes);
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}

// Handle server response and resolve conflicts
function handleServerResponse(serverQuotes) {
    const newQuotes = serverQuotes.map(quote => ({
        text: quote.title, // Mapping server response to our quote format
        category: 'General' // Default category for simulation
    }));

    // Conflict resolution: Server data takes precedence
    quotes = newQuotes;
    saveQuotes();
    populateCategories(); // Update categories dropdown
    showRandomQuote(); // Optionally display a quote
    notifyUser('Data updated from server.'); // Notify user of update
}

// Function to sync quotes with the server periodically
function syncQuotes() {
    fetchQuotesFromServer(); // Initial fetch
    setInterval(fetchQuotesFromServer, syncInterval); // Periodic fetch
}

// Notify user with an alert (or UI element)
function notifyUser(message) {
    alert(message); // Simple alert for notification
}

// Function to show a random quote
function showRandomQuote() {
    const filter = document.getElementById('categoryFilter').value;
    const filteredQuotes = filter === 'all' ? quotes : quotes.filter(quote => quote.category === filter);

    if (filteredQuotes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
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
        populateCategories(); // Update categories dropdown
        showRandomQuote(); // Optionally display the new quote
    } else {
        alert("Please enter both quote and category.");
    }
}

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));
    
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset filter options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategory', selectedCategory); // Save last selected filter
    showRandomQuote(); // Apply filter to displayed quotes
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
            populateCategories(); // Update categories dropdown
            showRandomQuote(); // Optionally display a quote
            notifyUser('Quotes imported successfully!');
        } catch (e) {
            notifyUser('Failed to import quotes. Invalid JSON format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize the application
function initialize() {
    document.getElementById("exportQuotes").addEventListener("click", exportToJson);
    document.getElementById("importFile").addEventListener("change", importFromJsonFile);

    loadQuotes(); // Load quotes and last selected filter
    syncQuotes(); // Start syncing with the server
}

// Add event listener to "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize the app
initialize();
