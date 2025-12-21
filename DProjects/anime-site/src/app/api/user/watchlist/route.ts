import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/user/watchlist - Get user's watchlist
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Avtorizatsiya talab qilinadi' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: Record<string, unknown> = { userId: session.user.id };

    if (status) {
      where.status = status.toUpperCase();
    }

    const watchlist = await prisma.watchlist.findMany({
      where,
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
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/user/watchlist - Add to watchlist
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Avtorizatsiya talab qilinadi' }, { status: 401 });
    }

    const { animeId, status = 'PLAN_TO_WATCH' } = await request.json();

    if (!animeId) {
      return NextResponse.json({ error: 'animeId talab qilinadi' }, { status: 400 });
    }

    // Upsert - create or update
    const watchlist = await prisma.watchlist.upsert({
      where: {
        userId_animeId: {
          userId: session.user.id,
          animeId,
        },
      },
      update: { status },
      create: {
        userId: session.user.id,
        animeId,
        status,
      },
      include: {
        anime: true,
      },
    });

    return NextResponse.json(watchlist, { status: 201 });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// PUT /api/user/watchlist - Update watchlist status
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Avtorizatsiya talab qilinadi' }, { status: 401 });
    }

    const { animeId, status } = await request.json();

    if (!animeId || !status) {
      return NextResponse.json({ error: 'animeId va status talab qilinadi' }, { status: 400 });
    }

    const watchlist = await prisma.watchlist.update({
      where: {
        userId_animeId: {
          userId: session.user.id,
          animeId,
        },
      },
      data: { status },
      include: {
        anime: true,
      },
    });

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error('Error updating watchlist:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// DELETE /api/user/watchlist - Remove from watchlist
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

    await prisma.watchlist.delete({
      where: {
        userId_animeId: {
          userId: session.user.id,
          animeId,
        },
      },
    });

    return NextResponse.json({ message: 'Ro\'yxatdan o\'chirildi' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
