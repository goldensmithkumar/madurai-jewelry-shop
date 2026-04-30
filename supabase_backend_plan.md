# Backend Architecture & Supabase Integration Plan

This plan details the full implementation of Authentication, Storage, and Database features for the Madurai Jewelry Shop using Next.js and Supabase.

## User Review Required
> [!IMPORTANT]
> Before we write any code, you need to create your Supabase project to get your database keys. Please follow the instructions below and confirm when you are ready!

### Step-by-Step Supabase Setup Instructions
1. Go to [database.new](https://database.new) (this goes to Supabase) and log in with GitHub or your email.
2. Click **"New Project"**.
3. Fill in the details:
   - **Name:** "Madurai Jewelry Shop"
   - **Database Password:** (Generate a secure password and save it somewhere safe!)
   - **Region:** Select a region closest to India (like Mumbai or Singapore) for the fastest speeds.
   - Click **Create new project**.
4. Once your project finishes building (takes ~2 minutes), go to the **Project Settings** (gear icon) -> **API** on the left menu.
5. In the API settings, find your **Project URL** and the **`anon` `public` API Key**.
6. **Reply back to me** with those two values, and I will set them up in your code securely!

## Proposed Changes

### Configuration & Utilities
- Install dependencies: `npm install @supabase/supabase-js @supabase/ssr`
- Create `.env.local` to securely store Supabase URL and Keys.
- Create Server and Client Supabase utility files in `src/lib/supabase/` to handle Next.js SSR Auth safely.

### Database Schema (PostgreSQL)
We will create the following tables using Supabase SQL:
1. **`profiles`**: Stores whether a user is an `admin` (shop owner) or a `customer`.
2. **`piercing_bookings`**: Stores Date, Time, Customer ID, and Status.
3. **`engraving_orders`**: Stores Order Details, Text to engrave, Image URL, and Shop ID.
4. **`customer_uploads`**: Stores Reference ID, Customer ID, and Image URL.

### Storage Buckets
We will create two separate storage buckets to ensure organization:
- `shop_images`: For shop owners to upload high-quality product / engraving images.
- `customer_images`: For customers to upload low-res reference photos.

### Authentication & UI
- **Customer Pages**: `/login`, `/register`, `/dashboard`, `/book-piercing`
- **Admin Pages**: `/admin/dashboard` (View bookings), `/admin/engravings` (Upload & view engraving requests).

## Verification Plan
### Automated Verification
- We will write small tests inside `src/app/api/health/route.ts` to verify Next.js connects to Supabase successfully.
- TypeScript will ensure strict type-matching for our database rows.

### Manual Verification
1. I will ask you to run `npm run dev`.
2. You will open the browser and attempt to **Sign Up** a new user account.
3. We will log into the Supabase Dashboard together to verify your new user is visible in the database.
