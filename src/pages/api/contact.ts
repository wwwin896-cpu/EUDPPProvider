import type { APIRoute } from 'astro';

export const prerender = false; // Note: on static output, this will serve as documentation or client fallback

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, company, batteryType, message } = data;

    if (!email || !name) {
      return new Response(JSON.stringify({ success: false, error: 'Name and email are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Reference ID generated for audit
    const refId = `INQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return new Response(JSON.stringify({
      success: true,
      refId,
      message: 'Inquiry received successfully. Our compliance engineering team will respond within 24 business hours.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Invalid submission' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
