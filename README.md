# Zentic

**Compare homes with clarity.**

Zentic is a property comparison tool that helps house-hunters make confident decisions. Instead of juggling browser tabs and spreadsheets, users can search for properties, select their shortlist, and see a clean side-by-side comparison with pros, cons, and highlighted differences.

🔗 **Beta:** [https://zentic-one.vercel.app/](https://zentic-one.vercel.app/)

---

## The Problem

Property portals like Rightmove and OntheMarket are great for *finding* listings, but they don't help you *choose* between them.

Once you have 3–5 properties you like, you're on your own — opening tabs, taking notes, trying to remember which one had the better layout or the shorter commute. Comparison tools that exist are mostly browser extensions or don't explain *why* one property might be better than another.

Zentic is the decision layer on top of the search.

---

## Features

- **Search by location** — Enter a postcode or address to find properties in that area
- **Select 2–5 properties** — Pick the ones you want to compare
- **Side-by-side comparison** — See price, bedrooms, bathrooms, square footage, and layout at a glance
- **Pros and cons** — Each property has curated pros and cons so you understand the trade-offs
- **Highlighted differences** — Badges show the cheapest, largest, and best-value options
- **View original listing** — Click through to the original property listing
- **Save favorites** — Keep track of properties you're interested in
- **Save comparisons** — Revisit your comparisons anytime from your dashboard

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB with Prisma |
| Authentication | NextAuth.js |
| Deployment | Vercel |

---

## Status

**Beta** — Zentic is live and usable, but still evolving. I'm actively adding features based on user feedback.

Coming soon:
- More real property data (currently using sample data)
- Map view
- More

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/RaffyLeong/Zentic.git
cd Zentic

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env
# Fill in your database URL, NextAuth secret, and Google OAuth credentials

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start the development server
npm run dev
