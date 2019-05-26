import express from 'express';
import path from 'path';
import helmet from 'helmet';
import index from './routes/index';
import domainLookup from './routes/domain-lookup';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add some security-related headers to the response
app.use(helmet());

app.use('/', index);
app.use('/*', domainLookup);

export default app;
