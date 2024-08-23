document.addEventListener('DOMContentLoaded', () => {
  const addReviewBtn = document.getElementById('add-review-btn');
  const reviewForm = document.getElementById('review-form');
  const newReviewForm = document.getElementById('new-review-form');
  const reviewsContainer = document.querySelector('.reviews-container');
  const reviewCountElement = document.querySelector('.review-count');

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
          const newReview = await response.json();
          addReviewToPage(newReview);
          newReviewForm.reset();
          reviewForm.style.display = 'none';
          displayMessage('Review added successfully!', 'success');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add review');
        }
      } catch (error) {
        console.error('Error:', error);
        displayMessage(error.message || 'An error occurred while submitting the review. Please try again.', 'error');
      }
    });
  }

  function addReviewToPage(review) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.innerHTML = `
      <p><strong>Rating:</strong> ${review.rating}/5</p>
      <p><strong>Review:</strong> ${review.content}</p>
      <p><strong>By:</strong> ${review.user ? review.user.name : 'Anonymous'}</p>
    `;
    
    reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild);

    // Update review count
    const currentCount = parseInt(reviewCountElement.textContent.split(' ')[0]) || 0;
    reviewCountElement.textContent = `${currentCount + 1} Reviews`;
  }

  function displayMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    newReviewForm.prepend(messageElement);
    setTimeout(() => messageElement.remove(), 5000); // Remove after 5 seconds
  }
});