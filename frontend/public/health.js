// Health check for Vercel deployment
export const config = {
  runtime: 'edge',
};

export default function handler(request) {
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'Frontend is healthy',
    timestamp: new Date().toISOString(),
    url: request.url,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
