const open = require('open');

const app = require('./app');

const port = 80;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    open(`http://localhost:${port}`);
});