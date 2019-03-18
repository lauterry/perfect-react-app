import app from "./app";

const PORT = process.env.PORT || 9000;

app.listen(PORT, function() {
	console.log(`✓ Listening on port ${PORT}`); // eslint-disable-line no-console
});
