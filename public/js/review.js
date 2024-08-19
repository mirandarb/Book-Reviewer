// Interacts with the review functionality
// Handle review form submission
const reviewFormHandler = async (event) => {
    event.preventDefault();
  
    const rating = document.querySelector('#review-rating').value.trim();
    const content = document.querySelector('#review-content').value.trim();
    const bookId = document.querySelector('#book-id').value;
  
    if (rating && content) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ rating, content, book_id: bookId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload(); // Reload the page to show the new review
      } else {
        alert('Failed to submit review.');
      }
    }
  };
  
  document
    .querySelector('.review-form')
    .addEventListener('submit', reviewFormHandler);
  