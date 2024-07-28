document.addEventListener('DOMContentLoaded', (event) => {
    // Array of quote objects
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "The purpose of our lives is to be happy.", category: "Life" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" }
    ];

    // DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');

    // Function to show a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
    }

    // Function to add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;

        if (newQuoteText !== "" && newQuoteCategory !== "") {
            quotes.push({ text: newQuoteText, category: newQuoteCategory });
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';
        } else {
            alert("Please enter both a quote and a category.");
        }
    }

    // Event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    document.getElementById('addQuote').addEventListener('click', addQuote);
});
