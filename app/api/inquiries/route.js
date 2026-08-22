import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const TOPICS = ['sell', 'buy', 'boosting', 'partnership', 'other'];
const rateLimitMap = new Map();

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const limit = 10;

  if (rateLimitMap.size >= 10000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.startTime > windowMs) rateLimitMap.delete(key);
    }
    if (rateLimitMap.size >= 10000) rateLimitMap.clear();
  }

  const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, startTime: now };
  if (now - rateLimitInfo.startTime > windowMs) {
    rateLimitInfo.count = 1;
    rateLimitInfo.startTime = now;
  } else {
    rateLimitInfo.count++;
  }
  rateLimitMap.set(ip, rateLimitInfo);

  if (rateLimitInfo.count > limit) {
    return NextResponse.json({ error: 'Too many inquiries sent. Please try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const { topic, name, email, message } = body;

  if (!TOPICS.includes(topic)) {
    return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
  }
  if (typeof name !== 'string' || !name.trim() || name.length > 100) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return NextResponse.json({ error: 'Message is required (max 2000 characters)' }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      topic,
      name: name.trim(),
      email: email.trim(),
      messages: {
        create: { sender: 'user', body: message.trim() },
      },
    },
  });

  return NextResponse.json({ id: inquiry.id, token: inquiry.contactToken }, { status: 201 });
}
