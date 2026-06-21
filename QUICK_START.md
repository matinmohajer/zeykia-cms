# Quick Start Guide

## 🚀 Commands

### Create Project (Already Done)

```bash
cd "/Users/matinmohajer/Documents/Carpet Project - Miss Arian/zeykia-strapi"
npx create-strapi@latest zeykia-cms --quickstart --no-run --skip-cloud
```

### Development

```bash
cd zeykia-cms

# Create .env file
cp env.template .env
# Edit .env and add your secrets (generate with command below)

# Generate secrets (run 4 times for APP_KEYS, once for each other secret)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Start development server
npm run develop
```

### Production

```bash
# Build admin panel
npm run build

# Start production server
npm run start
```

---

## 📝 Environment Variables

Copy `env.template` to `.env` and fill in:

```bash
cp env.template .env
```

Required variables:
- `APP_KEYS` (4 comma-separated keys)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `JWT_SECRET`

Generate each with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## ✅ Admin Panel Setup (After First Login)

1. **Add Locales**: Settings → Internationalization → Add `fa`, `ar`
2. **Create API Token**: Settings → API Tokens → Create `NextFrontend` (Read-only)
3. **Set Permissions**: Enable `find` and `findOne` for all 5 content types
4. **Test Content**: Create a test product with translations

See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed steps.

---

## 🧪 Smoke Tests

Replace `YOUR_API_TOKEN` with your actual token:

```bash
# Products (English)
curl -X GET "http://localhost:1337/api/products?locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# Products (Persian)
curl -X GET "http://localhost:1337/api/products?locale=fa&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# Page by Slug
curl -X GET "http://localhost:1337/api/pages?filters[slug][\$eq]=home&locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# Colors
curl -X GET "http://localhost:1337/api/colors?locale=ar&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide
- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Admin panel configuration
- **[README.md](./README.md)** - Project overview

---

## 🎯 Content Types

All content types are pre-configured with i18n:

1. **Product** - Products with price, material, size, collection type
2. **Collection** - Marketing collections with slug
3. **Color** - Colors with hex, hue, story, inspiration
4. **Page** - CMS pages with slug (not localized)
5. **Statement** - Brand statements with themes

---

## 🔗 Frontend Integration

Your Next.js frontend should call:

```javascript
const response = await fetch(
  `http://localhost:1337/api/products?locale=${locale}&populate=*`,
  {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }
);
```

---

## ⚙️ Production Checklist

- [ ] Generate new secrets for production
- [ ] Set up PostgreSQL database
- [ ] Configure `DATABASE_*` environment variables
- [ ] Set up media storage (S3/R2) or keep local
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Build admin panel: `npm run build`
- [ ] Test all API endpoints
- [ ] Verify CORS allows production frontend

See [SETUP.md](./SETUP.md) for production configuration details.

