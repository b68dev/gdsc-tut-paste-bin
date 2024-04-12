import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import route from './routes/paste.routes.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/p", route);

app.use("*", (req, res) => {
    res.status(404).send('Not Found');
})

app.listen(port, () => {
  console.log('Server running on port ' + port);
});