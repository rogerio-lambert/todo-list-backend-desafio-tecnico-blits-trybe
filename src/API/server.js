const app = require('./app');

require('dotenv');

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
