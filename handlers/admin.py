from aiogram import Router, F, Bot
from aiogram.types import Message, CallbackQuery
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
import math

import database as db
from config import ADMIN_IDS, GENRES, MAIN_CHANNEL
from keyboards import (
    admin_menu_keyboard,
    admin_genre_keyboard,
    cancel_keyboard,
    skip_keyboard,
    done_or_next_keyboard,
    skip_video_keyboard,
    admin_anime_list_keyboard,
    admin_anime_actions_keyboard,
    confirm_delete_keyboard,
    admin_episodes_keyboard,
    main_menu_keyboard,
    channel_anime_list_keyboard,
    channel_single_anime_keyboard,
)

admin_router = Router()


# Admin tekshirish filtri
def is_admin(user_id: int) -> bool:
    return user_id in ADMIN_IDS


class AddAnimeState(StatesGroup):
    """Anime qo'shish holatlari"""
    waiting_for_name = State()
    waiting_for_name_uz = State()
    waiting_for_genre = State()
    waiting_for_year = State()
    waiting_for_description = State()
    waiting_for_poster = State()


class AddEpisodeState(StatesGroup):
    """Qism qo'shish holatlari"""
    waiting_for_video = State()


class EditAnimeState(StatesGroup):
    """Anime tahrirlash holatlari"""
    waiting_for_field = State()
    waiting_for_value = State()


class BroadcastState(StatesGroup):
    """Xabar yuborish holati"""
    waiting_for_message = State()


# ============== ADMIN PANEL ==============

@admin_router.message(Command("admin"))
async def cmd_admin(message: Message, state: FSMContext):
    """Admin panel"""
    if not is_admin(message.from_user.id):
        await message.answer("❌ Sizda admin huquqi yo'q.")
        return

    await state.clear()

    # Statistika
    animes_count = await db.get_animes_count()
    episodes_count = await db.get_episodes_count()
    users_count = await db.get_users_count()
    today_views = await db.get_today_views_count()

    text = f"""⚙️ <b>ADMIN PANEL</b>

📊 <b>Statistika:</b>
• Animellar: <b>{animes_count}</b> ta
• Qismlar: <b>{episodes_count}</b> ta
• Foydalanuvchilar: <b>{users_count}</b> ta
• Bugungi ko'rishlar: <b>{today_views}</b>

Quyidagi amallardan birini tanlang:"""

    await message.answer(text, reply_markup=admin_menu_keyboard(), parse_mode="HTML")


# ============== ANIME QO'SHISH ==============

@admin_router.callback_query(F.data == "admin:add_anime")
async def start_add_anime(callback: CallbackQuery, state: FSMContext):
    """Anime qo'shishni boshlash"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ Sizda admin huquqi yo'q.", show_alert=True)
        return

    await state.set_state(AddAnimeState.waiting_for_name)
    await state.update_data(selected_genres=[])

    await callback.message.edit_text(
        "➕ <b>YANGI ANIME QO'SHISH</b>\n\n"
        "📝 Anime nomini yozing (inglizcha):\n\n"
        "Misol: Solo Leveling",
        reply_markup=cancel_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(AddAnimeState.waiting_for_name)
async def process_anime_name(message: Message, state: FSMContext):
    """Anime nomi"""
    await state.update_data(name=message.text.strip())
    await state.set_state(AddAnimeState.waiting_for_name_uz)

    await message.answer(
        "✅ Anime nomi saqlandi!\n\n"
        "🇺🇿 Endi o'zbekcha nomini yozing (ixtiyoriy):\n\n"
        "Misol: Yolg'iz darajaga ko'tarilish",
        reply_markup=skip_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(AddAnimeState.waiting_for_name_uz)
async def process_anime_name_uz(message: Message, state: FSMContext):
    """O'zbekcha nom"""
    await state.update_data(name_uz=message.text.strip())
    await state.set_state(AddAnimeState.waiting_for_genre)

    data = await state.get_data()
    selected = data.get("selected_genres", [])

    await message.answer(
        "✅ O'zbekcha nom saqlandi!\n\n"
        "📊 Janrlarni tanlang (bir nechta mumkin):\n\n"
        "Tugmagandan so'ng ✅ Tayyor bosing.",
        reply_markup=admin_genre_keyboard(selected),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data == "admin:skip", AddAnimeState.waiting_for_name_uz)
