# Admin Panel Setup Checklist

This guide provides step-by-step instructions for configuring the Strapi admin panel after initial setup.

## Prerequisites

- Strapi is running on `http://localhost:1337`
- You have created your first admin user
- You are logged into the admin panel

---

## Step 1: Add Internationalization Locales

### Navigate to Internationalization Settings

1. Click on **Settings** in the left sidebar (gear icon at the bottom)
2. Click on **Internationalization** under the "Global Settings" section

### Add Locales

1. You should see the default locale (`en` - English) already configured
2. Click **Add new locale** button
3. Add **Persian (Farsi)**:
   - Select `fa` from the locale dropdown
   - Click **Add**
4. Click **Add new locale** again
5. Add **Arabic**:
   - Select `ar` from the locale dropdown
   - Click **Add**

### Verify Locales

You should now see three locales:
- `en` (English) - Default
- `fa` (Persian)
- `ar` (Arabic)

---

## Step 2: Verify Content Types

### Navigate to Content-Type Builder

1. Click on **Content-Type Builder** in the left sidebar
2. You should see all 5 content types:
   - **Product** (`products`)
   - **Collection** (`collections`)
   - **Color** (`colors`)
   - **Page** (`pages`)
   - **Statement** (`statements`)

### Verify i18n is Enabled

For each content type:
1. Click on the content type name
2. Check that **Internationalization** is enabled (you should see a globe icon)
3. Verify that localized fields show the globe icon next to them

**Note:** The `slug` field in Pages should NOT have the globe icon (it's not localized).

---

## Step 3: Create API Token

### Navigate to API Tokens

1. Click on **Settings** in the left sidebar
2. Click on **API Tokens** under the "Users & Permissions plugin" section

### Create New Token

1. Click **Create new API Token** button (top right)
2. Fill in the form:
   - **Token name:** `NextFrontend`
   - **Token description:** `Read-only token for Next.js frontend`
   - **Token type:** Select **Read-only**
   - **Token duration:** Select **Unlimited** (or set a specific date)

### Set Permissions

Scroll down to **Token permissions** section:

1. Under **Product**:
   - ✅ Check **find** (read list)
   - ✅ Check **findOne** (read single)
   - ❌ Leave **create**, **update**, **delete** unchecked

2. Under **Collection**:
   - ✅ Check **find**
   - ✅ Check **findOne**
   - ❌ Leave others unchecked

3. Under **Color**:
   - ✅ Check **find**
   - ✅ Check **findOne**
   - ❌ Leave others unchecked

4. Under **Page**:
   - ✅ Check **find**
   - ✅ Check **findOne**
   - ❌ Leave others unchecked

5. Under **Statement**:
   - ✅ Check **find**
   - ✅ Check **findOne**
   - ❌ Leave others unchecked

### Save and Copy Token

1. Click **Save** button
2. **IMPORTANT:** Copy the token immediately - you won't be able to see it again!
3. Store it securely (e.g., in your Next.js `.env.local` as `NEXT_PUBLIC_STRAPI_API_TOKEN`)

---

## Step 4: Test Content Creation

### Create a Test Product

1. Click on **Content Manager** in the left sidebar
2. Click on **Product** → **Create new entry**
3. Fill in the form:
   - **Name:** `Test Product`
   - **Description:** `This is a test product`
   - **Price:** `99.99`
   - **Material:** `Wool`
   - **Size:** `200x300 cm`
   - **Collection:** Select `public` or `vip`
   - **Limited:** Leave unchecked (or check if it's limited)
   - **Image:** Upload a test image
4. Click **Save** (top right)
5. Click **Publish** to make it available via API

### Add Localized Versions

After saving, you'll see a **Locations** section:

1. Click **Add another locale**
2. Select **Persian (fa)**
3. Fill in the Persian translation:
   - **Name:** `محصول تست`
   - **Description:** `این یک محصول تست است`
   - etc.
4. Click **Save** and **Publish**

5. Repeat for **Arabic (ar)**:
   - Click **Add another locale** → Select **Arabic (ar)**
   - Fill in Arabic translations
   - Click **Save** and **Publish**

### Verify Localizations

In the entry view, you should see:
- **Locations:** Shows all 3 locales (en, fa, ar)
- Clicking on a locale switches the view to that language's content

---

## Step 5: Test API Endpoints

### Using curl (Terminal)

Replace `YOUR_API_TOKEN` with the token you copied:

```bash
# Test Products (English)
curl -X GET "http://localhost:1337/api/products?locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"

# Test Products (Persian)
curl -X GET "http://localhost:1337/api/products?locale=fa&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"

# Test Page by Slug (English)
curl -X GET "http://localhost:1337/api/pages?filters[slug][\$eq]=test-page&locale=en&populate=*" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

### Using Browser (with Extension)

Install a REST client extension (e.g., REST Client for VS Code, or use Postman):

1. URL: `http://localhost:1337/api/products?locale=en&populate=*`
2. Method: `GET`
3. Headers:
   - `Authorization: Bearer YOUR_API_TOKEN`
   - `Content-Type: application/json`

### Expected Response

You should receive a JSON response with:
- `data` array containing your products
- Each product has `attributes` with all fields
- Media fields include full URL paths
- `locale` field shows the current locale
- `localizations` array shows linked locales

---

## Step 6: Verify Permissions

### Check Public Access is Disabled

1. Navigate to **Settings** → **Users & Permissions plugin** → **Roles** → **Public**
2. Verify that **all permissions are unchecked** (no public access)
3. Navigate to **Authenticated** role
4. Verify that **all permissions are unchecked** (unless you want authenticated users to have access)

**Important:** Only API tokens should have read access. No public endpoints should be enabled.

---

## Troubleshooting

### Content Types Not Showing

- **Solution:** Restart Strapi (`npm run develop`)
- Content types are auto-registered from schema files

### i18n Not Working

- **Check:** Settings → Internationalization → Verify locales are added
- **Check:** Content-Type Builder → Verify i18n is enabled on content types
- **Check:** Individual fields have the globe icon (for localized fields)

### API Returns 403 Forbidden

- **Check:** API token has correct permissions (Settings → API Tokens)
- **Check:** Token is included in `Authorization` header
- **Check:** Token hasn't expired (if duration was set)

### CORS Errors in Frontend

- **Check:** `.env` has `FRONTEND_URL` set correctly
- **Check:** `config/middlewares.ts` has CORS configured
- **Check:** Frontend URL matches exactly (including protocol and port)

### Media URLs Not Working

- **Check:** `APP_URL` is set in `.env` (for absolute URLs)
- **Check:** Media files are uploaded and published
- **Check:** `populate=*` is included in API query

---

## Next Steps

After completing this checklist:

1. ✅ Create more content in all locales
2. ✅ Test all API endpoints
3. ✅ Integrate with Next.js frontend
4. ✅ Set up production database (PostgreSQL)
5. ✅ Configure production media storage (S3/R2)
6. ✅ Deploy to production

For detailed information, see [SETUP.md](./SETUP.md).

