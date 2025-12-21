import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/user/favorites - Get user's favorites
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Avtorizatsiya talab qilinadi' }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        anime: {
          include: {
            genres: {
              include: {
                genre: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/user/favorites - Add to favorites
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Avtorizatsiya talab qilinadi' }, { status: 401 });
    }

    const { animeId } = await request.json();

    if (!animeId) {
      return NextResponse.json({ error: 'animeId talab qilinadi' }, { status: 400 });
    }

    // Check if already in favorites
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_animeId: {
          userId: session.user.id,
          animeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'Allaqachon sevimlilarda' }, { status: 400 });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        animeId,
      },
      include: {
        anime: true,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/favorites - Remove from favorites
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Avtorizatsiya talab qilinadi' }, { status: 401 });
    }

    const { animeId } = await request.json();

    if (!animeId) {
      return NextResponse.json({ error: 'animeId talab qilinadi' }, { status: 400 });
    }

    await prisma.favorite.delete({
      where: {
        userId_animeId: {
          userId: session.user.id,
          animeId,
        },
      },
    });

    return NextResponse.json({ message: 'Sevimlilardan o\'chirildi' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
