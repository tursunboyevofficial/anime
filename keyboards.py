from aiogram.types import (
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ReplyKeyboardMarkup,
    KeyboardButton,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder
from config import GENRES, ITEMS_PER_PAGE, BOT_USERNAME
import math


# ============== ASOSIY MENYU ==============

def main_menu_keyboard():
    """Bosh menyu tugmalari"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="🎬 Katalog", callback_data="catalog:1"),
        InlineKeyboardButton(text="🔍 Qidirish", callback_data="search")
    )
    builder.row(
        InlineKeyboardButton(text="🔥 Mashhur", callback_data="popular"),
        InlineKeyboardButton(text="⭐ Yangi", callback_data="latest")
    )
    builder.row(
        InlineKeyboardButton(text="📊 Janrlar", callback_data="genres")
    )
    return builder.as_markup()


def back_to_main_keyboard():
    """Bosh menyuga qaytish tugmasi"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )
    return builder.as_markup()


# ============== KATALOG ==============

def catalog_keyboard(animes: list, page: int, total_pages: int):
    """Katalog tugmalari (sahifalash bilan)"""
    builder = InlineKeyboardBuilder()

    # Animellar ro'yxati
    for anime in animes:
        episodes = anime["episodes_count"] or 0
        text = f"📺 {anime['name']} ({episodes} qism)"
        builder.row(
            InlineKeyboardButton(text=text, callback_data=f"anime:{anime['id']}")
        )

    # Sahifalash
    nav_buttons = []
    if page > 1:
        nav_buttons.append(
            InlineKeyboardButton(text="⬅️", callback_data=f"catalog:{page-1}")
        )
    nav_buttons.append(
        InlineKeyboardButton(text=f"{page}/{total_pages}", callback_data="page_info")
    )
    if page < total_pages:
        nav_buttons.append(
            InlineKeyboardButton(text="➡️", callback_data=f"catalog:{page+1}")
        )

    if nav_buttons:
        builder.row(*nav_buttons)

    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


# ============== ANIME ==============

def anime_keyboard(anime_id: int, has_episodes: bool = True):
    """Anime ma'lumotlari tugmalari"""
    builder = InlineKeyboardBuilder()

    if has_episodes:
        builder.row(
            InlineKeyboardButton(
                text="▶️ Qismlarni ko'rish",
                callback_data=f"episodes:{anime_id}"
            )
        )

    builder.row(
        InlineKeyboardButton(text="⬅️ Orqaga", callback_data="catalog:1")
    )

    return builder.as_markup()


def episodes_keyboard(anime_id: int, episodes: list, page: int = 1):
    """Qismlar ro'yxati tugmalari"""
    builder = InlineKeyboardBuilder()

    # Qismlarni 3 ta qatorga joylashtirish
    buttons = []
    for ep in episodes:
        buttons.append(
            InlineKeyboardButton(
                text=f"{ep['episode_number']}-qism ▶️",
                callback_data=f"watch:{anime_id}:{ep['episode_number']}"
            )
        )

    # 3 tadan qatorlarga ajratish
    for i in range(0, len(buttons), 3):
        row = buttons[i:i+3]
        builder.row(*row)

    builder.row(
        InlineKeyboardButton(text="⬅️ Orqaga", callback_data=f"anime:{anime_id}")
    )

    return builder.as_markup()


def episode_navigation_keyboard(anime_id: int, current_ep: int, total_eps: int):
    """Qism navigatsiya tugmalari"""
    builder = InlineKeyboardBuilder()

    nav_buttons = []
    if current_ep > 1:
        nav_buttons.append(
            InlineKeyboardButton(
                text="⬅️ Oldingi",
                callback_data=f"watch:{anime_id}:{current_ep-1}"
            )
        )

    nav_buttons.append(
        InlineKeyboardButton(
            text=f"{current_ep}/{total_eps}",
            callback_data=f"episodes:{anime_id}"
        )
    )

    if current_ep < total_eps:
        nav_buttons.append(
            InlineKeyboardButton(
                text="Keyingi ➡️",
                callback_data=f"watch:{anime_id}:{current_ep+1}"
            )
        )

    builder.row(*nav_buttons)
    builder.row(
        InlineKeyboardButton(text="📋 Qismlar", callback_data=f"episodes:{anime_id}")
    )
    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


# ============== JANRLAR ==============

def genres_keyboard():
    """Janrlar tugmalari"""
    builder = InlineKeyboardBuilder()

    genre_items = list(GENRES.items())

    # 2 tadan qatorlarga
    for i in range(0, len(genre_items), 2):
        row_items = genre_items[i:i+2]
        buttons = [
            InlineKeyboardButton(
                text=emoji_name,
                callback_data=f"genre:{key}:1"
            )
            for key, emoji_name in row_items
        ]
        builder.row(*buttons)

    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


def genre_animes_keyboard(genre: str, animes: list, page: int, total_pages: int):
    """Janr bo'yicha animellar tugmalari"""
    builder = InlineKeyboardBuilder()

    for anime in animes:
        episodes = anime["episodes_count"] or 0
        text = f"📺 {anime['name']} ({episodes} qism)"
        builder.row(
            InlineKeyboardButton(text=text, callback_data=f"anime:{anime['id']}")
        )

    # Sahifalash
    nav_buttons = []
    if page > 1:
        nav_buttons.append(
            InlineKeyboardButton(text="⬅️", callback_data=f"genre:{genre}:{page-1}")
        )
    nav_buttons.append(
        InlineKeyboardButton(text=f"{page}/{total_pages}", callback_data="page_info")
    )
    if page < total_pages:
        nav_buttons.append(
            InlineKeyboardButton(text="➡️", callback_data=f"genre:{genre}:{page+1}")
        )

    if nav_buttons:
        builder.row(*nav_buttons)

    builder.row(
        InlineKeyboardButton(text="⬅️ Janrlar", callback_data="genres"),
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


# ============== QIDIRUV NATIJALARI ==============

def search_results_keyboard(animes: list):
    """Qidiruv natijalari tugmalari"""
    builder = InlineKeyboardBuilder()

    for anime in animes:
        episodes = anime["episodes_count"] or 0
        text = f"📺 {anime['name']} ({episodes} qism)"
        builder.row(
            InlineKeyboardButton(text=text, callback_data=f"anime:{anime['id']}")
        )

    builder.row(
        InlineKeyboardButton(text="🔍 Qayta qidirish", callback_data="search"),
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


# ============== MASHHUR / YANGI ==============

def popular_keyboard(animes: list):
    """Mashhur animellar tugmalari"""
    builder = InlineKeyboardBuilder()

    medals = ["🥇", "🥈", "🥉"]
    for i, anime in enumerate(animes):
        medal = medals[i] if i < 3 else f"{i+1}."
        view_count = anime.get("view_count", 0)
        text = f"{medal} {anime['name']} — {view_count:,} ko'rish"
        builder.row(
            InlineKeyboardButton(text=text, callback_data=f"anime:{anime['id']}")
        )

    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


def latest_keyboard(animes: list):
    """Yangi animellar tugmalari"""
    builder = InlineKeyboardBuilder()

    for anime in animes:
        episodes = anime["episodes_count"] or 0
        text = f"⭐ {anime['name']} ({episodes} qism)"
        builder.row(
            InlineKeyboardButton(text=text, callback_data=f"anime:{anime['id']}")
        )

    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )

    return builder.as_markup()


# ============== ADMIN PANEL ==============

def admin_menu_keyboard():
    """Admin panel tugmalari"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="➕ Anime qo'shish", callback_data="admin:add_anime")
    )
    builder.row(
        InlineKeyboardButton(text="📝 Anime tahrirlash", callback_data="admin:edit_anime"),
        InlineKeyboardButton(text="🗑 Anime o'chirish", callback_data="admin:delete_anime")
    )
    builder.row(
        InlineKeyboardButton(text="📢 Xabar yuborish", callback_data="admin:broadcast")
    )
    builder.row(
        InlineKeyboardButton(text="📋 Kanalga post", callback_data="admin:channel_post")
    )
    builder.row(
        InlineKeyboardButton(text="📊 Batafsil statistika", callback_data="admin:stats")
    )
    builder.row(
        InlineKeyboardButton(text="🏠 Bosh menyu", callback_data="main_menu")
    )
    return builder.as_markup()


def admin_anime_list_keyboard(animes: list, action: str, page: int = 1, total_pages: int = 1):
    """Admin uchun anime ro'yxati"""
    builder = InlineKeyboardBuilder()

    for anime in animes:
        text = f"📺 {anime['name']}"
        builder.row(
            InlineKeyboardButton(text=text, callback_data=f"admin:{action}:{anime['id']}")
        )

    # Sahifalash
    nav_buttons = []
    if page > 1:
        nav_buttons.append(
            InlineKeyboardButton(text="⬅️", callback_data=f"admin:{action}_list:{page-1}")
        )
    if total_pages > 1:
        nav_buttons.append(
            InlineKeyboardButton(text=f"{page}/{total_pages}", callback_data="page_info")
        )
    if page < total_pages:
        nav_buttons.append(
            InlineKeyboardButton(text="➡️", callback_data=f"admin:{action}_list:{page+1}")
        )

    if nav_buttons:
        builder.row(*nav_buttons)

    builder.row(
        InlineKeyboardButton(text="⬅️ Admin panel", callback_data="admin:menu")
    )

    return builder.as_markup()


def admin_genre_keyboard(selected: list = None):
    """Admin uchun janr tanlash"""
    if selected is None:
        selected = []

    builder = InlineKeyboardBuilder()

    genre_items = list(GENRES.items())

    for i in range(0, len(genre_items), 2):
        row_items = genre_items[i:i+2]
        buttons = []
        for key, emoji_name in row_items:
            check = " ✓" if key in selected else ""
            buttons.append(
                InlineKeyboardButton(
                    text=f"{emoji_name}{check}",
                    callback_data=f"admin:genre:{key}"
                )
            )
        builder.row(*buttons)

    builder.row(
        InlineKeyboardButton(text="✅ Tayyor", callback_data="admin:genre_done")
    )

    return builder.as_markup()


def admin_anime_actions_keyboard(anime_id: int):
    """Anime tahrirlash tugmalari"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="➕ Qism qo'shish", callback_data=f"admin:add_ep:{anime_id}")
    )
    builder.row(
        InlineKeyboardButton(text="📝 Ma'lumotlarni tahrirlash", callback_data=f"admin:edit_info:{anime_id}")
    )
    builder.row(
        InlineKeyboardButton(text="🗑 Qismni o'chirish", callback_data=f"admin:del_ep:{anime_id}")
    )
    builder.row(
        InlineKeyboardButton(text="⬅️ Orqaga", callback_data="admin:edit_anime")
    )
    return builder.as_markup()


def admin_episodes_keyboard(anime_id: int, episodes: list, action: str = "del"):
    """Admin uchun qismlar ro'yxati"""
    builder = InlineKeyboardBuilder()

    buttons = []
    for ep in episodes:
        buttons.append(
            InlineKeyboardButton(
                text=f"{ep['episode_number']}-qism",
                callback_data=f"admin:{action}_episode:{ep['id']}"
            )
        )

    for i in range(0, len(buttons), 3):
        row = buttons[i:i+3]
        builder.row(*row)

    builder.row(
        InlineKeyboardButton(text="⬅️ Orqaga", callback_data=f"admin:select:{anime_id}")
    )

    return builder.as_markup()


def confirm_delete_keyboard(item_type: str, item_id: int):
    """O'chirishni tasdiqlash"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(
            text="✅ Ha, o'chirish",
            callback_data=f"admin:confirm_del:{item_type}:{item_id}"
        ),
        InlineKeyboardButton(
            text="❌ Bekor qilish",
            callback_data="admin:menu"
        )
    )
    return builder.as_markup()


def cancel_keyboard():
    """Bekor qilish tugmasi"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="❌ Bekor qilish", callback_data="admin:cancel")
    )
    return builder.as_markup()


def skip_keyboard():
    """O'tkazib yuborish tugmasi"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="⏭ O'tkazib yuborish", callback_data="admin:skip")
    )
    builder.row(
        InlineKeyboardButton(text="❌ Bekor qilish", callback_data="admin:cancel")
    )
    return builder.as_markup()


def done_or_next_keyboard(anime_id: int):
    """Tugatish yoki keyingi qism"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="➕ Keyingi qism", callback_data=f"admin:add_ep:{anime_id}")
    )
    builder.row(
        InlineKeyboardButton(text="✅ Tugatish", callback_data="admin:menu")
    )
    return builder.as_markup()


