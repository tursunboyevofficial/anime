import aiosqlite
from datetime import datetime
from config import DATABASE_PATH


async def init_db():
    """Database va jadvallarni yaratish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Animellar jadvali
        await db.execute("""
            CREATE TABLE IF NOT EXISTS animes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                name_uz TEXT,
                description TEXT,
                genre TEXT,
                year INTEGER,
                episodes_count INTEGER DEFAULT 0,
                poster_file_id TEXT,
                status TEXT DEFAULT 'ongoing',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Qismlar jadvali
        await db.execute("""
            CREATE TABLE IF NOT EXISTS episodes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                anime_id INTEGER NOT NULL,
                episode_number INTEGER NOT NULL,
                title TEXT,
                video_file_id TEXT NOT NULL,
                duration TEXT,
                quality TEXT DEFAULT '1080p',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (anime_id) REFERENCES animes (id) ON DELETE CASCADE
            )
        """)

        # Foydalanuvchilar jadvali
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                telegram_id INTEGER UNIQUE NOT NULL,
                username TEXT,
                first_name TEXT,
                joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Ko'rishlar jadvali
        await db.execute("""
            CREATE TABLE IF NOT EXISTS views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                episode_id INTEGER NOT NULL,
                watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (episode_id) REFERENCES episodes (id)
            )
        """)

        await db.commit()


# ============== FOYDALANUVCHI FUNKSIYALARI ==============

async def add_user(telegram_id: int, username: str = None, first_name: str = None):
    """Yangi foydalanuvchi qo'shish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            INSERT OR IGNORE INTO users (telegram_id, username, first_name)
            VALUES (?, ?, ?)
        """, (telegram_id, username, first_name))
        await db.commit()


async def update_user_activity(telegram_id: int):
    """Foydalanuvchi faolligini yangilash"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            UPDATE users SET last_active = ? WHERE telegram_id = ?
        """, (datetime.now(), telegram_id))
        await db.commit()


async def get_user(telegram_id: int):
    """Foydalanuvchi ma'lumotlarini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM users WHERE telegram_id = ?", (telegram_id,)
        ) as cursor:
            return await cursor.fetchone()


async def get_users_count():
    """Jami foydalanuvchilar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("SELECT COUNT(*) FROM users") as cursor:
            result = await cursor.fetchone()
            return result[0]


async def get_all_users():
    """Barcha foydalanuvchilarni olish (broadcast uchun)"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("SELECT telegram_id FROM users") as cursor:
            return await cursor.fetchall()


# ============== ANIME FUNKSIYALARI ==============

async def add_anime(
    name: str,
    name_uz: str = None,
    description: str = None,
    genre: str = None,
    year: int = None,
    poster_file_id: str = None,
    status: str = "ongoing"
):
    """Yangi anime qo'shish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("""
            INSERT INTO animes (name, name_uz, description, genre, year, poster_file_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (name, name_uz, description, genre, year, poster_file_id, status))
        await db.commit()
        return cursor.lastrowid


async def update_anime(anime_id: int, **kwargs):
    """Anime ma'lumotlarini yangilash"""
    if not kwargs:
        return

    fields = ", ".join([f"{k} = ?" for k in kwargs.keys()])
    values = list(kwargs.values()) + [anime_id]

    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute(f"""
            UPDATE animes SET {fields} WHERE id = ?
        """, values)
        await db.commit()


async def delete_anime(anime_id: int):
    """Animeni o'chirish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("DELETE FROM animes WHERE id = ?", (anime_id,))
        await db.commit()


async def get_anime(anime_id: int):
    """Anime ma'lumotlarini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM animes WHERE id = ?", (anime_id,)
        ) as cursor:
            return await cursor.fetchone()


async def get_all_animes(page: int = 1, per_page: int = 10):
    """Barcha animalarni sahifalab olish"""
    offset = (page - 1) * per_page
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT * FROM animes ORDER BY created_at DESC LIMIT ? OFFSET ?
        """, (per_page, offset)) as cursor:
            return await cursor.fetchall()


async def get_animes_count():
    """Jami animellar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("SELECT COUNT(*) FROM animes") as cursor:
            result = await cursor.fetchone()
            return result[0]


async def search_animes(query: str):
    """Anime qidirish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT * FROM animes
            WHERE name LIKE ? OR name_uz LIKE ?
            ORDER BY name
            LIMIT 20
        """, (f"%{query}%", f"%{query}%")) as cursor:
            return await cursor.fetchall()


