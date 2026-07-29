# GoldenLife Victors — System Documentation

> **Version:** 1.0.0 | **Last Updated:** July 2026 | **Status:** Production

GoldenLife Victors is a world-class mental health and wellness organization dedicated to promoting mental health, rehabilitation, and community outreach across Kenya and Africa.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture](#3-architecture)
4. [Getting Started](#4-getting-started)
5. [Environment Variables](#5-environment-variables)
6. [Project Structure](#6-project-structure)
7. [Public Website](#7-public-website)
8. [Admin Panel](#8-admin-panel)
9. [API Reference](#9-api-reference)
10. [Deployment](#10-deployment)
11. [Troubleshooting](#11-troubleshooting)
12. [Roadmap](#12-roadmap)

---

## 1. Project Overview

The GoldenLife Victors platform is a full-stack web application consisting of:

- **Public Website** — Blog, Events, About, Gallery, Contact, Programmes
- **Admin Panel** — Content management for posts, events, categories, tags, and comment moderation
- **REST API Integration** — Two separate backend services (Auth + Blog/Content)

### Key Features

| Feature | Status |
|---|---|
| Blog with categories, tags, comments | ✅ Live |
| Events management (public + admin) | ✅ Live |
| Admin dashboard with analytics | ✅ Live |
| Comment moderation (approve/reject) | ✅ Live |
| Dark mode | ✅ Live |
| Image upload (AWS S3) | ✅ Live |
| Forgot/reset password | ✅ Live |
| Programmes & User management | 🔄 Phase 2 |

---

## 2. Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.x | React framework (App Router) |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| NextAuth.js | 4.x | Authentication |
| next-themes | 0.3.x | Dark/light mode |
| date-fns | 3.x | Date formatting |
| react-hot-toast | 2.x | Notifications |
| @iconify/react | 5.x | Icons |
| aos | 2.x | Scroll animations |

### Backend Services
| Service | URL | Purpose |
|---|---|---|
| Auth Service | `https://golden-life-auth-pdae.onrender.com` | Login, signup, password reset |
| Blog Service | `https://golden-life-blog-9351.onrender.com` | Posts, events, comments, tags, categories |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting & CI/CD |
| Render (Free Tier) | Backend API hosting |
| AWS S3 | Image/media storage |

---

## 3. Architecture

```
┌─────────────────────────────────────────────┐
│              Vercel (Frontend)               │
│                                              │
│  ┌─────────────┐     ┌────────────────────┐ │
│  │ (site)      │     │ (admin)            │ │
│  │ Public Pages│     │ Admin Panel        │ │
│  │ /blog       │     │ /admin/dashboard   │ │
│  │ /events     │     │ /admin/posts       │ │
│  │ /about      │     │ /admin/events      │ │
│  │ /gallery    │     │ /admin/comments    │ │
│  └─────────────┘     └────────────────────┘ │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │  Next.js API Route — /api/auth/[...]    │ │
│  └─────────────────────────────────────────┘ │
└──────────┬──────────────────┬────────────────┘
           │                  │
    ┌──────▼──────┐    ┌──────▼──────────────┐
    │ Auth Service │    │   Blog Service       │
    │ (Render)     │    │   (Render)           │
    └─────────────┘    └──────────────────────┘
                                │
                        ┌───────▼───────┐
                        │    AWS S3      │
                        │  (Images)      │
                        └───────────────┘
```

### Route Groups

```
src/app/
├── layout.tsx              ← Root layout (providers only)
├── (site)/
│   ├── layout.tsx          ← Header, Footer, AOS
│   ├── page.tsx            ← Homepage
│   ├── blog/
│   ├── events/
│   ├── about/
│   ├── gallery/
│   ├── contact/
│   └── (auth)/
│       ├── signin/
│       ├── signup/
│       ├── forgot-password/
│       └── reset-password/
└── (admin)/
    ├── layout.tsx          ← Admin sidebar (role-protected)
    ├── dashboard/
    ├── posts/
    ├── events/
    ├── categories/
    ├── tags/
    └── comments/
```

---

## 4. Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/goldenlife-victors.git
cd goldenlife-victors

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in values — see Section 5

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

---

## 5. Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Authentication ─────────────────────────────────────
# Auth service base URL
API_BASE_URL=https://golden-life-auth-pdae.onrender.com
NEXT_PUBLIC_API_BASE_URL=https://golden-life-auth-pdae.onrender.com

# ── Blog / Content Service ──────────────────────────────
BLOG_API_BASE_URL=https://golden-life-blog-9351.onrender.com
NEXT_PUBLIC_BLOG_API_BASE_URL=https://golden-life-blog-9351.onrender.com

# ── NextAuth ───────────────────────────────────────────
NEXTAUTH_SECRET=your-random-secret-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# ── OAuth Providers (optional) ─────────────────────────
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# ── Site Metadata ──────────────────────────────────────
SITE_NAME=GoldenLife Victors
AUTHOR_NAME=GoldenLife Victors
```

> ⚠️ Never commit `.env.local` to Git. It is already in `.gitignore`.

---

## 6. Project Structure

```
goldenlife-victors/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (site)/             # Public-facing pages
│   │   ├── (admin)/            # Admin panel pages
│   │   └── api/auth/           # NextAuth API route
│   ├── components/
│   │   ├── Admin/              # RichTextEditor, admin UI
│   │   ├── Auth/               # SignIn, SignUp forms
│   │   ├── Blog/               # BlogCard, CommentSection, ShareButtons
│   │   ├── Common/             # Loader, UnauthorizedToast
│   │   ├── Gallery/            # GalleryImage
│   │   ├── Home/               # Hero, Help, Causes, Newsletter...
│   │   ├── Layout/             # Header, Footer, Logo
│   │   └── SharedComponent/    # HeroSub, Volunteer, Blog cards
│   ├── lib/
│   │   └── authOptions.ts      # NextAuth configuration
│   ├── types/
│   │   ├── api.types.ts        # Post, Event, Comment, Category, Tag
│   │   └── next-auth.d.ts      # Session type augmentation
│   └── utils/
│       ├── blogApi.ts          # All API functions
│       ├── formatDate.ts       # Safe date formatting
│       └── markdown.ts         # Legacy markdown utilities
├── public/
│   └── images/                 # Static assets
├── middleware.ts               # Role-based route protection
├── next.config.mjs             # Image domains, config
└── package.json
```

---

## 7. Public Website

### Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, programmes overview, blog preview, newsletter |
| `/blog` | Blog listing page |
| `/blog/[id]` | Single blog post with comments |
| `/events` | Events listing |
| `/events/[id]` | Single event detail with meet link |
| `/about` | About Us — story, mission, vision, values |
| `/gallery` | Photo gallery by category |
| `/contact` | Contact form |
| `/cause` | Causes/programmes |
| `/signin` | Sign in |
| `/signup` | Create account |
| `/forgot-password` | Password reset request |
| `/reset-password` | Set new password (via email token) |

### Comments Flow

```
Visitor submits comment (name + email + text)
        ↓
POST /comments/public/{postId}
        ↓
Comment saved with status: PENDING
        ↓
Admin reviews at /admin/comments
        ↓
Admin approves → status: APPROVED → appears on post page
Admin rejects  → status: REJECTED → hidden from public
```

---

## 8. Admin Panel

### Access
- URL: `/admin/dashboard`
- Roles required: `ROLE_ADMIN` or `DEVELOPER`
- `ROLE_USER` accounts are redirected to homepage

### Admin Pages

| Route | Purpose |
|---|---|
| `/admin/dashboard` | Stats overview, recent posts & events |
| `/admin/posts` | List posts — My Posts / Published / Draft tabs |
| `/admin/posts/new` | Create post with rich text editor |
| `/admin/posts/[id]` | Edit post, change status, upload image |
| `/admin/events` | List events — All / Published / Draft tabs |
| `/admin/events/new` | Create event |
| `/admin/events/[id]` | Edit event |
| `/admin/categories` | Create and delete categories |
| `/admin/tags` | Create tags (comma-separated bulk input) |
| `/admin/comments` | Moderate comments — Pending / Approved / Rejected |

### Creating a Blog Post

1. Go to `/admin/posts/new`
2. Enter title and write content using the rich text editor
3. Select a category (required)
4. Optionally select or create tags
5. Choose status: **Draft** (save for later) or **Published** (go live)
6. Optionally upload a cover image
7. Click **Save Draft** or **Publish Post**

> 📌 Images are uploaded separately after the post is created — the system creates the post first, gets the ID, then uploads the image to `/posts/{id}/image`.

### Comment Moderation

1. Go to `/admin/comments`
2. Default view shows **Pending** comments
3. Click **Approve** to make a comment visible on the post
4. Click **Reject** to hide it permanently
5. Use filter tabs to view All / Pending / Approved / Rejected

---

## 9. API Reference

### Authentication — Auth Service
`Base: https://golden-life-auth-pdae.onrender.com`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/public/signin` | None | Login — returns `jwtToken`, `roles[]` |
| POST | `/api/auth/signup` | None | Register new user |
| POST | `/api/auth/public/forgot-password?email=` | None | Send password reset email |
| POST | `/api/auth/public/reset-password?token=&newPassword=` | None | Reset password |

### Blog Service
`Base: https://golden-life-blog-9351.onrender.com/api/v1`

#### Posts
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/posts/public` | None | All published posts |
| GET | `/posts/public/{id}` | None | Single post + comments |
| GET | `/posts/admin` | Bearer | Admin posts, `?status=DRAFT\|PUBLISHED` |
| POST | `/posts` | Bearer | Create — body uses `status` key |
| PUT | `/posts/{id}` | Bearer | Update — body uses `postStatus` key |
| DELETE | `/posts/{id}` | Bearer | Returns plain text |
| POST | `/posts/{id}/image` | Bearer | Multipart form, key: `image` |

#### Events
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/events/public` | None | Wrapped: `{ data: [] }` |
| GET | `/events/public/{id}` | None | Wrapped: `{ data: {} }` |
| GET | `/events/admin` | Bearer | **Plain fetch only — no Content-Type** |
| POST | `/events/admin` | Bearer | Create event |
| PUT | `/events/admin/{id}` | Bearer | Full body required |
| POST | `/events/{id}/image` | Bearer | Multipart form |

#### Comments
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| POST | `/comments/public/{postId}` | None | `{ content, authorName, authorEmail }` |
| GET | `/comments/admin` | Bearer | `?status=PENDING\|APPROVED\|REJECTED` |
| PUT | `/comments/{id}/approve` | Bearer | No body |
| PUT | `/comments/{id}/reject` | Bearer | No body |

#### Categories & Tags
| Method | Endpoint | Auth |
|---|---|---|
| GET | `/categories` | None |
| POST | `/categories` | Bearer |
| DELETE | `/categories/{id}` | Bearer |
| GET | `/tags` | None |
| POST | `/tags` | Bearer — `{ names: string[] }` |

---

## 10. Deployment

### Vercel (Frontend)

1. Connect GitHub repository to Vercel
2. Set all environment variables in Vercel dashboard → Settings → Environment Variables
3. Vercel auto-deploys on every push to `main`

> ⚠️ **Important:** Blog and events pages use `export const dynamic = "force-dynamic"` to prevent build-time fetch timeouts against the Render backend cold start.

### next.config.mjs — Required Image Domains

```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.*.amazonaws.com" },
      { protocol: "https", hostname: "golden-life-blog-9351.onrender.com" },
    ],
  },
};
export default nextConfig;
```

---

## 11. Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Blog page times out on Vercel build | Render backend cold start (~50s) | Ensure `export const dynamic = "force-dynamic"` on page |
| Images not loading | S3 domain not in `next.config.mjs` | Add `*.s3.amazonaws.com` to remotePatterns |
| Login fails | Wrong endpoint path | Auth uses `/api/auth/public/signin` (note `/public/`) |
| Events not loading in admin | `Content-Type` header on GET | `getAdminEvents` uses plain fetch — don't use `authFetch` |
| `useSearchParams` build error | Missing Suspense boundary | Wrap component in `<Suspense fallback={null}>` |
| `authOptions` export error | Named exports in route.ts | Keep `authOptions` in `src/lib/authOptions.ts` |
| Admin accessible to ROLE_USER | Middleware file location | Must be at `src/middleware.ts` — not inside `app/` |

---

## 12. Roadmap

### Phase 2 (Planned)
- [ ] Programmes CRUD (pending backend endpoints)
- [ ] User management (pending backend endpoints)
- [ ] Newsletter subscription backend integration
- [ ] Donation gateway integration
- [ ] Meta/social media integration for digital marketing
- [ ] Gallery images (replace placeholders with real photos)
- [ ] SEO enhancements — `metadataBase`, structured data

### Phase 3 (Future)
- [ ] Mobile app (React Native / Expo)
- [ ] Event registration & ticketing
- [ ] Volunteer portal
- [ ] Donor dashboard

---

## License

© 2026 GoldenLife Victors International. All rights reserved.

---

*Documentation maintained by the GoldenLife Victors development team.*