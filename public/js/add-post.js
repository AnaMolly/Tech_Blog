const addPostFormHandler = async (event) => {
    event.preventDefault();
    const post_title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
    console.log(post_title)
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ post_title, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      }
  };

  document
  .querySelector('.add-post-but')
  .addEventListener('submit', addPostFormHandler);