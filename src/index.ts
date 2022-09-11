/**
 * Proxies a connection to the meetup API, and adds a cross-origin header
 */

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET',
};

// Type definitions for the available kv_namespaces bound in wrangler.toml
export interface Env {
	SECRETS: KVNamespace
}

export default {
	async fetch(
		request: Request,
		env: Env
	): Promise<Response> {
		// Grab the allowable groups
		const whitelist = await env.SECRETS.get('whitelist');

		// Extract querystring or apply defaults
		const { searchParams } = new URL(request.url);
		let group = searchParams.get('group') ?? 'Norfolk-Developers-NorDev';
		let limit = searchParams.get('limit') ?? 9;

		// Validate request
		if (!whitelist?.split(',').includes(group)) {
			return new Response(JSON.stringify({ Error: `${group} is not enabled!` }), {
				status: 403,
				headers: {
					...CORS_HEADERS,
					'content-type': 'application/json;charset=UTF-8',
				},
			});
		}

		// Generate the URL to the Meetup API
		const url = `https://api.meetup.com/${group}/events?photo-host=public&page=${limit}`;

		const response = await fetch(url);

		return new Response(response.body, {
			...response,
			headers: {
				...response.headers,
				...CORS_HEADERS,
			},
		});
	},
};
