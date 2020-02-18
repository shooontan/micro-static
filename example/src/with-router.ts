import { send, RequestHandler } from 'micro';
import { router, get } from 'microrouter';
import { microStatic } from '../../dist/index';

const hello: RequestHandler = (req, res) =>
  // @ts-ignore
  send(res, 200, `Hello ${req.params.name}`);

const notfound: RequestHandler = (_, res) => send(res, 404, 'Not found route');

export default router(
  microStatic('public'),
  get('/hello/:name', hello),
  notfound
);
