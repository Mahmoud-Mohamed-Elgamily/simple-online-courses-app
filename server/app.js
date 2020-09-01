const express = require('express');

const app = express();
const env = process.env;
const port = env.PORT || 6066;

//db connection
require('./src/database/connection')

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})