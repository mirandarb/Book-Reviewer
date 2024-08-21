document.addEventListener('DOMContentLoaded', () => {
    const addReviewBtn = document.getElementById('add-review-btn');
    const reviewForm = document.getElementById('review-form');
    const newReviewForm = document.getElementById('new-review-form');
  
    if (addReviewBtn) {
      addReviewBtn.addEventListener('click', () => {
        reviewForm.style.display = 'block';
      });
    }
  
    if (newReviewForm) {
      newReviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookId = document.getElementById('book-id-input').value;
        const rating = document.getElementById('rating').value;
        const content = document.getElementById('review-content').value;
  
        try {
          const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_id: bookId, rating, content }),
          });
  
          if (response.ok) {
            alert('Review added successfully!');
            location.reload(); // Reload the page to show the new review
          } else {
            alert('Failed to add review.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while submitting the review.');
        }
      });
    }
  });