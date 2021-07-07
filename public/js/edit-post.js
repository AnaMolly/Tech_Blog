const editPostFormHandler = async (event) => {
    event.preventDefault();
    const post_title = document.querySelector('#post-title-edit').value.trim();
    const post_content = document.querySelector('#post-content-edit').value.trim();
    const postID=document.querySelector('.edit-post-but').getAttribute("id");

    console.log(post_title)
      const response = await fetch(`/api/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ post_title, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      }
  };

const deletePostFormHandler = async (event) => {
    event.preventDefault();
    const postID=document.querySelector('.edit-post-but').getAttribute("id");

      const response = await fetch(`/api/post/${postID}`, {
        method: 'DELETE',
        body: JSON.stringify({ postID }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      }
  };

  document
  .querySelector('.edit-post-but')
  .addEventListener('submit', editPostFormHandler);

  document
  .querySelector('.delete-but')
  .addEventListener('submit', deletePostFormHandler);