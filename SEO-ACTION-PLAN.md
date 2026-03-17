# Hands Detail Shop — SEO Action Plan
## Push handsdetailshop.com to the Front of Google

---

## PHASE 1: IMMEDIATE (Do This Today)

### 1. Google Search Console Setup
This is the #1 priority. Without this, Google doesn't know to prioritize crawling your site.

1. Go to **https://search.google.com/search-console**
2. Sign in with your Google account
3. Click **"Add Property"**
4. Choose **"URL prefix"** and enter: `https://handsdetailshop.com`
5. Verify ownership using one of these methods:
   - **HTML tag method (easiest):** Google gives you a meta tag to add to your index.html `<head>` section
   - **HTML file method:** Download a verification file and add it to your GitHub repo
6. Once verified, go to **Sitemaps** in the left menu
7. Enter: `sitemap.xml` and click **Submit**
8. Google will now crawl and index all your pages

### 2. Google Analytics 4 Setup
You need real analytics to track visitors and see what's working.

1. Go to **https://analytics.google.com**
2. Click **"Start measuring"** (or create a new property)
3. Property name: **Hands Detail Shop**
4. Select **United States**, currency **USD**
5. Choose **Business** category
6. Select web platform, enter `https://handsdetailshop.com`
7. You'll get a **Measurement ID** that looks like: `G-XXXXXXXXXX`
8. Replace `G-XXXXXXXXXX` in the code with your real ID (it's in index.html lines 62-68)
9. Add the same GA code to ALL your other HTML pages too (currently only index.html has it)

### 3. Google Business Profile (CRITICAL for Local SEO)
This is what gets you in the **Google Map Pack** — the top 3 map results that appear for local searches.

1. Go to **https://business.google.com**
2. Sign in and click **"Add your business"**
3. Business name: **Hands Detail Shop**
4. Category: **Auto Detailing Service**
5. Since you're mobile, select **"I deliver goods and services to my customers"**
6. Service area: **Arnold, PA** and surrounding cities (Pittsburgh, Fox Chapel, Sewickley Heights, New Kensington, Plum, Murrysville, Upper St. Clair)
7. Phone: **(412) 752-8684**
8. Website: **https://handsdetailshop.com**
9. Verify your business (Google mails a postcard with a code, or may offer phone/email verification)
10. Once verified:
    - Add photos of your work (before/after shots are gold)
    - Add your services with prices
    - Set your hours
    - Write a business description with keywords
    - Start asking satisfied customers to leave Google Reviews

---

## PHASE 2: THIS WEEK

### 4. Get Listed on Business Directories (Backlinks)
Each listing creates a "backlink" that tells Google your business is legitimate.

Submit to these FREE directories:
- **Yelp** - https://biz.yelp.com (create business listing)
- **Facebook Business Page** - You have one, make sure website link is current
- **Apple Maps** - https://mapsconnect.apple.com
- **Bing Places** - https://www.bingplaces.com
- **Yellow Pages** - https://www.yellowpages.com (add free listing)
- **BBB** - https://www.bbb.org (request listing)
- **Nextdoor** - https://business.nextdoor.com (powerful for local)
- **Thumbtack** - https://www.thumbtack.com (service-based businesses)
- **Angi (formerly Angie's List)** - https://www.angi.com

**CRITICAL:** Make sure your NAP (Name, Address, Phone) is IDENTICAL across all listings:
- Name: **Hands Detail Shop**
- Phone: **(412) 752-8684**
- Website: **https://handsdetailshop.com**
- Area: **Arnold, PA / Greater Pittsburgh Area**

### 5. Ask for Google Reviews
Google Reviews are one of the biggest local ranking factors.

- Ask every satisfied customer to leave a Google Review
- Make it easy: create a direct review link from your Google Business Profile
- Aim for 10+ reviews in the first month
- Respond to every review (Google rewards engagement)

---

## PHASE 3: ONGOING

### 6. Content Strategy — Add More Blog Pages
Each blog page is a new opportunity to rank for different keywords. Create pages targeting:

- "How to Protect Your Car from Pittsburgh Road Salt" (winter keyword)
- "Ceramic Coating vs Wax: Which is Right for Your Vehicle?" (comparison keyword)
- "How Often Should You Detail Your Car?" (FAQ keyword)
- "Why Mobile Detailing Saves You Time and Money" (service keyword)
- "5 Signs Your Car Needs Professional Detailing" (awareness keyword)
- "Veteran-Owned Businesses in Pittsburgh" (community keyword)

### 7. Social Media Links to Website
Every social post should drive traffic back to handsdetailshop.com:
- Share before/after photos with a link to your gallery page
- Share blog articles on Facebook and Instagram
- Post customer reviews with a link to your reviews page

### 8. Page Speed Optimization
Google uses page speed as a ranking signal. The 4.2MB image file (IMG_20250919_124905970_HDR_AE.jpg) is slowing things down.

Action items:
- Remove or replace the 4.2MB original image — you already have the optimized 193KB version
- Test your site speed at https://pagespeed.web.dev/
- Aim for 90+ score on mobile

---

## WHAT WAS FIXED IN THIS UPDATE

| Fix | Description |
|-----|-------------|
| Promo Banner | Updated "NEW YEAR SPECIAL" to "SPRING SPECIAL" across all pages |
| Google Analytics | Replaced broken `GA_MEASUREMENT_ID` placeholder with proper format |
| Sitemap | Updated all dates to 2026-02-13, added 6 missing pages (booking, gallery, faq, gift-certificates, rewards, portal, blog) |
| Blog Page | Converted markdown blog article to full SEO-optimized HTML with Article schema markup, breadcrumbs, author box, and CTAs |
| Facebook Link | Updated structured data from placeholder to actual Facebook URL |
| llms.txt | Updated experience to "16+ years" |

---

## COMMIT THESE CHANGES

After reviewing the files, push to GitHub:

```bash
git add -A
git commit -m "SEO overhaul: updated sitemap, added blog page, fixed analytics, updated promos"
git push origin main
```

GitHub Pages will automatically deploy the changes.

---

## TRACKING PROGRESS

After completing Phase 1, check these weekly:
1. **Google Search Console** → Performance tab shows your impressions and clicks
2. **Google Analytics** → Shows real-time and daily visitors
3. **Search your keywords** → "auto detailing Arnold PA", "mobile detailing Pittsburgh"

Expect to see movement within 2-4 weeks of submitting to Search Console and getting your Google Business Profile verified. The map pack listing will have the biggest immediate impact on phone calls and bookings.
