import app from ".";

// Listen
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`local server listening on port ${port}`);
});
