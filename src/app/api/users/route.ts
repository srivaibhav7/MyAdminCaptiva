import { NextResponse } from 'next/server';
import { initialUsers } from '@/lib/data';

// In a real application, this data would come from a database.
// For this demo, we'll use the static data from `lib/data.ts`
// and simulate state changes on the client side only.

export async function GET() {
  // The API always returns the initial static list.
  // The client-side state will manage additions/deletions for the demo.
  return NextResponse.json(initialUsers);
}
