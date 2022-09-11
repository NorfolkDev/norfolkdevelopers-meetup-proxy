/**
 * Proxies a connection to the meetup API, and adds a cross-origin header
 */

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET',
};

export default {
	async fetch(
		request: Request,
	): Promise<Response> {
		// Extract querystring or apply defaults
		const { searchParams } = new URL(request.url);
		let group = searchParams.get('group') ?? 'Norfolk-Developers-NorDev';
		let limit = searchParams.get('limit') ?? 9;

		// Generate the URL to the Meetup API
		const url = `https://api.meetup.com/${group}/events?photo-host=public&page=${limit}`;
		
		const data = await fetch(url);
		const json = await data.json();
		
		return new Response(JSON.stringify(json), {
			headers: {
				...CORS_HEADERS,
				'content-type': 'application/json;charset=UTF-8',
			},
		});
	},
};
