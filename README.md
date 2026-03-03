# 🍪 Happy Cookie Day - Web Sitesi

Eleventy (11ty) + Decap CMS ile oluşturulmuş, Netlify üzerinde barındırılan statik web sitesi.

## Özellikler

- **CMS Paneli**: `happycookieday.com/admin` adresinden içerik yönetimi
- **Modüler Kategori Yapısı**: Sınırsız kategori/alt kategori ekleme
- **Ürün Yönetimi**: Görsel, fiyat, Shopier linki ile ürün ekleme
- **Shopier Entegrasyonu**: Her üründe "Sipariş Ver" butonu
- **WhatsApp Butonu**: Sabit WhatsApp iletişim butonu
- **Responsive**: Mobil, tablet, masaüstü uyumlu
- **Ücretsiz Hosting**: Netlify free tier + otomatik SSL

## Kurulum (Adım Adım)

### 1. GitHub Repo Oluştur
```bash
# GitHub'da "happycookieday" adında yeni bir repo oluştur
# Sonra bu dosyaları yükle:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICIADIN/happycookieday.git
git push -u origin main
```

### 2. Netlify'a Bağla
1. [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
2. GitHub'ı bağla → "happycookieday" reposunu seç
3. Build settings otomatik algılanacak (netlify.toml sayesinde)
4. "Deploy site" tıkla

### 3. Domain Bağla
1. Netlify dashboard → Domain settings → Add custom domain
2. `happycookieday.com` yaz
3. Directnic panelinden DNS kayıtlarını güncelle:
   - A Record: `@` → `75.2.60.5` (Netlify IP)
   - CNAME: `www` → `NETLIFY_SITE_ADI.netlify.app`
4. SSL sertifikası otomatik oluşturulacak

### 4. CMS (Decap) Kurulumu
1. Netlify dashboard → Identity → Enable Identity
2. Registration → Invite only (sadece davetli kullanıcılar)
3. External providers → GitHub ekle (opsiyonel)
4. Git Gateway → Enable Git Gateway
5. Identity → Invite users → Arkadaşının e-mail adresini gir

### 5. `admin/config.yml` Güncelle
```yaml
backend:
  name: github
  repo: KULLANICIADIN/happycookieday  # ← Kendi GitHub kullanıcı adınla değiştir
```

### 6. İlk Giriş
1. `happycookieday.com/admin` adresine git
2. Davet e-postasındaki linke tıkla
3. Şifre oluştur
4. CMS paneline giriş yap

## Siteyi Açma (Under Construction → Asıl Site)

Site varsayılan olarak "Yakında Açılıyoruz" modunda açılır.
Ürünler ve içerikler hazır olduğunda:

1. Admin panel → Site Ayarları → Genel Ayarlar
2. **"Yapım Aşamasında Modu"** switch'ini **kapat**
3. "Yayınla" tıkla
4. Bitti! Asıl site otomatik olarak görünür.

## CMS Kullanımı (Arkadaşın İçin)

### Yeni Ürün Ekleme
1. Admin panel → Ürünler → "Yeni Ürün"
2. Ürün adı, açıklama, görseller, fiyat, Shopier linki gir
3. Kategori slug'ını yaz (örn: `soft-cookie`)
4. "Yayınla" tıkla

### Yeni Kategori Ekleme
1. Admin panel → Kategoriler → "Yeni Kategori"
2. Kategori adı gir
3. Alt kategori ise "Üst Kategori" alanına parent slug yaz (örn: `cookie`)
4. Ana kategori ise boş bırak
5. "Yayınla" tıkla

### Site Ayarları Güncelleme
1. Admin panel → Site Ayarları → Genel Ayarlar
2. Telefon, e-mail, sosyal medya linklerini güncelle
3. "Yayınla" tıkla

## Dosya Yapısı
```
happycookieday/
├── admin/
│   ├── index.html          # CMS giriş sayfası
│   └── config.yml          # CMS yapılandırması
├── src/
│   ├── _data/
│   │   └── site.json       # Site ayarları (CMS'den düzenlenir)
│   ├── _includes/
│   │   ├── base.njk        # Ana layout
│   │   ├── page.njk        # Sayfa layout
│   │   └── partials/
│   │       ├── header.njk  # Üst menü
│   │       └── footer.njk  # Alt bilgi
│   ├── assets/
│   │   ├── css/style.css   # Stil dosyası
│   │   └── images/         # Site görselleri
│   ├── categories/         # Kategori dosyaları (CMS'den yönetilir)
│   ├── products/           # Ürün dosyaları (CMS'den yönetilir)
│   ├── pages/              # Statik sayfalar
│   ├── index.njk           # Ana sayfa
│   ├── category.njk        # Kategori sayfa şablonu
│   └── 404.njk             # 404 sayfası
├── static/images/uploads/  # CMS'den yüklenen görseller
├── .eleventy.js            # Eleventy yapılandırması
├── netlify.toml            # Netlify yapılandırması
└── package.json
```

## Lokal Geliştirme
```bash
npm install
npm run dev     # localhost:8080'de çalışır
npm run build   # _site/ klasörüne derler
```

## Mevcut Kategoriler (41 adet)
Belgeden alınan kategori ağacı hazır olarak yüklenmiştir.
Görseller ve ürünler CMS panelinden eklenecektir.
