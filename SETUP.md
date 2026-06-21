# Zeykia CMS - Setup Guide

This is a Strapi v5 CMS configured for a multilingual Next.js 15 website with locales: `en`, `fa`, and `ar`.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Environment Variables](#environment-variables)
3. [Content Types](#content-types)
4. [Internationalization (i18n) Setup](#internationalization-i18n-setup)
5. [API Token Configuration](#api-token-configuration)
6. [CORS Configuration](#cors-configuration)
7. [Database Configuration](#database-configuration)
8. [Media Upload Setup](#media-upload-setup)
9. [Smoke Tests](#smoke-tests)

---

## Quick Start

### 1. Create the Project

```bash
cd "/Users/matinmohajer/Documents/Carpet Project - Miss Arian/zeykia-strapi"
npx create-strapi@latest zeykia-cms --quickstart --no-run --skip-cloud
```

### 2. Install Dependencies

Dependencies are already installed during project creation. If needed:

```bash
cd zeykia-cms
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
# Or create manually (see Environment Variables section below)
```

**Important:** Generate new secrets for production! Use:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Run Development Server

```bash
npm run develop
```

This will:
- Start Strapi on `http://localhost:1337`
- Open the admin panel registration page
- Create your first admin user

### 5. Build and Run Production

```bash
# Build admin panel
npm run build

# Start production server
npm run start
```

---

## Environment Variables

Create a `.env` file in the project root with the following:

```env
# Server Configuration
HOST=0.0.0.0
PORT=1337

# Strapi Secrets (Generate new ones for production!)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret

# Database Configuration
# Development: SQLite (default)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Production: PostgreSQL (uncomment and configure)
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=zeykia_cms
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=your_secure_password
# DATABASE_SSL=false
# DATABASE_SCHEMA=public

# Alternative: Use DATABASE_URL connection string
# DATABASE_URL=postgresql://username:password@host:port/database

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Generating Secrets

Run this command 4 times to generate APP_KEYS (comma-separated), and once each for the other secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Content Types

The following content types have been created programmatically:

### 1. Product (`products`)

- **name** (Text, localized, required)
- **description** (Rich text, localized)
- **price** (Decimal, required)
- **material** (Text, localized)
- **size** (Text, localized)
- **collection** (Enum: `public`, `vip`, required)
- **limited** (Boolean, default: false)
- **image** (Media, single image, required)
- **detailImage** (Media, single image)

### 2. Collection (`collections`)

- **name** (Text, localized, required)
- **description** (Rich text, localized)
- **image** (Media, single image)
- **slug** (UID, based on name, required)
- **products** (Relation: one-to-many with Product)

### 3. Color (`colors`)

- **name** (Text, localized, required)
- **hex** (Text, required, validated as hex color `#RRGGBB`)
- **hue** (Enum: `blue`, `red`, `green`, `orange`, `purple`, `gold`, `neutral`, `featured`, `collection`)
- **story** (Rich text, localized)
- **inspiration** (Text, localized)
- **image** (Media, single image)

### 4. Page (`pages`)

- **slug** (UID, based on title, required, NOT localized)
- **title** (Text, localized)
- **subtitle** (Text, localized)
- **content** (Rich text, localized)
- **heroImage** (Media, single image)

### 5. Statement (`statements`)

- **theme** (Enum: `Craftsmanship`, `Artistry`, `Innovation`)
- **text** (Rich text, localized, required)
- **author** (Text, localized)
- **videoThumbnail** (Media, single image)
- **videoUrl** (Text/URL, optional)

---

## Internationalization (i18n) Setup

### Step 1: Add Locales

1. Log into the Strapi admin panel: `http://localhost:1337/admin`
2. Navigate to **Settings** → **Internationalization**
3. Click **Add new locale**
4. Add the following locales:
   - `en` (English) - Set as default
   - `fa` (Persian/Farsi)
   - `ar` (Arabic)

### Step 2: Enable i18n on Content Types

All content types are already configured with i18n enabled. The schemas include:

```json
"pluginOptions": {
  "i18n": {
    "localized": true
  }
}
```

Individual fields that should be localized have:

```json
"pluginOptions": {
  "i18n": {
    "localized": true
  }
}
```

**Note:** The `slug` field in Pages is NOT localized (as per requirements).

### Step 3: Create Localized Content

When creating content:
1. Select the default locale (`en`)
2. After saving, you'll see a "Locations" section
3. Click "Add another locale" to create translations
4. Each locale creates a separate entry linked via `localizations`

---

## API Token Configuration

### Create Read-Only API Token

1. Navigate to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Configure:
   - **Name:** `NextFrontend`
   - **Token type:** `Read-only`
   - **Token duration:** `Unlimited` (or set expiration)
4. Under **Token permissions**, enable **Read** for:
   - `Product`
   - `Collection`
   - `Color`
   - `Page`
   - `Statement`
5. Click **Save**
6. **Copy the token** - you won't be able to see it again!

### Frontend Usage

The Next.js frontend should use this token in API requests:

```javascript
const response = await fetch('http://localhost:1337/api/products?locale=en&populate=*', {
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
```

---

## CORS Configuration

CORS is already configured in `config/middlewares.ts` to allow:

- `http://localhost:3000` (development)
- `FRONTEND_URL` environment variable (production)

Allowed headers:
- `Authorization`
- `Content-Type`

To modify, edit `config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL || 'http://localhost:3000',
    ],
    headers: ['Authorization', 'Content-Type'],
  },
}
```

---

## Database Configuration

### Development (SQLite)

SQLite is the default and requires no additional setup. The database file is stored at `.tmp/data.db`.

### Production (PostgreSQL)

1. Install PostgreSQL client library (if not using DATABASE_URL):

```bash
npm install pg
```

2. Update `.env`:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=your_host
DATABASE_PORT=5432
DATABASE_NAME=zeykia_cms
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_password
DATABASE_SSL=true
DATABASE_SCHEMA=public
```

Or use a connection string:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

3. The database configuration is in `config/database.ts` and automatically uses environment variables.

---

## Media Upload Setup

### Development (Local)

Local uploads are configured by default. Files are stored in `public/uploads/`.

### Production Options

#### Option 1: AWS S3

1. Install the provider:

```bash
npm install @strapi/provider-upload-aws-s3
```

2. Configure in `config/plugins.ts`:

```typescript
export default {
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        params: {
          Bucket: process.env.AWS_BUCKET,
        },
      },
    },
  },
};
```

#### Option 2: Cloudflare R2

1. Install the provider:

```bash
npm install @strapi/provider-upload-cloudflare-r2
```

2. Configure in `config/plugins.ts`:

```typescript
export default {
  upload: {
    config: {
      provider: 'cloudflare-r2',
      providerOptions: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        accountId: process.env.R2_ACCOUNT_ID,
        bucket: process.env.R2_BUCKET,
        region: 'auto',
      },
    },
  },
};
```

### Media URLs

Strapi returns relative URLs by default. To get absolute URLs:

1. Set `APP_URL` in `.env`:

```env
APP_URL=http://localhost:1337
```

2. Or configure in `config/server.ts`:

```typescript
export default ({ env }) => ({
  url: env('APP_URL', 'http://localhost:1337'),
  // ... rest of config
});
```

---

## Smoke Tests

After setting up the API token, test the endpoints:

### 1. Get Products (English)

```bash
curl -X GET "http://localhost:1337/api/products?locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### 2. Get Products (Persian)

```bash
curl -X GET "http://localhost:1337/api/products?locale=fa&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Get Colors (Arabic)

```bash
curl -X GET "http://localhost:1337/api/colors?locale=ar&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### 4. Get Page by Slug (English)

```bash
curl -X GET "http://localhost:1337/api/pages?filters[slug][\$eq]=home&locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Get Collections (English)

```bash
curl -X GET "http://localhost:1337/api/collections?locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### 6. Get Statements (English)

```bash
curl -X GET "http://localhost:1337/api/statements?locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Expected Response Format

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Product Name",
        "description": "...",
        "price": 999.99,
        "image": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/image.jpg",
              "alternativeText": null,
              "width": 1920,
              "height": 1080
            }
          }
        },
        "locale": "en",
        "localizations": [
          {
            "id": 2,
            "locale": "fa"
          }
        ]
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

## Admin Panel Checklist

After first login, complete these steps:

- [ ] **Add Locales**: Settings → Internationalization → Add `en`, `fa`, `ar`
- [ ] **Verify Content Types**: Content-Type Builder → Verify all 5 types exist
- [ ] **Create API Token**: Settings → API Tokens → Create `NextFrontend` (Read-only)
- [ ] **Set Permissions**: Ensure API Token has read access to all content types
- [ ] **Test Content Creation**: Create a test product in English
- [ ] **Test Localization**: Add Persian and Arabic translations to the test product
- [ ] **Test API**: Use curl commands above to verify endpoints work

---

## Troubleshooting

### Content Types Not Appearing

If content types don't appear after first run:

1. Stop the server
2. Delete `.tmp` folder (if exists)
3. Run `npm run develop` again
4. Content types should auto-register

### i18n Not Working

- Verify locales are added in Settings → Internationalization
- Check that content types have `"localized": true` in their schema
- Ensure individual fields have `"localized": true` in pluginOptions

### CORS Errors

- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check `config/middlewares.ts` configuration
- Ensure frontend sends `Authorization` header

### Database Connection Issues (PostgreSQL)

- Verify credentials in `.env`
- Check PostgreSQL is running
- Test connection: `psql -h HOST -U USERNAME -d DATABASE_NAME`
- Ensure database exists: `CREATE DATABASE zeykia_cms;`

---

## Next Steps

1. Create your first admin user
2. Add locales (en, fa, ar)
3. Create API token for frontend
4. Start creating content!
5. Test API endpoints with curl or Postman
6. Integrate with your Next.js frontend

For more information, see the [Strapi Documentation](https://docs.strapi.io).

