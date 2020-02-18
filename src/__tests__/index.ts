import { Server } from 'http';
import { join } from 'path';
import micro from 'micro';
import listen from 'test-listen';
import fetch from 'node-fetch';
import { microStatic } from '../index';

let app: Server;
let url: string;

beforeAll(async () => {
  const fixtures = join(__dirname, 'fixtures');
  app = micro(microStatic(fixtures));
  url = await listen(app);
});

afterAll(() => {
  app.close();
});

describe('option', () => {
  test('root', () => {
    expect(() => microStatic('public')).not.toThrow();
    // @ts-ignore
    expect(() => microStatic()).toThrow();
    expect(() => microStatic('')).toThrow();
  });
});

describe('request', () => {
  test('text/plain', async () => {
    const { headers } = await fetch(`${url}/name.txt`);
    expect(headers.get('content-type')).toBe('text/plain; charset=UTF-8');
  });

  test('text/html', async () => {
    const { headers } = await fetch(`${url}/name.html`);
    expect(headers.get('content-type')).toBe('text/html; charset=UTF-8');
  });

  test('text/jpg', async () => {
    const { headers } = await fetch(`${url}/img.jpg`);
    expect(headers.get('content-type')).toBe('image/jpeg');
  });

  test('text/png', async () => {
    const { headers } = await fetch(`${url}/img.png`);
    expect(headers.get('content-type')).toBe('image/png');
  });
});

describe('no request', () => {
  test('POST', async () => {
    await expect(
      fetch(`${url}/name.txt`, {
        method: 'POST',
        timeout: 5,
      })
    ).rejects.toThrow();
  });

  test('404', async () => {
    await expect(
      fetch(`${url}/404.txt`, {
        timeout: 5,
      })
    ).rejects.toThrow();
  });
});
