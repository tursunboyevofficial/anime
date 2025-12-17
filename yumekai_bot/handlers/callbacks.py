from aiogram import Router, F, Bot
from aiogram.types import CallbackQuery
from aiogram.fsm.context import FSMContext
import math

import database as db
from config import GENRES, ITEMS_PER_PAGE
from keyboards import (
    main_menu_keyboard,
    catalog_keyboard,
    anime_keyboard,
    episodes_keyboard,
    episode_navigation_keyboard,
    genres_keyboard,
    genre_animes_keyboard,
    popular_keyboard,
    latest_keyboard,
    search_results_keyboard,
    back_to_main_keyboard,
)
from handlers.user import SearchState

callback_router = Router()


# ============== BOSH MENYU ==============

@callback_router.callback_query(F.data == "main_menu")
async def show_main_menu(callback: CallbackQuery, state: FSMContext):
    """Bosh menyuni ko'rsatish"""
    await state.clear()

    # Statistika olish
    animes_count = await db.get_animes_count()
    episodes_count = await db.get_episodes_count()

    text = f"""🌙 <b>YUMEKAI</b> ga xush kelibsiz!

Anime dunyosiga sayohat qiling:

📺 <b>{animes_count}+</b> anime
🎬 <b>{episodes_count}+</b> qism
🇺🇿 O'zbek subtitr
📊 1080p HD sifat

Quyidagi tugmalardan birini tanlang:"""

    await callback.message.edit_text(
        text,
        reply_markup=main_menu_keyboard(),
        parse_mode="HTML"
    )


# ============== KATALOG ==============

@callback_router.callback_query(F.data.startswith("catalog:"))
async def show_catalog(callback: CallbackQuery):
    """Katalogni ko'rsatish"""
    page = int(callback.data.split(":")[1])

    animes = await db.get_all_animes(page=page, per_page=ITEMS_PER_PAGE)
    total = await db.get_animes_count()
    total_pages = math.ceil(total / ITEMS_PER_PAGE) or 1

    if not animes:
        await callback.message.edit_text(
            "😔 Hozircha animellar yo'q.",
            reply_markup=back_to_main_keyboard()
        )
        return

    text = f"🎬 <b>ANIMELLAR</b> | Sahifa {page}/{total_pages}\n\nTanlang:"

    await callback.message.edit_text(
        text,
        reply_markup=catalog_keyboard(animes, page, total_pages),
        parse_mode="HTML"
    )


# ============== ANIME MA'LUMOTLARI ==============

@callback_router.callback_query(F.data.startswith("anime:"))
async def show_anime(callback: CallbackQuery):
    """Anime ma'lumotlarini ko'rsatish"""
    anime_id = int(callback.data.split(":")[1])

    anime = await db.get_anime(anime_id)
    if not anime:
        await callback.answer("❌ Anime topilmadi.", show_alert=True)
        return

    # Foydalanuvchi faolligini yangilash
    await db.update_user_activity(callback.from_user.id)

    # Janrlarni formatlash
    genres_list = []
    if anime["genre"]:
        for g in anime["genre"].split(","):
            g = g.strip()
            if g in GENRES:
                genres_list.append(GENRES[g])
            else:
                genres_list.append(g)
    genres_str = ", ".join(genres_list) if genres_list else "Noma'lum"

    # Status
    status = "🟢 Davom etmoqda" if anime["status"] == "ongoing" else "✅ Tugallangan"

    text = f"""📺 <b>{anime['name']}</b>
{f"🇺🇿 {anime['name_uz']}" if anime['name_uz'] else ""}

📊 <b>Janr:</b> {genres_str}
📅 <b>Yil:</b> {anime['year'] or "Noma'lum"}
🎬 <b>Qismlar:</b> {anime['episodes_count'] or 0}
📌 <b>Status:</b> {status}

━━━━━━━━━━━━━━━━━━

📖 <b>Tavsif:</b>
{anime['description'] or "Tavsif mavjud emas."}"""

    # Poster bilan yuborish
    if anime["poster_file_id"]:
        await callback.message.delete()
        await callback.message.answer_photo(
            photo=anime["poster_file_id"],
            caption=text,
            reply_markup=anime_keyboard(anime_id, anime["episodes_count"] > 0),
            parse_mode="HTML"
        )
    else:
        await callback.message.edit_text(
            text,
            reply_markup=anime_keyboard(anime_id, anime["episodes_count"] > 0),
            parse_mode="HTML"
        )


# ============== QISMLAR RO'YXATI ==============

@callback_router.callback_query(F.data.startswith("episodes:"))
async def show_episodes(callback: CallbackQuery):
    """Qismlar ro'yxatini ko'rsatish"""
    anime_id = int(callback.data.split(":")[1])

    anime = await db.get_anime(anime_id)
    if not anime:
        await callback.answer("❌ Anime topilmadi.", show_alert=True)
        return

    episodes = await db.get_episodes(anime_id)
    if not episodes:
        await callback.answer("❌ Bu animeda hali qismlar yo'q.", show_alert=True)
        return

    text = f"📺 <b>{anime['name']}</b> | Qismlar\n\nKo'rish uchun qism tanlang:"

    # Agar oldingi xabar rasm bo'lsa, yangi xabar yuborish
    try:
        await callback.message.edit_text(
            text,
            reply_markup=episodes_keyboard(anime_id, episodes),
            parse_mode="HTML"
        )
    except Exception:
        await callback.message.delete()
        await callback.message.answer(
            text,
            reply_markup=episodes_keyboard(anime_id, episodes),
            parse_mode="HTML"
        )


# ============== VIDEO KO'RISH ==============

