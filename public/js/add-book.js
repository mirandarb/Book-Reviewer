const newBookFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#book-title').value.trim();
    const author = document.querySelector('#book-author').value.trim();
    const description = document.querySelector('#book-description').value.trim();
  
    if (title && author && description) {
      try {
        const response = await fetch('/api/books', {
          method: 'POST',
          body: JSON.stringify({ title, author, description }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/');
        } else {
          const errorData = await response.json();
          alert(`Failed to add book. ${errorData.message || ''}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the book.');
      }
    } else {
      alert('Please fill out all fields');
    }
  };
  
  document
    .querySelector('.new-book-form')
    .addEventListener('submit', newBookFormHandler);