import express from 'express';
import bodyParser from 'body-parser';
import json2csv from 'express-json2csv';

import routes from './routes';

const app = express();

app.use(json2csv);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

const listener = app.listen(3000, () => console.log('Server listening on port 3000'));

export default listener;