async def get_animes_by_genre(genre: str, page: int = 1, per_page: int = 10):
    """Janr bo'yicha animellarni olish"""
    offset = (page - 1) * per_page
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT * FROM animes
            WHERE genre LIKE ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        """, (f"%{genre}%", per_page, offset)) as cursor:
            return await cursor.fetchall()


async def get_animes_count_by_genre(genre: str):
    """Janr bo'yicha animellar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("""
            SELECT COUNT(*) FROM animes WHERE genre LIKE ?
        """, (f"%{genre}%",)) as cursor:
            result = await cursor.fetchone()
            return result[0]


async def get_popular_animes(limit: int = 10):
    """Eng mashhur animellarni olish (ko'rishlar bo'yicha)"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT a.*, COUNT(v.id) as view_count
            FROM animes a
            LEFT JOIN episodes e ON a.id = e.anime_id
            LEFT JOIN views v ON e.id = v.episode_id
            GROUP BY a.id
            ORDER BY view_count DESC
            LIMIT ?
        """, (limit,)) as cursor:
            return await cursor.fetchall()


async def get_latest_animes(limit: int = 10):
    """Eng yangi animellarni olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT * FROM animes ORDER BY created_at DESC LIMIT ?
        """, (limit,)) as cursor:
            return await cursor.fetchall()


# ============== QISM FUNKSIYALARI ==============

async def add_episode(
    anime_id: int,
    episode_number: int,
    video_file_id: str,
    title: str = None,
    duration: str = None,
    quality: str = "1080p"
):
    """Yangi qism qo'shish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        cursor = await db.execute("""
            INSERT INTO episodes (anime_id, episode_number, video_file_id, title, duration, quality)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (anime_id, episode_number, video_file_id, title, duration, quality))

        # Anime qismlar sonini yangilash
        await db.execute("""
            UPDATE animes SET episodes_count = (
                SELECT COUNT(*) FROM episodes WHERE anime_id = ?
            ) WHERE id = ?
        """, (anime_id, anime_id))

        await db.commit()
        return cursor.lastrowid


async def delete_episode(episode_id: int):
    """Qismni o'chirish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # Avval anime_id ni olish
        async with db.execute(
            "SELECT anime_id FROM episodes WHERE id = ?", (episode_id,)
        ) as cursor:
            result = await cursor.fetchone()
            if result:
                anime_id = result[0]

        await db.execute("DELETE FROM episodes WHERE id = ?", (episode_id,))

        # Anime qismlar sonini yangilash
        if result:
            await db.execute("""
                UPDATE animes SET episodes_count = (
                    SELECT COUNT(*) FROM episodes WHERE anime_id = ?
                ) WHERE id = ?
            """, (anime_id, anime_id))

        await db.commit()


async def get_episode(episode_id: int):
    """Qism ma'lumotlarini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM episodes WHERE id = ?", (episode_id,)
        ) as cursor:
            return await cursor.fetchone()


async def get_episode_by_number(anime_id: int, episode_number: int):
    """Anime va qism raqami bo'yicha qismni olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT * FROM episodes
            WHERE anime_id = ? AND episode_number = ?
        """, (anime_id, episode_number)) as cursor:
            return await cursor.fetchone()


async def get_episodes(anime_id: int):
    """Anime qismlarini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute("""
            SELECT * FROM episodes
            WHERE anime_id = ?
            ORDER BY episode_number
        """, (anime_id,)) as cursor:
            return await cursor.fetchall()


async def get_episodes_count():
    """Jami qismlar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("SELECT COUNT(*) FROM episodes") as cursor:
            result = await cursor.fetchone()
            return result[0]


async def get_next_episode_number(anime_id: int):
    """Keyingi qism raqamini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("""
            SELECT MAX(episode_number) FROM episodes WHERE anime_id = ?
        """, (anime_id,)) as cursor:
            result = await cursor.fetchone()
            return (result[0] or 0) + 1


# ============== KO'RISH FUNKSIYALARI ==============

async def add_view(user_telegram_id: int, episode_id: int):
    """Ko'rishni qo'shish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        # User ID olish
        async with db.execute(
            "SELECT id FROM users WHERE telegram_id = ?", (user_telegram_id,)
        ) as cursor:
            result = await cursor.fetchone()
            if not result:
                return
            user_id = result[0]

        await db.execute("""
            INSERT INTO views (user_id, episode_id)
            VALUES (?, ?)
        """, (user_id, episode_id))
        await db.commit()


async def get_views_count():
    """Jami ko'rishlar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("SELECT COUNT(*) FROM views") as cursor:
            result = await cursor.fetchone()
            return result[0]


async def get_today_views_count():
    """Bugungi ko'rishlar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("""
            SELECT COUNT(*) FROM views
            WHERE DATE(watched_at) = DATE('now')
        """) as cursor:
            result = await cursor.fetchone()
            return result[0]


async def get_anime_views_count(anime_id: int):
    """Anime ko'rishlar sonini olish"""
    async with aiosqlite.connect(DATABASE_PATH) as db:
        async with db.execute("""
            SELECT COUNT(*) FROM views v
            JOIN episodes e ON v.episode_id = e.id
            WHERE e.anime_id = ?
        """, (anime_id,)) as cursor:
            result = await cursor.fetchone()
            return result[0]
