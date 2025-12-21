import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/genres - Get all genres
export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      include: {
        _count: {
          select: { animes: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/genres - Create genre (admin only)
export async function POST(request: NextRequest) {
  try {
    const { name, icon, description } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'name talab qilinadi' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const genre = await prisma.genre.create({
      data: {
        name,
        slug,
        icon,
        description,
      },
    });

    return NextResponse.json(genre, { status: 201 });
  } catch (error) {
    console.error('Error creating genre:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
