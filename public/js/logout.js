// Manages user logout
// Handle logout
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); // Redirect to homepage after logout
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  