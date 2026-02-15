import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Esto limpia el cache manualmente
    // Usamos 'as any' solo si el editor sigue molestando con el color rojo
    (revalidateTag as any)('posts');
    (revalidateTag as any)('pages');

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) }, 
      { status: 500 }
    );
  }
}