async def skip_name_uz(callback: CallbackQuery, state: FSMContext):
    """O'zbekcha nomni o'tkazib yuborish"""
    await state.update_data(name_uz=None)
    await state.set_state(AddAnimeState.waiting_for_genre)

    data = await state.get_data()
    selected = data.get("selected_genres", [])

    await callback.message.edit_text(
        "📊 Janrlarni tanlang (bir nechta mumkin):\n\n"
        "Tugmagandan so'ng ✅ Tayyor bosing.",
        reply_markup=admin_genre_keyboard(selected),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:genre:"), AddAnimeState.waiting_for_genre)
async def toggle_genre(callback: CallbackQuery, state: FSMContext):
    """Janr tanlash/bekor qilish"""
    genre = callback.data.split(":")[2]
    data = await state.get_data()
    selected = data.get("selected_genres", [])

    if genre in selected:
        selected.remove(genre)
    else:
        selected.append(genre)

    await state.update_data(selected_genres=selected)

    await callback.message.edit_reply_markup(
        reply_markup=admin_genre_keyboard(selected)
    )
    await callback.answer()


@admin_router.callback_query(F.data == "admin:genre_done", AddAnimeState.waiting_for_genre)
async def genre_done(callback: CallbackQuery, state: FSMContext):
    """Janr tanlash tugadi"""
    data = await state.get_data()
    selected = data.get("selected_genres", [])

    if not selected:
        await callback.answer("❌ Kamida bitta janr tanlang!", show_alert=True)
        return

    await state.set_state(AddAnimeState.waiting_for_year)

    await callback.message.edit_text(
        "✅ Janrlar saqlandi!\n\n"
        "📅 Chiqgan yilini kiriting:\n\n"
        "Misol: 2024",
        reply_markup=cancel_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(AddAnimeState.waiting_for_year)
async def process_year(message: Message, state: FSMContext):
    """Yil"""
    try:
        year = int(message.text.strip())
        if year < 1950 or year > 2030:
            raise ValueError
    except ValueError:
        await message.answer("❌ Noto'g'ri yil. Qaytadan kiriting (masalan: 2024):")
        return

    await state.update_data(year=year)
    await state.set_state(AddAnimeState.waiting_for_description)

    await message.answer(
        "✅ Yil saqlandi!\n\n"
        "📖 Anime tavsifini yozing:",
        reply_markup=skip_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(AddAnimeState.waiting_for_description)
async def process_description(message: Message, state: FSMContext):
    """Tavsif"""
    await state.update_data(description=message.text.strip())
    await state.set_state(AddAnimeState.waiting_for_poster)

    await message.answer(
        "✅ Tavsif saqlandi!\n\n"
        "🖼 Poster rasmini yuboring:",
        reply_markup=skip_keyboard(),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data == "admin:skip", AddAnimeState.waiting_for_description)
async def skip_description(callback: CallbackQuery, state: FSMContext):
    """Tavsifni o'tkazib yuborish"""
    await state.update_data(description=None)
    await state.set_state(AddAnimeState.waiting_for_poster)

    await callback.message.edit_text(
        "🖼 Poster rasmini yuboring:",
        reply_markup=skip_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(AddAnimeState.waiting_for_poster, F.photo)
async def process_poster(message: Message, state: FSMContext):
    """Poster"""
    photo = message.photo[-1]
    await state.update_data(poster_file_id=photo.file_id)

    await save_anime(message, state)


@admin_router.callback_query(F.data == "admin:skip", AddAnimeState.waiting_for_poster)
async def skip_poster(callback: CallbackQuery, state: FSMContext):
    """Posterni o'tkazib yuborish"""
    await state.update_data(poster_file_id=None)

    await save_anime(callback.message, state, is_callback=True)


async def save_anime(message: Message, state: FSMContext, is_callback: bool = False):
    """Animeni bazaga saqlash va darhol video qo'shish holatiga o'tkazish"""
    data = await state.get_data()

    # Janrlarni stringga aylantirish
    genre_str = ",".join(data.get("selected_genres", []))

    # Bazaga saqlash
    anime_id = await db.add_anime(
        name=data["name"],
        name_uz=data.get("name_uz"),
        description=data.get("description"),
        genre=genre_str,
        year=data.get("year"),
        poster_file_id=data.get("poster_file_id"),
        status="ongoing"
    )

    # Janrlar nomlarini olish
    genre_names = [GENRES.get(g, g) for g in data.get("selected_genres", [])]

    # Video qo'shish holatiga o'tkazish
    await state.clear()
    await state.set_state(AddEpisodeState.waiting_for_video)
    await state.update_data(anime_id=anime_id, episode_number=1)

    text = f"""✅ <b>Anime saqlandi!</b>

📺 <b>{data['name']}</b>
{f"🇺🇿 {data.get('name_uz')}" if data.get('name_uz') else ""}
📊 {", ".join(genre_names)}
📅 {data.get('year', 'Noma\'lum')}

━━━━━━━━━━━━━━━━━━

🎬 Endi <b>1-qism</b> uchun video faylni yuboring:

(Yoki videosiz saqlash uchun tugmani bosing)"""

    if is_callback:
        await message.edit_text(
            text,
            reply_markup=skip_video_keyboard(anime_id),
            parse_mode="HTML"
        )
    else:
        await message.answer(
            text,
            reply_markup=skip_video_keyboard(anime_id),
            parse_mode="HTML"
        )


# ============== QISM QO'SHISH ==============

@admin_router.callback_query(F.data.startswith("admin:add_ep:"))
async def start_add_episode(callback: CallbackQuery, state: FSMContext):
    """Qism qo'shishni boshlash"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ Sizda admin huquqi yo'q.", show_alert=True)
        return

    anime_id = int(callback.data.split(":")[2])
    anime = await db.get_anime(anime_id)

    if not anime:
        await callback.answer("❌ Anime topilmadi.", show_alert=True)
        return

    next_ep = await db.get_next_episode_number(anime_id)

    await state.set_state(AddEpisodeState.waiting_for_video)
    await state.update_data(anime_id=anime_id, episode_number=next_ep)

    await callback.message.edit_text(
        f"➕ <b>QISM QO'SHISH</b> | {anime['name']}\n\n"
        f"📺 Hozirgi qismlar: <b>{anime['episodes_count']}</b> ta\n\n"
        f"🎬 <b>{next_ep}-qism</b> uchun video faylni yuboring:",
        reply_markup=cancel_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(AddEpisodeState.waiting_for_video, F.video)
async def process_video(message: Message, state: FSMContext):
    """Video qabul qilish"""
    video = message.video
    data = await state.get_data()

    anime_id = data["anime_id"]
    episode_number = data["episode_number"]

    # Davomiylikni formatlash
    duration = None
    if video.duration:
        minutes = video.duration // 60
        seconds = video.duration % 60
        duration = f"{minutes}:{seconds:02d}"

    # Bazaga saqlash
    await db.add_episode(
        anime_id=anime_id,
        episode_number=episode_number,
        video_file_id=video.file_id,
        duration=duration,
        quality="1080p"
    )

    anime = await db.get_anime(anime_id)

    await state.clear()

    await message.answer(
        f"✅ <b>{episode_number}-qism saqlandi!</b>\n\n"
        f"📺 {anime['name']} | {episode_number}-qism\n"
        f"⏱ {duration or 'Noma\'lum'} | 📊 1080p",
        reply_markup=done_or_next_keyboard(anime_id),
        parse_mode="HTML"
    )


@admin_router.message(AddEpisodeState.waiting_for_video, F.document)
async def process_document_video(message: Message, state: FSMContext):
    """Document (fayl) sifatida yuborilgan video qabul qilish"""
    document = message.document
    data = await state.get_data()

    # Video fayl ekanligini tekshirish
    mime_type = document.mime_type or ""
    if not mime_type.startswith("video/"):
        await message.answer(
            "❌ Bu video fayl emas.\n\n"
            "Video faylni yuboring (.mp4, .mkv, .avi va h.k.)",
            reply_markup=skip_video_keyboard(data.get("anime_id"))
        )
        return

    anime_id = data["anime_id"]
    episode_number = data["episode_number"]

    # Bazaga saqlash (document sifatida)
    await db.add_episode(
        anime_id=anime_id,
        episode_number=episode_number,
        video_file_id=document.file_id,
        duration=None,
        quality="1080p"
    )

    anime = await db.get_anime(anime_id)

    await state.clear()

    await message.answer(
        f"✅ <b>{episode_number}-qism saqlandi!</b>\n\n"
        f"📺 {anime['name']} | {episode_number}-qism\n"
        f"📁 Fayl: {document.file_name or 'video'}\n"
        f"📊 Hajmi: {document.file_size // (1024*1024)} MB",
        reply_markup=done_or_next_keyboard(anime_id),
        parse_mode="HTML"
    )


@admin_router.message(AddEpisodeState.waiting_for_video)
async def invalid_video(message: Message, state: FSMContext):
    """Video emas"""
    data = await state.get_data()
    anime_id = data.get("anime_id")

    await message.answer(
        "❌ Iltimos, video fayl yuboring.\n\n"
        "Video faylni kutmoqdaman...",
        reply_markup=skip_video_keyboard(anime_id) if anime_id else cancel_keyboard()
    )


@admin_router.callback_query(F.data.startswith("admin:skip_video:"))
async def skip_video(callback: CallbackQuery, state: FSMContext):
    """Videoni o'tkazib yuborish"""
    anime_id = int(callback.data.split(":")[2])
    anime = await db.get_anime(anime_id)

    await state.clear()

    await callback.message.edit_text(
        f"✅ <b>{anime['name']}</b> videosiz saqlandi!\n\n"
        "Keyinroq qism qo'shish uchun:\n"
        "📝 Anime tahrirlash → Anime tanlash → ➕ Qism qo'shish",
        reply_markup=admin_menu_keyboard(),
        parse_mode="HTML"
    )


# ============== ANIME TAHRIRLASH ==============

@admin_router.callback_query(F.data == "admin:edit_anime")
async def show_edit_anime_list(callback: CallbackQuery, state: FSMContext):
    """Tahrirlash uchun anime ro'yxati"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ Sizda admin huquqi yo'q.", show_alert=True)
        return

    page = 1
    animes = await db.get_all_animes(page=page)
    total = await db.get_animes_count()
    total_pages = math.ceil(total / 10) or 1

    if not animes:
        await callback.message.edit_text(
            "😔 Hozircha animellar yo'q.",
            reply_markup=admin_menu_keyboard()
        )
        return

    await callback.message.edit_text(
        "📝 <b>ANIME TAHRIRLASH</b>\n\n"
        "Tahrirlash uchun anime tanlang:",
        reply_markup=admin_anime_list_keyboard(animes, "select", page, total_pages),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:select:"))
async def select_anime_for_edit(callback: CallbackQuery, state: FSMContext):
    """Anime tanlash (tahrirlash uchun)"""
    anime_id = int(callback.data.split(":")[2])
    anime = await db.get_anime(anime_id)

    if not anime:
        await callback.answer("❌ Anime topilmadi.", show_alert=True)
        return

    await callback.message.edit_text(
        f"📝 <b>{anime['name']}</b>\n\n"
        f"📺 Qismlar: {anime['episodes_count']} ta\n\n"
        "Amalni tanlang:",
        reply_markup=admin_anime_actions_keyboard(anime_id),
        parse_mode="HTML"
    )


# ============== ANIME O'CHIRISH ==============

@admin_router.callback_query(F.data == "admin:delete_anime")
async def show_delete_anime_list(callback: CallbackQuery, state: FSMContext):
    """O'chirish uchun anime ro'yxati"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ Sizda admin huquqi yo'q.", show_alert=True)
        return

    page = 1
    animes = await db.get_all_animes(page=page)
    total = await db.get_animes_count()
    total_pages = math.ceil(total / 10) or 1

    if not animes:
        await callback.message.edit_text(
            "😔 Hozircha animellar yo'q.",
            reply_markup=admin_menu_keyboard()
        )
        return

    await callback.message.edit_text(
        "🗑 <b>ANIME O'CHIRISH</b>\n\n"
        "O'chirish uchun anime tanlang:",
        reply_markup=admin_anime_list_keyboard(animes, "del", page, total_pages),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:del:"))
async def confirm_delete_anime(callback: CallbackQuery, state: FSMContext):
    """Anime o'chirishni tasdiqlash"""
    anime_id = int(callback.data.split(":")[2])
    anime = await db.get_anime(anime_id)

    if not anime:
        await callback.answer("❌ Anime topilmadi.", show_alert=True)
        return

    await callback.message.edit_text(
        f"⚠️ <b>DIQQAT!</b>\n\n"
        f"📺 <b>{anime['name']}</b>\n"
        f"🎬 {anime['episodes_count']} ta qism\n\n"
        f"Haqiqatan ham o'chirmoqchimisiz?\n"
        f"Bu amalni qaytarib bo'lmaydi!",
        reply_markup=confirm_delete_keyboard("anime", anime_id),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:confirm_del:anime:"))
async def delete_anime_confirmed(callback: CallbackQuery, state: FSMContext):
    """Anime o'chirish tasdiqlandi"""
    anime_id = int(callback.data.split(":")[3])

    await db.delete_anime(anime_id)

    await callback.message.edit_text(
        "✅ Anime muvaffaqiyatli o'chirildi!",
        reply_markup=admin_menu_keyboard()
    )


# ============== QISM O'CHIRISH ==============

@admin_router.callback_query(F.data.startswith("admin:del_ep:"))
async def show_delete_episode_list(callback: CallbackQuery, state: FSMContext):
    """O'chirish uchun qismlar ro'yxati"""
    anime_id = int(callback.data.split(":")[2])
    anime = await db.get_anime(anime_id)
    episodes = await db.get_episodes(anime_id)

    if not episodes:
        await callback.answer("❌ Bu animeda qismlar yo'q.", show_alert=True)
        return

    await callback.message.edit_text(
        f"🗑 <b>QISM O'CHIRISH</b> | {anime['name']}\n\n"
        "O'chirish uchun qism tanlang:",
        reply_markup=admin_episodes_keyboard(anime_id, episodes),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:del_episode:"))
async def confirm_delete_episode(callback: CallbackQuery, state: FSMContext):
    """Qism o'chirishni tasdiqlash"""
    episode_id = int(callback.data.split(":")[2])
    episode = await db.get_episode(episode_id)

    if not episode:
        await callback.answer("❌ Qism topilmadi.", show_alert=True)
        return

    anime = await db.get_anime(episode["anime_id"])

    await callback.message.edit_text(
        f"⚠️ <b>DIQQAT!</b>\n\n"
        f"📺 {anime['name']} | <b>{episode['episode_number']}-qism</b>\n\n"
        f"Haqiqatan ham o'chirmoqchimisiz?",
        reply_markup=confirm_delete_keyboard("episode", episode_id),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:confirm_del:episode:"))
async def delete_episode_confirmed(callback: CallbackQuery, state: FSMContext):
    """Qism o'chirish tasdiqlandi"""
    episode_id = int(callback.data.split(":")[3])

    await db.delete_episode(episode_id)

    await callback.message.edit_text(
        "✅ Qism muvaffaqiyatli o'chirildi!",
        reply_markup=admin_menu_keyboard()
    )


# ============== BROADCAST ==============

@admin_router.callback_query(F.data == "admin:broadcast")
async def start_broadcast(callback: CallbackQuery, state: FSMContext):
    """Xabar yuborishni boshlash"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ Sizda admin huquqi yo'q.", show_alert=True)
        return

    users_count = await db.get_users_count()

    await state.set_state(BroadcastState.waiting_for_message)

    await callback.message.edit_text(
        f"📢 <b>XABAR YUBORISH</b>\n\n"
        f"👥 Foydalanuvchilar: <b>{users_count}</b> ta\n\n"
        f"Yubormoqchi bo'lgan xabaringizni yozing:",
        reply_markup=cancel_keyboard(),
        parse_mode="HTML"
    )


@admin_router.message(BroadcastState.waiting_for_message)
async def process_broadcast(message: Message, state: FSMContext, bot: Bot):
    """Xabarni yuborish"""
    await state.clear()

    users = await db.get_all_users()
    sent = 0
    failed = 0

    status_msg = await message.answer(
        f"📤 Xabar yuborilmoqda... 0/{len(users)}"
    )

    for user in users:
        try:
            await bot.send_message(
                chat_id=user[0],
                text=message.text,
                parse_mode="HTML"
            )
            sent += 1
        except Exception:
            failed += 1

        # Har 20 ta xabardan keyin status yangilash
        if (sent + failed) % 20 == 0:
            await status_msg.edit_text(
                f"📤 Xabar yuborilmoqda... {sent + failed}/{len(users)}"
            )

    await status_msg.edit_text(
        f"✅ <b>Xabar yuborildi!</b>\n\n"
        f"✅ Muvaffaqiyatli: <b>{sent}</b>\n"
        f"❌ Xatolik: <b>{failed}</b>",
        reply_markup=admin_menu_keyboard(),
        parse_mode="HTML"
    )


# ============== KANALGA POST ==============

@admin_router.callback_query(F.data == "admin:channel_post")
async def channel_post_menu(callback: CallbackQuery, state: FSMContext):
    """Kanalga post yuborish menyusi"""
    if not is_admin(callback.from_user.id):
        await callback.answer("❌ Sizda admin huquqi yo'q.", show_alert=True)
        return

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="📋 Anime ro'yxati post", callback_data="admin:post_list")
    )
    builder.row(
        InlineKeyboardButton(text="🆕 Yangi anime e'loni", callback_data="admin:post_new")
    )
    builder.row(
        InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin:menu")
    )

    await callback.message.edit_text(
        "📋 <b>KANALGA POST</b>\n\n"
        "Qaysi turdagi post yubormoqchisiz?",
        reply_markup=builder.as_markup(),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data == "admin:post_list")
async def post_anime_list_to_channel(callback: CallbackQuery, state: FSMContext, bot: Bot):
    """Kanalga anime ro'yxatini yuborish"""
    animes = await db.get_all_animes(page=1, per_page=50)

    if not animes:
        await callback.answer("❌ Animellar yo'q.", show_alert=True)
        return

    # Chiroyli post matni
    total_animes = await db.get_animes_count()
    total_episodes = await db.get_episodes_count()

    text = f"""🌙 <b>YUMEKAI — Anime Katalogi</b>

━━━━━━━━━━━━━━━━━━

📺 <b>{total_animes}</b> ta anime
🎬 <b>{total_episodes}</b> ta qism
🇺🇿 O'zbek subtitr
📊 1080p HD sifat

━━━━━━━━━━━━━━━━━━

Quyidagi tugmalardan anime tanlang va
botda ko'ring!

🔄 Yangilanish: <i>Har kuni</i>"""

    try:
        await bot.send_message(
            chat_id=MAIN_CHANNEL,
            text=text,
            reply_markup=channel_anime_list_keyboard(animes),
            parse_mode="HTML"
        )
        await callback.answer("✅ Kanalga yuborildi!", show_alert=True)
    except Exception as e:
        await callback.answer(f"❌ Xatolik: {str(e)[:100]}", show_alert=True)

    await callback.message.edit_text(
        "✅ Anime ro'yxati kanalga yuborildi!",
        reply_markup=admin_menu_keyboard()
    )


@admin_router.callback_query(F.data == "admin:post_new")
async def select_anime_for_post(callback: CallbackQuery, state: FSMContext):
    """Yangi anime e'loni uchun anime tanlash"""
    animes = await db.get_latest_animes(limit=10)

    if not animes:
        await callback.answer("❌ Animellar yo'q.", show_alert=True)
        return

    from aiogram.utils.keyboard import InlineKeyboardBuilder
    from aiogram.types import InlineKeyboardButton

    builder = InlineKeyboardBuilder()
    for anime in animes:
        builder.row(
            InlineKeyboardButton(
                text=f"📺 {anime['name']}",
                callback_data=f"admin:post_anime:{anime['id']}"
            )
        )
    builder.row(
        InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin:channel_post")
    )

    await callback.message.edit_text(
        "🆕 <b>YANGI ANIME E'LONI</b>\n\n"
        "Kanalga e'lon qilish uchun anime tanlang:",
        reply_markup=builder.as_markup(),
        parse_mode="HTML"
    )


@admin_router.callback_query(F.data.startswith("admin:post_anime:"))
async def post_single_anime_to_channel(callback: CallbackQuery, state: FSMContext, bot: Bot):
    """Bitta anime haqida kanalga post yuborish"""
    anime_id = int(callback.data.split(":")[2])
    anime = await db.get_anime(anime_id)

    if not anime:
        await callback.answer("❌ Anime topilmadi.", show_alert=True)
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

    text = f"""🆕 <b>YANGI ANIME!</b>

━━━━━━━━━━━━━━━━━━

📺 <b>{anime['name']}</b>
{f"🇺🇿 {anime['name_uz']}" if anime['name_uz'] else ""}

📊 <b>Janr:</b> {genres_str}
📅 <b>Yil:</b> {anime['year'] or "Noma'lum"}
🎬 <b>Qismlar:</b> {anime['episodes_count'] or 0}
📌 <b>Status:</b> {status}

━━━━━━━━━━━━━━━━━━

📖 {anime['description'][:200] + '...' if anime['description'] and len(anime['description']) > 200 else anime['description'] or 'Tavsif mavjud emas'}

━━━━━━━━━━━━━━━━━━

🤖 @yumekai_bot da ko'ring!"""

    try:
        if anime["poster_file_id"]:
            await bot.send_photo(
                chat_id=MAIN_CHANNEL,
                photo=anime["poster_file_id"],
                caption=text,
                reply_markup=channel_single_anime_keyboard(anime_id),
                parse_mode="HTML"
            )
        else:
            await bot.send_message(
                chat_id=MAIN_CHANNEL,
                text=text,
                reply_markup=channel_single_anime_keyboard(anime_id),
                parse_mode="HTML"
            )
        await callback.answer("✅ Kanalga yuborildi!", show_alert=True)
    except Exception as e:
        await callback.answer(f"❌ Xatolik: {str(e)[:100]}", show_alert=True)
        return

    await callback.message.edit_text(
        f"✅ <b>{anime['name']}</b> kanalga yuborildi!",
        reply_markup=admin_menu_keyboard(),
        parse_mode="HTML"
    )


# ============== BEKOR QILISH ==============

@admin_router.callback_query(F.data == "admin:cancel")
async def cancel_action(callback: CallbackQuery, state: FSMContext):
    """Amalni bekor qilish"""
    await state.clear()

    await callback.message.edit_text(
        "❌ Bekor qilindi.",
        reply_markup=admin_menu_keyboard()
    )


@admin_router.callback_query(F.data == "admin:menu")
async def back_to_admin_menu(callback: CallbackQuery, state: FSMContext):
    """Admin menyuga qaytish"""
    await state.clear()

    # Statistika
    animes_count = await db.get_animes_count()
    episodes_count = await db.get_episodes_count()
    users_count = await db.get_users_count()
    today_views = await db.get_today_views_count()

    text = f"""⚙️ <b>ADMIN PANEL</b>

📊 <b>Statistika:</b>
• Animellar: <b>{animes_count}</b> ta
• Qismlar: <b>{episodes_count}</b> ta
• Foydalanuvchilar: <b>{users_count}</b> ta
• Bugungi ko'rishlar: <b>{today_views}</b>

Quyidagi amallardan birini tanlang:"""

    await callback.message.edit_text(
        text,
        reply_markup=admin_menu_keyboard(),
        parse_mode="HTML"
    )
