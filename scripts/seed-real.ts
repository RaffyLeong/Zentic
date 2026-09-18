// this as a fetching script that does three things:
// 1. Calls Apify (the scraping service) with a search query
// 2. Receives a list of raw listings from Rightmove/OnTheMarket
// 3. Saves them into your Neon database as Property rows

// get the data use: npx tsx scripts/seed-real.ts City1(RightMove) City2(OntheMarket) maxItems

import { ApifyClient } from 'apify-client';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();
const client = new ApifyClient({ token: process.env.APIFY_TOKEN });



// === RIGHTMOVE ===
async function scrapeRightmove(location: string, maxItems: number = 20) {
    console.log(`Scraping Rightmove for ${location}...`);

    // picks a specific Apify Actor (the scraper that knows how to read Rightmove)
    // and run it with the given input (searchLocation, listingType, maxItems)
    const run = await client.actor(`tagadanar/rightmove-scraper`).call({
        location: [location],
        listingType: 'sale',
        maxResults: maxItems, 
    });

    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    // loops through only the first maxItems
    const limited = items.slice(0, maxItems)
    console.log(` found ${items.length} Rightmove listings (using ${limited.length})`)

    for (const item of limited as any[]) {
        const property = {
            price: typeof item.price === 'string'
                ? parseInt(item.price.replace(/[^0-9]/g, '') || '0', 10)
                : (item.price || 0),
            bedrooms: item.bedrooms || 0,
            bathrooms: item.bathrooms || 0,
            sqft: item.sizeSqFt || null,
            address: item.displayAddress || 'Address not available',
            postcode: item.outcode || 'N/A',
            city: item.town || location,
            imageUrl: item.images?.[0] || item.mainImage || '',
            pros: item.keyFeatures?.slice(0, 3) || ['New listing'], // Apify scrapes RightMove, Returns JSON with "keyFeatures"
            cons: [],
            listingUrl: item.url || '#',
            lat: item.latitude || 0,
            lng: item.longitude || 0,
            agency: item.agentName || 'Unknown',
            platform: 'Rightmove',
            agentName: item.agentName || '',
            agentPhone: item.agentPhone || '',
        };

        // check if a property with the same listingUrl already exists
        const existing = await prisma.property.findFirst({
            where: { listingUrl: property.listingUrl }
        });

        // if not, display log message
        if (!existing) {
            await prisma.property.create({ data: property });
            console.log(`✅ Saved: ${property.address}`);
        } else {
            console.log(`⚠️ Skipped (already exists): ${property.address}`);
        }
    }
}

// === ONTHEMARKET ===
async function scrapeOnTheMarket(location: string, maxItems: number = 20) {
    console.log(`Scraping OnTheMarket for ${location}...`);

    const run = await client.actor(`solidcode/onthemarket-com-scraper`).call({
        searchLocations: [location],
        listingType: 'for-sale',
        maxResults: maxItems,
    });

    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    const limited = items.slice(0, maxItems)
    console.log(` found ${items.length} OnTheMarket listings (using ${limited.length})\n`)

    for (const item of limited as any[]) {
        const property = {
            price: item.priceValue || 0,
            bedrooms: item.bedrooms || 0,
            bathrooms: item.bathrooms || 0,
            sqft: item.sqft || null,
            address: item.address || 'Address not available',
            postcode: item.postcode || 'N/A',
            city: item.town || location,
            imageUrl: item.images?.[0]?.default || item.images?.[0]?.webp || '',
            pros: item.features?.slice(0, 3) || ['New listing'], // Apify scrapes OnTheMarket, Returns JSON with "features"
            cons: [],
            listingUrl: item.url || '#',
            lat: item.latitude || 0,
            lng: item.longitude || 0,
            agency: item.agentName || 'Unknown',
            platform: 'OnTheMarket',
            agentName: item.agentName || '',
            agentPhone: item.agentPhone || '',
        };

        const existing = await prisma.property.findFirst({
            where: { listingUrl: property.listingUrl }
        });

        if (!existing) {
            await prisma.property.create({ data: property });
            console.log(`✅ Saved: ${property.address}`);
        }
    }
}

// run the scrapers for both Rightmove and OnTheMarket
async function main() {
    // process.argv[2] is the first command line argument after "node scripts/seed-real.js"
    // process.argv[3] is the second command line argument after "node scripts/seed-real.js"
    // process.argv[4] is the third command line argument after "node scripts/seed-real.js"
    const rightmoveCity = process.argv[2] || 'London';
    const onTheMarketCity = process.argv[3] || 'London';
    const maxItems = parseInt(process.argv[4] || '10', 10);

    console.log(`\n🚀 Starting scrape`);
    console.log(`   Rightmove:     ${rightmoveCity} (${maxItems} items)`);
    console.log(`   OnTheMarket:   ${onTheMarketCity} (${maxItems} items)\n`);
    await scrapeRightmove(rightmoveCity, maxItems);
    await scrapeOnTheMarket(onTheMarketCity, maxItems);

    console.log('\n🎉 Done! Check Prisma Studio to see the data.');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
