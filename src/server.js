import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', routes);

const port = process.env.PORT || 3000;

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Taxi 24 API.'
}));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server is running on PORT:${port}...`));
}

export default app;