def skip_video_keyboard(anime_id: int):
    """Video o'tkazib yuborish tugmasi (anime qo'shgandan keyin)"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(text="⏭ Videosiz saqlash", callback_data=f"admin:skip_video:{anime_id}")
    )
    builder.row(
        InlineKeyboardButton(text="❌ Bekor qilish", callback_data="admin:cancel")
    )
    return builder.as_markup()


# ============== KANAL UCHUN TUGMALAR ==============

def channel_anime_list_keyboard(animes: list):
    """Kanalda anime ro'yxati tugmalari (deep link bilan)"""
    builder = InlineKeyboardBuilder()

    for anime in animes:
        episodes = anime["episodes_count"] or 0
        # Deep link: t.me/bot_username?start=anime_ID
        url = f"https://t.me/{BOT_USERNAME}?start=anime_{anime['id']}"
        builder.row(
            InlineKeyboardButton(
                text=f"📺 {anime['name']} ({episodes} qism)",
                url=url
            )
        )

    # Botga o'tish tugmasi
    builder.row(
        InlineKeyboardButton(
            text="🤖 Botga o'tish",
            url=f"https://t.me/{BOT_USERNAME}"
        )
    )

    return builder.as_markup()


def channel_single_anime_keyboard(anime_id: int):
    """Kanalda bitta anime uchun tugma"""
    builder = InlineKeyboardBuilder()
    builder.row(
        InlineKeyboardButton(
            text="▶️ Ko'rish",
            url=f"https://t.me/{BOT_USERNAME}?start=anime_{anime_id}"
        )
    )
    return builder.as_markup()
