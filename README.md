# Zeykia CMS

Strapi v5 CMS for a multilingual Next.js 15 website with support for English (`en`), Persian (`fa`), and Arabic (`ar`).

## 🚀 Quick Start

### Prerequisites

- Node.js LTS (v20.x or v22.x)
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd zeykia-cms

# Install dependencies (already done if created with --quickstart)
npm install

# Create .env file (see SETUP.md for template)
cp .env.example .env
# Edit .env and add your secrets

# Start development server
npm run develop
```

Visit `http://localhost:1337/admin` to create your first admin user.

### Production Build

```bash
# Build admin panel
npm run build

# Start production server
npm run start
```

## 📋 Project Overview

This CMS provides:

- **5 Content Types**: Product, Collection, Color, Page, Statement
- **Multilingual Support**: i18n with en, fa, ar locales
- **REST API**: Read-only API tokens for frontend access
- **Media Management**: Local uploads (S3/R2 configurable for production)
- **CORS Configured**: Ready for Next.js frontend integration

## 📚 Documentation

See **[SETUP.md](./SETUP.md)** for complete setup instructions including:

- Environment variables
- Content type definitions
- i18n configuration
- API token setup
- Database configuration (SQLite/PostgreSQL)
- Media upload setup
- Smoke tests with curl examples

## 🎯 Content Types

1. **Product** - Product listings and detail pages
2. **Collection** - Marketing collections and featured collections
3. **Color** - Color library with stories and inspiration
4. **Page** - CMS-driven pages (About, Export, etc.)
5. **Statement** - Brand statements with themes

All content types support i18n with localized fields.

## 🔐 Security

- Read-only API tokens for frontend
- Admin panel restricted to authenticated users
- No public write/update/delete endpoints
- CORS configured for specific origins

## 🌐 API Endpoints

All endpoints follow the pattern:

```
GET /api/{content-type}?locale={locale}&populate=*
```

Example:

```bash
curl -X GET "http://localhost:1337/api/products?locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

See [SETUP.md](./SETUP.md) for complete API examples.

## 📖 Learn More

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi v5 Migration Guide](https://docs.strapi.io/dev-docs/migration/v4-to-v5)
- [Strapi i18n Guide](https://docs.strapi.io/user-docs/settings/internationalization)

---

<sub>Built with Strapi v5.33.1</sub>
