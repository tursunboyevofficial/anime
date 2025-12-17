import os
from dotenv import load_dotenv

load_dotenv()

# Bot token
BOT_TOKEN = os.getenv("BOT_TOKEN", "8534700957:AAF-Po56KTSsRY6ItmM1PJNep61gw2F5quk")

# Admin ID'lar (Telegram user ID)
ADMIN_IDS = [5291425408]  # @tursunboyevofficial

# Kanal sozlamalari
STORE_CHANNEL_ID = -1001234567890  # Yashirin kanal ID (@yumekai_store)
MAIN_CHANNEL = -1003514369530  # @yumekaiuz kanal ID
BOT_USERNAME = "yumekai_bot"  # Bot username (@ siz)

# Database
DATABASE_PATH = "data/yumekai.db"

# Sahifalash
ITEMS_PER_PAGE = 10

# Janrlar
GENRES = {
    "action": "⚔️ Action",
    "fantasy": "🔮 Fantasy",
    "comedy": "😂 Comedy",
    "romance": "💕 Romance",
    "horror": "👻 Horror",
    "drama": "🎭 Drama",
    "sports": "🏀 Sports",
    "music": "🎵 Music",
    "adventure": "🌍 Adventure",
    "sci_fi": "🚀 Sci-Fi",
    "slice_of_life": "☕ Slice of Life",
    "mystery": "🔍 Mystery",
}
