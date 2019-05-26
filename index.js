import express from 'express';
import path from 'path';
import helmet from 'helmet';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add some security-related headers to the response
app.use(helmet());

app.get('/', (req, res, next) => {
  res.send('Hello world!');
});

export default app;
