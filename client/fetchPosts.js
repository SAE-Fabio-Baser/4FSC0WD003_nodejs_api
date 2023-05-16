fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((postsResult) => {
        postsResult.posts.forEach((post) => {
            const elem = document.createElement("blog-post");
            elem.setAttribute("title", post.title);
            elem.setAttribute("summary", post.summary);
            document.body.append(elem);
        });
    });
