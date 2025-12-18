from datetime import datetime


def format_duration(seconds: int) -> str:
    """Sekundlarni 'MM:SS' formatiga o'tkazish"""
    if not seconds:
        return "00:00"

    minutes = seconds // 60
    secs = seconds % 60
    return f"{minutes}:{secs:02d}"


def truncate_text(text: str, max_length: int = 200) -> str:
    """Matnni qisqartirish"""
    if not text:
        return ""

    if len(text) <= max_length:
        return text

    return text[:max_length - 3].rstrip() + "..."


def format_number(number: int) -> str:
    """Sonni formatlash (1000 -> 1,000)"""
    return f"{number:,}"


def get_medal(position: int) -> str:
    """Pozitsiya uchun medal"""
    medals = {1: "🥇", 2: "🥈", 3: "🥉"}
    return medals.get(position, f"{position}.")


def format_datetime(dt: datetime) -> str:
    """Datetime ni formatlash"""
    if not dt:
        return "Noma'lum"

    return dt.strftime("%d.%m.%Y %H:%M")


def format_date(dt: datetime) -> str:
    """Date ni formatlash"""
    if not dt:
        return "Noma'lum"

    return dt.strftime("%d.%m.%Y")


def escape_html(text: str) -> str:
    """HTML belgilarni escape qilish"""
    if not text:
        return ""

    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def parse_callback_data(data: str, expected_parts: int = 2) -> list:
    """Callback data ni parse qilish"""
    parts = data.split(":")
    if len(parts) < expected_parts:
        return None
    return parts


def is_valid_year(year: int) -> bool:
    """Yilni tekshirish"""
    current_year = datetime.now().year
    return 1950 <= year <= current_year + 5
