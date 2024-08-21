// Contains helper functions for formatting data or other reusable utilities
module.exports = {
    // Format a date as MM/DD/YYYY
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    
    // Format a date and time as MM/DD/YYYY HH:mm:ss
    format_date_time: (date) => {
      return date.toLocaleString();
    },
  
    // Trim a string and add "..." if it exceeds a certain length
    truncate_text: (text, length) => {
      if (text.length > length) {
        return text.substring(0, length) + '...';
      }
      return text;
    },
  
    // Convert a rating number to stars (★) for visual representation
    rating_stars: (rating) => {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
      }
      return stars;
    },
  
    // Capitalize the first letter of a string
    capitalize: (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  };
  