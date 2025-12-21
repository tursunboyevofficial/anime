import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/anime - Get all anime with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'latest';
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const genre = searchParams.get('genre');
    const year = searchParams.get('year');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (type) {
      where.type = type.toUpperCase();
    }

    if (year) {
      where.year = parseInt(year);
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleOriginal: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (genre) {
      where.genres = {
        some: {
          genre: {
            slug: genre,
          },
        },
      };
    }

    // Build orderBy
    let orderBy: Record<string, string> = { createdAt: 'desc' };

    switch (sort) {
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'views':
        orderBy = { views: 'desc' };
        break;
      case 'name':
        orderBy = { title: 'asc' };
        break;
      case 'year':
        orderBy = { year: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [anime, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      }),
      prisma.anime.count({ where }),
    ]);

    return NextResponse.json({
      data: anime,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching anime:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// POST /api/anime - Create new anime (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      titleOriginal,
      description,
      image,
      banner,
      episodes,
      currentEpisode,
      duration,
      year,
      season,
      type,
      status,
      studio,
      source,
      genres,
    } = body;

    if (!title || !image || !year) {
      return NextResponse.json(
        { error: 'Title, image va year majburiy' },
        { status: 400 }
      );
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const anime = await prisma.anime.create({
      data: {
        title,
        titleOriginal,
        slug,
        description,
        image,
        banner,
        episodes: episodes || 0,
        currentEpisode: currentEpisode || 0,
        duration,
        year,
        season,
        type: type || 'TV',
        status: status || 'ONGOING',
        studio,
        source,
        genres: genres
          ? {
              create: genres.map((genreId: string) => ({
                genre: { connect: { id: genreId } },
              })),
            }
          : undefined,
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    console.error('Error creating anime:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
