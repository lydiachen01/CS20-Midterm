document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('posts');

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(postForm);
        fetch('create_post.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }

                // Update posts container with new post
                const postElement = document.createElement('div');
                postElement.textContent = `${data.username}: ${data.title} - ${data.content}`;
                postsContainer.appendChild(postElement);

                // Clear the form
                postForm.reset();
            })
            .catch(error => console.error('Error:', error));
    });

    // Fetch initial posts (if any)
    fetch('fetch_posts.php')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.textContent = `${post.username}: ${post.title} - ${post.content}`;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
