'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    username: 'anime_fan',
    email: 'anime_fan@example.com',
    notifications: true,
    newsletter: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Sozlamalar saqlandi (demo)');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/profile" className="hover:text-primary">Profil</Link>
          <span>/</span>
          <span className="text-foreground">Sozlamalar</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Sozlamalar</h1>

        {/* Profile Settings */}
        <section className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Profil ma'lumotlari</h2>

          <form onSubmit={handleSubmit}>
            {/* Avatar */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Profil rasmi</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <button type="button" className="btn btn-secondary text-sm mb-2">
                    Rasm yuklash
                  </button>
                  <p className="text-xs text-muted">JPG, PNG. Maksimum 2MB</p>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              O'zgarishlarni saqlash
            </button>
          </form>
        </section>

        {/* Password */}
        <section className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Parolni o'zgartirish</h2>

          <form onSubmit={(e) => { e.preventDefault(); alert('Parol o\'zgartirildi (demo)'); }}>
            <div className="mb-5">
              <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                Joriy parol
              </label>
              <input
                type="password"
                id="currentPassword"
                className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                Yangi parol
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium mb-2">
                Yangi parolni tasdiqlang
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Parolni yangilash
            </button>
          </form>
        </section>

        {/* Notifications */}
        <section className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Bildirishnomalar</h2>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium">Yangi epizod bildirishnomalari</div>
                <div className="text-sm text-muted">Ko'rayotgan animalaringizda yangi epizod chiqqanda xabar olish</div>
              </div>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="w-5 h-5 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium">Yangiliklar va takliflar</div>
                <div className="text-sm text-muted">Sayt yangiliklari va maxsus takliflar haqida xabar olish</div>
              </div>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-5 h-5 accent-primary"
              />
            </label>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2 text-red-500">Xavfli zona</h2>
          <p className="text-muted mb-4">
            Bu amallar qaytarib bo'lmaydi. Ehtiyot bo'ling!
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
              onClick={() => alert('Chiqish funksiyasi (demo)')}
            >
              Barcha qurilmalardan chiqish
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => {
                if (confirm('Hisobingizni o\'chirishni xohlaysizmi?')) {
                  alert('Hisob o\'chirildi (demo)');
                }
              }}
            >
              Hisobni o'chirish
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
