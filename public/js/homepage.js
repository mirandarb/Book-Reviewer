document.addEventListener('DOMContentLoaded', () => {
    const searchBooksBtn = document.getElementById('search-books-btn');
    const addBookBtn = document.getElementById('add-book-btn');
    const searchContainer = document.getElementById('search-container');
    const addBookForm = document.getElementById('add-book-form');
    const bookSearch = document.getElementById('book-search');
    const searchResults = document.getElementById('search-results');
    const searchSubmit = document.getElementById('search-submit');
  
    searchBooksBtn.addEventListener('click', () => {
      searchContainer.style.display = 'block';
      addBookForm.style.display = 'none';
    });
  
    addBookBtn.addEventListener('click', () => {
      searchContainer.style.display = 'none';
      addBookForm.style.display = 'block';
    });
  
  
    searchSubmit.addEventListener('click', async () => {
      const searchTerm = bookSearch.value.trim();
      if (searchTerm) {
        try {
          const response = await fetch(`/book/${encodeURIComponent(searchTerm)}`);
          if (response.ok) {
            window.location.href = response.url;
          } else {
            alert('No book found with this title. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while searching. Please try again.');
        }
      }
    });
  });