@callback_router.callback_query(F.data.startswith("watch:"))
async def watch_episode(callback: CallbackQuery, bot: Bot):
    """Qismni ko'rish (video yuborish)"""
    parts = callback.data.split(":")
    anime_id = int(parts[1])
    episode_number = int(parts[2])

    anime = await db.get_anime(anime_id)
    episode = await db.get_episode_by_number(anime_id, episode_number)

    if not episode:
        await callback.answer("❌ Qism topilmadi.", show_alert=True)
        return

    # Ko'rishni qayd qilish
    await db.add_view(callback.from_user.id, episode["id"])

    # Jami qismlar soni
    total_eps = anime["episodes_count"]

    caption = f"""🌙 <b>{anime['name']}</b> | {episode_number}-qism

🇺🇿 O'zbek subtitr
⏱ {episode['duration'] or "N/A"} | 📊 {episode['quality'] or "1080p"}"""

    # Video yuborish (video yoki document sifatida)
    file_id = episode["video_file_id"]

    try:
        # Avval video sifatida yuborishga harakat qilish
        await bot.send_video(
            chat_id=callback.from_user.id,
            video=file_id,
            caption=caption,
            reply_markup=episode_navigation_keyboard(anime_id, episode_number, total_eps),
            parse_mode="HTML"
        )
    except Exception:
        # Agar video bo'lmasa, document sifatida yuborish
        await bot.send_document(
            chat_id=callback.from_user.id,
            document=file_id,
            caption=caption,
            reply_markup=episode_navigation_keyboard(anime_id, episode_number, total_eps),
            parse_mode="HTML"
        )

    await callback.answer()


# ============== JANRLAR ==============

@callback_router.callback_query(F.data == "genres")
async def show_genres(callback: CallbackQuery):
    """Janrlarni ko'rsatish"""
    text = "📊 <b>JANRLAR</b>\n\nBirini tanlang:"

    try:
        await callback.message.edit_text(
            text,
            reply_markup=genres_keyboard(),
            parse_mode="HTML"
        )
    except Exception:
        await callback.message.delete()
        await callback.message.answer(
            text,
            reply_markup=genres_keyboard(),
            parse_mode="HTML"
        )


@callback_router.callback_query(F.data.startswith("genre:"))
async def show_genre_animes(callback: CallbackQuery):
    """Janr bo'yicha animellarni ko'rsatish"""
    parts = callback.data.split(":")
    genre = parts[1]
    page = int(parts[2]) if len(parts) > 2 else 1

    animes = await db.get_animes_by_genre(genre, page=page, per_page=ITEMS_PER_PAGE)
    total = await db.get_animes_count_by_genre(genre)
    total_pages = math.ceil(total / ITEMS_PER_PAGE) or 1

    genre_name = GENRES.get(genre, genre)

    if not animes:
        await callback.message.edit_text(
            f"😔 {genre_name} janridagi animellar topilmadi.",
            reply_markup=genres_keyboard()
        )
        return

    text = f"{genre_name} | Sahifa {page}/{total_pages}\n\nTanlang:"

    await callback.message.edit_text(
        text,
        reply_markup=genre_animes_keyboard(genre, animes, page, total_pages),
        parse_mode="HTML"
    )


# ============== MASHHUR / YANGI ==============

@callback_router.callback_query(F.data == "popular")
async def show_popular(callback: CallbackQuery):
    """Mashhur animellarni ko'rsatish"""
    animes = await db.get_popular_animes(limit=10)

    if not animes:
        await callback.message.edit_text(
            "😔 Hozircha animellar yo'q.",
            reply_markup=back_to_main_keyboard()
        )
        return

    text = "🔥 <b>ENG MASHHUR ANIMELLAR</b>\n\nTanlang:"

    try:
        await callback.message.edit_text(
            text,
            reply_markup=popular_keyboard(animes),
            parse_mode="HTML"
        )
    except Exception:
        await callback.message.delete()
        await callback.message.answer(
            text,
            reply_markup=popular_keyboard(animes),
            parse_mode="HTML"
        )


@callback_router.callback_query(F.data == "latest")
async def show_latest(callback: CallbackQuery):
    """Yangi animellarni ko'rsatish"""
    animes = await db.get_latest_animes(limit=10)

    if not animes:
        await callback.message.edit_text(
            "😔 Hozircha animellar yo'q.",
            reply_markup=back_to_main_keyboard()
        )
        return

    text = "⭐ <b>YANGI QO'SHILGAN ANIMELLAR</b>\n\nTanlang:"

    try:
        await callback.message.edit_text(
            text,
            reply_markup=latest_keyboard(animes),
            parse_mode="HTML"
        )
    except Exception:
        await callback.message.delete()
        await callback.message.answer(
            text,
            reply_markup=latest_keyboard(animes),
            parse_mode="HTML"
        )


# ============== QIDIRUV ==============

@callback_router.callback_query(F.data == "search")
async def start_search(callback: CallbackQuery, state: FSMContext):
    """Qidiruvni boshlash"""
    await state.set_state(SearchState.waiting_for_query)

    text = """🔍 <b>Anime nomini yozing:</b>

Misol: "solo" yoki "jujutsu"

Bekor qilish uchun /cancel yozing."""

    try:
        await callback.message.edit_text(text, parse_mode="HTML")
    except Exception:
        await callback.message.delete()
        await callback.message.answer(text, parse_mode="HTML")


# ============== PAGE INFO ==============

@callback_router.callback_query(F.data == "page_info")
async def page_info(callback: CallbackQuery):
    """Sahifa ma'lumoti (hech narsa qilmaydi)"""
    await callback.answer()
