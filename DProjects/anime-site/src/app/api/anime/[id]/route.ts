import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/anime/[id] - Get single anime
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const anime = await prisma.anime.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        episodesList: {
          orderBy: { number: 'asc' },
        },
        _count: {
          select: {
            favorites: true,
            comments: true,
          },
        },
      },
    });

    if (!anime) {
      return NextResponse.json({ error: 'Anime topilmadi' }, { status: 404 });
    }

    // Increment views
    await prisma.anime.update({
      where: { id: anime.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(anime);
  } catch (error) {
    console.error('Error fetching anime:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// PUT /api/anime/[id] - Update anime (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const anime = await prisma.anime.update({
      where: { id },
      data: body,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return NextResponse.json(anime);
  } catch (error) {
    console.error('Error updating anime:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/anime/[id] - Delete anime (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.anime.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Anime o\'chirildi' });
  } catch (error) {
    console.error('Error deleting anime:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
