import asyncio
import logging
import sys
import os

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage

from config import BOT_TOKEN
import database as db
from handlers.user import user_router
from handlers.admin import admin_router
from handlers.callbacks import callback_router


# Logging sozlamalari
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("bot.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger(__name__)


async def on_startup(bot: Bot):
    """Bot ishga tushganda"""
    # Data papkasini yaratish
    os.makedirs("data", exist_ok=True)

    # Database ni ishga tushirish
    await db.init_db()
    logger.info("Database initialized successfully")

    # Bot ma'lumotlarini olish
    bot_info = await bot.get_me()
    logger.info(f"Bot started: @{bot_info.username}")


async def on_shutdown(bot: Bot):
    """Bot to'xtaganda"""
    logger.info("Bot shutting down...")


async def main():
    """Asosiy funksiya"""
    # Bot va Dispatcher yaratish
    bot = Bot(
        token=BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    dp = Dispatcher(storage=MemoryStorage())

    # Startup va shutdown handlerlarini qo'shish
    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)

    # Routerlarni qo'shish
    dp.include_router(callback_router)  # Callback'lar birinchi
    dp.include_router(admin_router)     # Admin handlerlari
    dp.include_router(user_router)      # Foydalanuvchi handlerlari (oxirida)

    # Botni ishga tushirish
    logger.info("Starting bot...")
    try:
        await dp.start_polling(bot)
    finally:
        await bot.session.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Bot error: {e}")
