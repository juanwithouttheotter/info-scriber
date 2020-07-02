const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = 9000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
//making the folder staticly availble
app.use(express.static('public'));
apiRoutes.route(app,fs);
htmlRoutes(app);

app.listen(PORT, () => console.log (`API is listening to port ${PORT}`));