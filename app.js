const express = require("express");
require("./conntion");
const Routerss = require("./router")
const Upload_router = require("./upload_router")

const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
// app.use(cors());
app.use(express.json());

app.use(Routerss)
app.use('/image', express.static('./uploads/img'));
app.use(Upload_router)



app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
})