from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters import Command, CommandStart, CommandObject
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

import database as db
from config import GENRES
from keyboards import (
    main_menu_keyboard,
    search_results_keyboard,
    back_to_main_keyboard,
    anime_keyboard,
    episodes_keyboard,
)

user_router = Router()


class SearchState(StatesGroup):
    """Qidiruv holati"""
    waiting_for_query = State()


@user_router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext, command: CommandObject):
    """Botni ishga tushirish"""
    # Holatni tozalash
    await state.clear()

    # Foydalanuvchini bazaga qo'shish
    await db.add_user(
        telegram_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name
    )

    # Deep link tekshirish (start=anime_ID)
    if command.args:
        args = command.args
        if args.startswith("anime_"):
            try:
                anime_id = int(args.replace("anime_", ""))
                await show_anime_from_deeplink(message, anime_id)
                return
            except ValueError:
                pass

    # Oddiy start
    animes_count = await db.get_animes_count()
    episodes_count = await db.get_episodes_count()

    text = f"""🌙 <b>YUMEKAI</b> ga xush kelibsiz!

Anime dunyosiga sayohat qiling:

📺 <b>{animes_count}+</b> anime
🎬 <b>{episodes_count}+</b> qism
🇺🇿 O'zbek subtitr
📊 1080p HD sifat

Quyidagi tugmalardan birini tanlang:"""

    await message.answer(text, reply_markup=main_menu_keyboard(), parse_mode="HTML")


async def show_anime_from_deeplink(message: Message, anime_id: int):
    """Deep link orqali anime ko'rsatish"""
    anime = await db.get_anime(anime_id)

    if not anime:
        await message.answer(
            "😔 Anime topilmadi.",
            reply_markup=main_menu_keyboard()
        )
        return

    # Janrlarni formatlash
    genres_list = []
    if anime["genre"]:
        for g in anime["genre"].split(","):
            g = g.strip()
            if g in GENRES:
                genres_list.append(GENRES[g])
    genres_str = ", ".join(genres_list) if genres_list else "Noma'lum"

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
        await message.answer_photo(
            photo=anime["poster_file_id"],
            caption=text,
            reply_markup=anime_keyboard(anime_id, anime["episodes_count"] > 0),
            parse_mode="HTML"
        )
    else:
        await message.answer(
            text,
            reply_markup=anime_keyboard(anime_id, anime["episodes_count"] > 0),
            parse_mode="HTML"
        )


@user_router.message(Command("help"))
async def cmd_help(message: Message):
    """Yordam"""
    text = """🌙 <b>YUMEKAI Bot Yordam</b>

<b>Asosiy buyruqlar:</b>
/start — Botni ishga tushirish
/help — Yordam
/catalog — Anime katalogi
/search — Anime qidirish
/popular — Mashhur animellar
/latest — Yangi animellar
/genres — Janrlar

<b>Qanday foydalanish:</b>
1. 🎬 Katalog — barcha animellarni ko'rish
2. 🔍 Qidirish — anime nomini yozib qidirish
3. 📊 Janrlar — janr bo'yicha filter

Savollar uchun: @yumekai_admin"""

    await message.answer(text, reply_markup=back_to_main_keyboard(), parse_mode="HTML")


@user_router.message(Command("catalog"))
async def cmd_catalog(message: Message):
    """Katalog buyrug'i"""
    from keyboards import catalog_keyboard
    import math

    page = 1
    animes = await db.get_all_animes(page=page)
    total = await db.get_animes_count()
    total_pages = math.ceil(total / 10) or 1

    if not animes:
        await message.answer(
            "😔 Hozircha animellar yo'q.",
            reply_markup=back_to_main_keyboard()
        )
        return

    text = f"🎬 <b>ANIMELLAR</b> | Sahifa {page}/{total_pages}\n\nTanlang:"
    await message.answer(
        text,
        reply_markup=catalog_keyboard(animes, page, total_pages),
        parse_mode="HTML"
    )


@user_router.message(Command("search"))
async def cmd_search(message: Message, state: FSMContext):
    """Qidiruv buyrug'i"""
    await state.set_state(SearchState.waiting_for_query)

    text = """🔍 <b>Anime nomini yozing:</b>

Misol: "solo" yoki "jujutsu"

Bekor qilish uchun /cancel yozing."""

    await message.answer(text, parse_mode="HTML")


@user_router.message(Command("cancel"))
async def cmd_cancel(message: Message, state: FSMContext):
    """Bekor qilish"""
    current_state = await state.get_state()
    if current_state is None:
        await message.answer("Bekor qilish uchun hech narsa yo'q.")
        return

    await state.clear()
    await message.answer(
        "❌ Bekor qilindi.",
        reply_markup=main_menu_keyboard()
    )


@user_router.message(Command("popular"))
async def cmd_popular(message: Message):
    """Mashhur animellar buyrug'i"""
    from keyboards import popular_keyboard

    animes = await db.get_popular_animes(limit=10)

    if not animes:
        await message.answer(
            "😔 Hozircha animellar yo'q.",
            reply_markup=back_to_main_keyboard()
        )
        return

    text = "🔥 <b>ENG MASHHUR ANIMELLAR</b>\n\nTanlang:"
    await message.answer(
        text,
        reply_markup=popular_keyboard(animes),
        parse_mode="HTML"
    )


@user_router.message(Command("latest"))
async def cmd_latest(message: Message):
    """Yangi animellar buyrug'i"""
    from keyboards import latest_keyboard

    animes = await db.get_latest_animes(limit=10)

    if not animes:
        await message.answer(
            "😔 Hozircha animellar yo'q.",
            reply_markup=back_to_main_keyboard()
        )
        return

    text = "⭐ <b>YANGI QO'SHILGAN ANIMELLAR</b>\n\nTanlang:"
    await message.answer(
        text,
        reply_markup=latest_keyboard(animes),
        parse_mode="HTML"
    )


@user_router.message(Command("genres"))
async def cmd_genres(message: Message):
    """Janrlar buyrug'i"""
    from keyboards import genres_keyboard

    text = "📊 <b>JANRLAR</b>\n\nBirini tanlang:"
    await message.answer(
        text,
        reply_markup=genres_keyboard(),
        parse_mode="HTML"
    )


@user_router.message(SearchState.waiting_for_query)
async def process_search(message: Message, state: FSMContext):
    """Qidiruv natijalarini ko'rsatish"""
    query = message.text.strip()

    if len(query) < 2:
        await message.answer("❌ Kamida 2 ta harf kiriting.")
        return

    animes = await db.search_animes(query)

    if not animes:
        await message.answer(
            f"😔 <b>\"{query}\"</b> bo'yicha natija topilmadi.\n\nQayta urinib ko'ring:",
            parse_mode="HTML"
        )
        return

    await state.clear()

    text = f"🔍 <b>Natijalar:</b> \"{query}\"\n\nTanlang:"
    await message.answer(
        text,
        reply_markup=search_results_keyboard(animes),
        parse_mode="HTML"
    )


@user_router.message()
async def unknown_message(message: Message, state: FSMContext):
    """Noma'lum xabarlar"""
    current_state = await state.get_state()

    # Agar holat bo'lmasa, bosh menyuga yo'naltirish
    if current_state is None:
        await message.answer(
            "🤔 Tushunmadim. Quyidagi tugmalardan foydalaning:",
            reply_markup=main_menu_keyboard()
        )
