export default function(server) {
    server.get("/users", (_req, res) => {
        res.sendStatus(200);
    });
}
