import { IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import { parse } from 'url';
import send from 'send';

const methods = ['GET', 'HEAD'];

export const microStatic = (root: string) => {
  if (typeof root !== 'string' || !root) {
    throw new Error('root path must be string');
  }

  const opts = {
    root: resolve(root),
  };

  return async (
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<undefined> => {
    return new Promise((resolve, reject) => {
      if (!req.url || !req.method) {
        return resolve();
      }

      if (!methods.includes(req.method)) {
        return resolve();
      }

      const { pathname } = parse(req.url);
      if (!pathname || pathname === '/') {
        return resolve();
      }

      const stream = send(req, pathname, opts);

      stream.on('error', error => {
        if (error.statusCode < 500) {
          return resolve();
        }
        return reject(error);
      });

      return stream.pipe(res);
    });
  };
};
