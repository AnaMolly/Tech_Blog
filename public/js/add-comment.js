const addCommentFormHandler = async (event) => {
    event.preventDefault();
    const comment_content = document.querySelector('#comment-content').value.trim();
    const post_id = document.querySelector('.title').getAttribute("id")
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({comment_content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.reload();
      }
  };

  document
  .querySelector('.comment-form')
  .addEventListener('submit', addCommentFormHandler);