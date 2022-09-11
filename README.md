# Meetup Proxy

A Cloudflare Worker that proxies requests to the Meetup API and adds a
cross-origin header to allow fetches from the web.

## Development

Use Cloudflare's wrangler cli to launch a development server.

```
npm install
npx wrangler dev
```

Note: You can use the "local mode" to avoid logging into an account.


## Deployment

Use Cloudflare's wrangler cli to deploy.

```
npx wrangler publish
```