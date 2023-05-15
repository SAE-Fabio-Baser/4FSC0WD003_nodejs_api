import { v4 as uuidv4 } from "uuid";

export default function(server) {
    const posts = [];

    // READ
    server.get("/posts", (req, res) => {
        const { folder } = req.query;

        let filteredPosts = [];
        if (folder) {
            filteredPosts = posts.filter((post) => post.folder === folder);
        } else {
            filteredPosts = posts.filter((post) => post.folder !== "trash");
        }

        res.send({
            folder: folder ?? "all",
            total: filteredPosts.length,
            posts: filteredPosts,
        });
    });

    // CREATE
    server.post("/posts", (req, res) => {
        const { title, summary, folder } = req.body;

        const created_at = Date.now();

        const newPost = {
            id: uuidv4(),
            title,
            summary,
            folder,
            created_at,
            updated_at: created_at,
        };
        posts.push(newPost);

        res.send(newPost);
    });

    // UPDATE
    server.put("/posts/:id", (req, res) => {
        const { id } = req.params;
        const { title, summary, folder } = req.body;

        const post = posts.find((post) => post.id === id);

        post.title = title;
        post.summary = summary;
        post.folder = folder;
        post.updated_at = Date.now();

        res.send(post);
    });

    // DELETE
    server.delete("/posts/:id", (req, res) => {
        const { id } = req.params;

        const post = posts.find((post) => post.id === id);
        post.folder = "trash";

        res.send(post);
    });

    server.get("/folders", (_req, res) => {
        const folders = new Set();

        posts.forEach((post) => post.folder && folders.add(post.folder));

        res.send({
            total: folders.size,
            folders: Array.from(folders),
        });
    });
}
