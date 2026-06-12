import { NextResponse } from 'next/server';

const HF_SPACE = 'https://dylanJM-career-conversation.hf.space';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const submitRes = await fetch(`${HF_SPACE}/gradio_api/call/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [message] }),
    });

    if (!submitRes.ok) {
      throw new Error(`Submit failed: ${submitRes.status}`);
    }

    const { event_id } = await submitRes.json();

    const pollRes = await fetch(`${HF_SPACE}/gradio_api/call/chat/${event_id}`);

    if (!pollRes.ok) {
      throw new Error(`Poll failed: ${pollRes.status}`);
    }

    const text = await pollRes.text();

    // Parse SSE — find the "complete" event
    const lines = text.split('\n');
    let reply: string | null = null;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === 'event: complete' && lines[i + 1]?.startsWith('data: ')) {
        try {
          const parsed = JSON.parse(lines[i + 1].slice(6));
          const data = parsed?.data?.[0];
          reply = typeof data === 'string' ? data : JSON.stringify(data);
        } catch {
          // ignore parse error
        }
        break;
      }
    }

    return NextResponse.json({
      reply: reply ?? "Sorry, I couldn't generate a response. Please try again.",
    });
  } catch {
    return NextResponse.json({
      reply: "I'm having trouble connecting right now. Please try again in a moment.",
    });
  }
}
