const express = require('express');
const cors = require('cors')

const app = express();
const env = process.env;
const port = env.PORT || 6066;

app.use(express.json())
app.use(cors())

// db connection
require('./src/database/connection')

// routing
require('./src/api')(app);

app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port} \n`)
})