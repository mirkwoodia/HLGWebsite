'use client';

import Script from 'next/script';

/* ------------------------------------------------------------------ */
/*  fbq type declaration so TypeScript doesn't complain about window   */
/* ------------------------------------------------------------------ */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/* ------------------------------------------------------------------ */
/*  META PIXEL ID                                                      */
/*  From Events Manager > Data Sources > your Pixel > Setup. Update    */
/*  here if you ever swap pixels — it's used for both the script below */
/*  and the <noscript> fallback pixel. Same pixel drives both the      */
/*  Amazon and TikTok Shop buttons below.                              */
/* ------------------------------------------------------------------ */
const META_PIXEL_ID = '1207814908144470';

/* ==================================================================== */
/*  AMAZON                                                               */
/* ==================================================================== */

/*  Amazon Attribution / Associates tagged link so Amazon-side          */
/*  conversions can be tied back to this page and the Meta campaign     */
/*  that drove the click.                                               */
const AMAZON_URL = 'https://www.amazon.com/dp/B0GSG2GJV4?maas=maas_adg_86E2A57C6702E1E3B66386647BB22850_afap_abs&ref_=aa_maas&tag=maas';

/*  No clean way to sync this live from a static export without         */
/*  Amazon's Product Advertising API — update by hand when it changes.  */
const AMAZON_PRICE = '$44.99';

/*  Coupon and Sale Event tags are independent — both can be on at the  */
/*  same time and will just show side by side, which is fine.           */
const SHOW_AMAZON_COUPON = true;
const AMAZON_COUPON_TEXT = 'Clip Coupon';
const AMAZON_COUPON_PRICE = '$37.75';

const SHOW_AMAZON_SALE = false;
const AMAZON_SALE_TEXT = 'Sale Event';
const AMAZON_SALE_PRICE = '$36.99';
const AMAZON_SALE_DURATION = ''; // optional, e.g. 'Aug 30 – Sept 5' — leave blank to hide

/*  SEPARATE 3rd option: one combined callout showing the sale price +  */
/*  coupon discount = final price, e.g. "Sale Event $37.95 + Clip       */
/*  Coupon 15% off = Final Price $32.26". Independent of the two        */
/*  toggles above — turn it on/off regardless of what they're set to.   */
/*  No math happens on the page; type in all three numbers/words.       */
const SHOW_AMAZON_STACK = false;
const AMAZON_STACK_SALE_LABEL = 'Sale Event';
const AMAZON_STACK_SALE_PRICE = '$37.95';
const AMAZON_STACK_COUPON_LABEL = 'Clip Coupon';
const AMAZON_STACK_COUPON_PRICE = '15% off';
const AMAZON_STACK_FINAL_LABEL = 'Final Price';
const AMAZON_STACK_FINAL_PRICE = '$32.26';
const AMAZON_STACK_DURATION = ''; // optional, e.g. 'Aug 30 – Sept 5' — leave blank to hide

// Cross out AMAZON_PRICE wherever it's shown whenever any promo is active.
const AMAZON_HAS_PROMO = SHOW_AMAZON_COUPON || SHOW_AMAZON_SALE || SHOW_AMAZON_STACK;

/* ==================================================================== */
/*  TIKTOK SHOP                                                          */
/*  Same fields as Amazon above, mirrored for your TikTok Shop listing.  */
/* ==================================================================== */
const TIKTOK_URL = 'https://shop.tiktok.com/us/pdp/1732496860708770134';
const TIKTOK_PRICE = '$44.99';

const SHOW_TIKTOK_COUPON = false;
const TIKTOK_COUPON_TEXT = 'Clip Coupon';
const TIKTOK_COUPON_PRICE = '$37.75';

const SHOW_TIKTOK_SALE = false;
const TIKTOK_SALE_TEXT = 'Sale Event';
const TIKTOK_SALE_PRICE = '$36.99';
const TIKTOK_SALE_DURATION = ''; // optional, e.g. 'Aug 30 – Sept 5' — leave blank to hide

const SHOW_TIKTOK_STACK = true;
const TIKTOK_STACK_SALE_LABEL = 'Sale Event';
const TIKTOK_STACK_SALE_PRICE = '$37.95';
const TIKTOK_STACK_COUPON_LABEL = 'Clip Coupon';
const TIKTOK_STACK_COUPON_PRICE = '15% off';
const TIKTOK_STACK_FINAL_LABEL = 'Final Price';
const TIKTOK_STACK_FINAL_PRICE = '$32.26';
const TIKTOK_STACK_DURATION = 'Aug 6 - Aug 9'; // optional, e.g. 'Aug 30 – Sept 5' — leave blank to hide

// Cross out TIKTOK_PRICE wherever it's shown whenever any promo is active.
const TIKTOK_HAS_PROMO = SHOW_TIKTOK_COUPON || SHOW_TIKTOK_SALE || SHOW_TIKTOK_STACK;

/* ------------------------------------------------------------------ */
/*  USAGE PHOTOS                                                       */
/*  Drop your four photos into /public/images/ using these filenames   */
/*  (or edit the src paths below to match whatever you name them).     */
/*  512px+ square JPGs/WebPs work best since each tile is a 1:1 crop.  */
/* ------------------------------------------------------------------ */
const USAGE_SHOTS = [
  {
    src: '/images/salad.jpg',
    alt: 'Holy Land Goods olive oil drizzled over a fresh salad',
    label: 'Salads',
  },
  {
    src: '/images/hummus.jpg',
    alt: 'Holy Land Goods olive oil poured over a bowl of hummus',
    label: 'Hummus',
  },
  {
    src: '/images/pasta.jpg',
    alt: 'Holy Land Goods olive oil tossed with pasta',
    label: 'Pasta',
  },
  {
    src: '/images/zaatar.jpg',
    alt: 'Holy Land Goods olive oil drizzled over za’atar',
    label: 'Za’atar',
  },
];

export default function Page() {
  /* ------------------------------------------------------------------ */
  /*  CONVERSION TRIGGERS                                                */
  /*  Fire when a visitor clicks an Amazon or TikTok Shop CTA (or the    */
  /*  hero product photo). Single standard event only, on purpose —      */
  /*  Meta's Event Manager only needs to see one event per click.        */
  /* ------------------------------------------------------------------ */
  const handleAmazonClick = () => {
    window.fbq?.('track', 'Lead');
  };

  const handleTikTokClick = () => {
    window.fbq?.('track', 'Lead');
  };

  return (
    <main className="min-h-screen bg-sand-50 text-olive-950">
      {/* ============================== META PIXEL ============================== */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* Raw HTML string, not a JSX <img> — keeps this invisible to
          Next's element-tree scanning so it doesn't get auto-preloaded
          (which was firing an extra PageView on every load). */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" alt="" />`,
        }}
      />

      {/* ============================== HEADER ============================== */}
      <header className="sticky top-0 z-40 border-b border-olive-200/60 bg-sand-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <OliveBranchIcon className="h-6 w-6 text-olive-600" />
            <span className="font-serif text-lg font-bold tracking-tight sm:text-xl">
              Holy Land Goods
            </span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={AMAZON_URL}
              onClick={handleAmazonClick}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-full bg-sand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sand-700"
            >
              Available at Amazon
            </a>
            <a
              href={TIKTOK_URL}
              onClick={handleTikTokClick}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-olive-900"
            >
              Shop on TikTok
            </a>
          </div>
        </div>
      </header>

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-olive-900 to-olive-800 text-sand-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="order-2 md:order-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sand-300">
              2025/6 Harvest &middot; Single-Source &middot; Palestine
            </p>
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Extra Virgin Olive Oil, Pressed From 2,000&#8209;Year&#8209;Old Groves
            </h1>
            <p className="mt-4 text-base leading-relaxed text-sand-100 sm:text-lg">
              Raw, unfiltered, and cold-pressed from indigenous Nabali and
              Rumi olives &mdash; dry-farmed the traditional way, with{' '}
              <span className="font-semibold text-white">
                3x the polyphenols
              </span>{' '}
              of ordinary supermarket olive oil.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span
                className={`font-serif text-3xl font-bold ${AMAZON_HAS_PROMO ? 'text-white/70 line-through' : 'text-white'}`}
              >
                {AMAZON_PRICE}
              </span>
              <span className="text-sm text-sand-300">on Amazon</span>
              {SHOW_AMAZON_COUPON && (
                <PriceBadge
                  tone="coupon"
                  label={AMAZON_COUPON_TEXT}
                  price={AMAZON_COUPON_PRICE}
                />
              )}
              {SHOW_AMAZON_SALE && (
                <PriceBadge
                  tone="sale"
                  label={AMAZON_SALE_TEXT}
                  price={AMAZON_SALE_PRICE}
                  duration={AMAZON_SALE_DURATION}
                />
              )}
            </div>
            {SHOW_AMAZON_STACK && (
              <div className="mt-3">
                <StackPromo
                  saleLabel={AMAZON_STACK_SALE_LABEL}
                  salePrice={AMAZON_STACK_SALE_PRICE}
                  couponLabel={AMAZON_STACK_COUPON_LABEL}
                  couponPrice={AMAZON_STACK_COUPON_PRICE}
                  finalLabel={AMAZON_STACK_FINAL_LABEL}
                  finalPrice={AMAZON_STACK_FINAL_PRICE}
                  saleDuration={AMAZON_STACK_DURATION}
                />
              </div>
            )}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={AMAZON_URL}
                onClick={handleAmazonClick}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sand-500 px-8 py-4 text-base font-bold text-olive-950 shadow-lg shadow-black/20 transition hover:bg-sand-400 active:scale-[0.98]"
              >
                <AmazonSmileIcon className="h-5 w-5" />
                Available at Amazon
              </a>
            </div>
            <p className="mt-3 text-xs text-sand-300">
              Ships from and sold by Amazon.com &middot; Prime eligible
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span
                className={`font-serif text-3xl font-bold ${TIKTOK_HAS_PROMO ? 'text-white/70 line-through' : 'text-white'}`}
              >
                {TIKTOK_PRICE}
              </span>
              <span className="text-sm text-sand-300">on TikTok</span>
              {SHOW_TIKTOK_COUPON && (
                <PriceBadge
                  tone="coupon"
                  label={TIKTOK_COUPON_TEXT}
                  price={TIKTOK_COUPON_PRICE}
                />
              )}
              {SHOW_TIKTOK_SALE && (
                <PriceBadge
                  tone="sale"
                  label={TIKTOK_SALE_TEXT}
                  price={TIKTOK_SALE_PRICE}
                  duration={TIKTOK_SALE_DURATION}
                />
              )}
            </div>
            {SHOW_TIKTOK_STACK && (
              <div className="mt-3">
                <StackPromo
                  saleLabel={TIKTOK_STACK_SALE_LABEL}
                  salePrice={TIKTOK_STACK_SALE_PRICE}
                  couponLabel={TIKTOK_STACK_COUPON_LABEL}
                  couponPrice={TIKTOK_STACK_COUPON_PRICE}
                  finalLabel={TIKTOK_STACK_FINAL_LABEL}
                  finalPrice={TIKTOK_STACK_FINAL_PRICE}
                  saleDuration={TIKTOK_STACK_DURATION}
                />
              </div>
            )}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={TIKTOK_URL}
                onClick={handleTikTokClick}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-bold text-white shadow-lg shadow-black/20 transition hover:bg-olive-900 active:scale-[0.98]"
              >
                <TikTokIcon className="h-5 w-5" />
                Shop on TikTok
              </a>
            </div>
            <p className="mt-3 text-xs text-sand-300">
              Fulfilled by TikTok &middot; Free 3-Day Delivery eligible
            </p>
          </div>

          {/* Hero visual — drop a transparent product cutout at
              public/images/hero.png. It renders inside this card; the
              caption below shares the same sandy background so the photo
              and label read as one unit rather than two stacked pieces. */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-sand-100 via-sand-200 to-olive-100 shadow-2xl sm:max-w-md">
              <a
                href={AMAZON_URL}
                onClick={handleAmazonClick}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex aspect-square items-center justify-center p-10 transition hover:opacity-90 active:scale-[0.98]"
              >
                <img
                  src="/images/hero.png"
                  alt="Holy Land Goods Palestinian Extra Virgin Levantine Olive Oil, 750mL bottle — view on Amazon"
                  className="h-full w-full object-contain"
                />
              </a>
              <div className="flex flex-col items-center gap-1 border-t border-olive-300/50 px-6 pb-6 pt-4 text-center">
                <span className="font-serif text-xl font-bold text-olive-900">
                  Holy Land Goods
                </span>
                <span className="text-sm font-medium text-olive-700">
                  Palestinian Extra Virgin Levantine Olive Oil
                </span>
                <span className="mt-1 rounded-full bg-olive-700 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  750mL &middot; 25.4 fl oz
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== TRUST BADGES ============================== */}
      <section className="border-b border-olive-200/60 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {[
            { label: '318 mg/kg Polyphenols', sub: '3x ordinary olive oil' },
            { label: 'Raw & Unfiltered', sub: 'First cold press only' },
            { label: 'Harvest-Dated', sub: '2025/6 season, on the label' },
            { label: 'Single Source', sub: 'Never a commercial blend' },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <p className="font-serif text-sm font-bold text-olive-800 sm:text-base">
                {badge.label}
              </p>
              <p className="mt-1 text-xs text-olive-600 sm:text-sm">
                {badge.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== FLAVOR SHOWCASE (PHOTO GRID) ============================== */}
      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              A Finishing Oil First, a Cooking Oil Second
            </h2>
            <p className="mt-3 text-olive-700">
              The bold, peppery kick is built to be tasted, not cooked away
              &mdash; drizzle it on right before serving and let it do the
              work.
            </p>
          </div>

          {/* A CSS grid, not a carousel: every photo stays visible and
              tappable on mobile with no swipe gesture required. 2 columns
              on small screens, 4 across from tablet up. */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {USAGE_SHOTS.map((shot) => (
              <figure
                key={shot.label}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-olive-200 shadow-sm"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent px-3 py-3 text-sm font-bold text-white sm:text-base">
                  {shot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== FEATURES ============================== */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            Why This Oil Tastes Different
          </h2>
          <p className="mt-3 text-olive-700">
            Most olive oil on shelves is a blend of commodity oils from
            irrigated valley farms. Ours isn&apos;t.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Ancient, Indigenous Trees',
              body: 'Pressed exclusively from Nabali and Rumi olives — drought-resistant Levantine varietals grown in groves that date back roughly 2,000 years.',
            },
            {
              title: 'Ba’li Dry Farming',
              body: 'Zero artificial irrigation. Stressed trees push roots deep into mineral-rich soil, producing a lower yield of hyper-concentrated, nutrient-dense olives.',
            },
            {
              title: 'True First Cold Press',
              body: 'Mechanically extracted directly after harvest and bottled completely raw and unfiltered — nothing added, nothing blended in.',
            },
            {
              title: 'Bold, Peppery Flavor',
              body: 'A vibrant peppery kick with grassy, aromatic notes and a complex profile that mild supermarket oils simply can’t replicate.',
            },
            {
              title: 'Heart-Healthy Fats',
              body: 'Rich in monounsaturated fats and natural Vitamin E (alpha-tocopherols), alongside antioxidant-rich polyphenols.',
            },
            {
              title: 'Harvest Transparency',
              body: 'Every bottle is marked with its harvest season, so you always know exactly when your olives were picked and pressed.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-olive-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-bold text-olive-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-olive-700">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== STORY ============================== */}
      <section className="bg-olive-900 text-sand-50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">
            From Ancient Roots to Your Table
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sand-100 sm:text-lg">
            Long before &ldquo;extra virgin&rdquo; was a label, Levantine
            farmers were dry-farming Nabali and Rumi olive trees the same way
            their ancestors did &mdash; no irrigation, no shortcuts, just
            deep roots and patience. That stress is what concentrates the
            polyphenols and flavor compounds you taste in every bottle of
            Holy Land Goods. We press it once, we don&apos;t filter it, and
            we don&apos;t blend it with anything else.
          </p>
        </div>
      </section>

      {/* ============================== FLAVOR + USES ============================== */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              Robust Enough to Finish a Dish
            </h2>
            <p className="mt-4 text-olive-700">
              Drizzle it over hot food and the warmth releases rich, grassy,
              aromatic notes. Its bold, peppery profile stands up to grilled
              vegetables, fresh bread, hummus, and roasted meats &mdash;
              enhancing natural sweetness instead of getting lost in it.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Finishing oil for soups & roasted vegetables',
                'Dipping oil with warm pita or flatbread',
                'Everyday cooking oil for sautéing & pan-searing',
              ].map((use) => (
                <li key={use} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-sand-600" />
                  <span className="text-sm text-olive-800 sm:text-base">
                    {use}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-olive-200 bg-sand-100 p-8">
            <h3 className="font-serif text-lg font-bold text-olive-900">
              At a Glance
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ['Varietals', 'Nabali & Rumi (indigenous, Levantine)'],
                ['Farming', "Ba’li — dry-farmed, no irrigation"],
                ['Extraction', 'First cold press, raw & unfiltered'],
                ['Polyphenols', '318 mg/kg'],
                ['Harvest', '2025/6 season'],
                ['Size', '750 mL (25.4 fl oz) glass bottle'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-olive-200/70 pb-2"
                >
                  <dt className="font-semibold text-olive-600">{k}</dt>
                  <dd className="text-right text-olive-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============================== FINAL CTA ============================== */}
      <section className="bg-sand-500">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
          <h2 className="font-serif text-2xl font-bold text-olive-950 sm:text-3xl">
            Taste What 2,000 Years of Craft Actually Tastes Like
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-olive-900">
            <span
              className={`font-serif text-xl font-bold ${AMAZON_HAS_PROMO ? 'opacity-70 line-through' : ''}`}
            >
              {AMAZON_PRICE}
            </span>
            {SHOW_AMAZON_COUPON && (
              <PriceBadge
                tone="coupon"
                label={AMAZON_COUPON_TEXT}
                price={AMAZON_COUPON_PRICE}
              />
            )}
            {SHOW_AMAZON_SALE && (
              <PriceBadge
                tone="sale"
                label={AMAZON_SALE_TEXT}
                price={AMAZON_SALE_PRICE}
                duration={AMAZON_SALE_DURATION}
              />
            )}
            <span>&middot; In stock now on Amazon. Ships fast with Prime.</span>
          </div>
          {SHOW_AMAZON_STACK && (
            <div className="mt-3 flex justify-center">
              <StackPromo
                saleLabel={AMAZON_STACK_SALE_LABEL}
                salePrice={AMAZON_STACK_SALE_PRICE}
                couponLabel={AMAZON_STACK_COUPON_LABEL}
                couponPrice={AMAZON_STACK_COUPON_PRICE}
                finalLabel={AMAZON_STACK_FINAL_LABEL}
                finalPrice={AMAZON_STACK_FINAL_PRICE}
                saleDuration={AMAZON_STACK_DURATION}
              />
            </div>
          )}
          <a
            href={AMAZON_URL}
            onClick={handleAmazonClick}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-olive-950 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-olive-800 active:scale-[0.98]"
          >
            <AmazonSmileIcon className="h-5 w-5" />
            Available at Amazon
          </a>
        </div>
      </section>

      {/* ============================== FOOTER ============================== */}
      <footer className="border-t border-olive-200 bg-sand-50 pb-24 pt-10 sm:pb-10">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div className="flex items-center justify-center gap-2">
            <OliveBranchIcon className="h-5 w-5 text-olive-600" />
            <span className="font-serif text-base font-bold">
              Holy Land Goods
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-olive-600">
            Amazon, the Amazon logo, and Prime are trademarks of Amazon.com,
            Inc. or its affiliates. TikTok Shop is a trademark of TikTok
            Inc./ByteDance Ltd. Holy Land Goods is an independent brand sold
            on both platforms; this page is not operated by Amazon or TikTok.
          </p>
          <p className="mt-3 text-xs text-olive-500">
            &copy; {new Date().getFullYear()} Holy Land Goods &middot;{' '}
            shopholylandgoods.com
          </p>
        </div>
      </footer>

      {/* ============================== MOBILE STICKY CTA ============================== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-olive-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <a
          href={AMAZON_URL}
          onClick={handleAmazonClick}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-sand-600 px-6 py-3.5 text-base font-bold text-white shadow-lg active:scale-[0.98]"
        >
          <AmazonSmileIcon className="h-5 w-5" />
          Available at Amazon
        </a>
      </div>
    </main>
  );
}

function PriceBadge({
  tone,
  label,
  price,
  duration,
}: {
  tone: 'coupon' | 'sale' | 'final';
  label: string;
  price: string;
  duration?: string;
}) {
  const toneClasses =
    tone === 'coupon'
      ? 'bg-emerald-600 text-white'
      : tone === 'sale'
      ? 'bg-red-600 text-white'
      : 'bg-amber-500 text-olive-950';

  // With a duration, the tag grows into a two-line block (label/price on
  // top, duration underneath) instead of staying a single-line pill.
  if (duration) {
    return (
      <span
        className={`inline-flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs font-bold leading-tight ${toneClasses}`}
      >
        <span className="flex items-center gap-1.5">
          <span className="uppercase tracking-wide">{label}</span>
          <span className="opacity-80">&middot;</span>
          <span>{price}</span>
        </span>
        <span className="text-[10px] font-medium normal-case opacity-90">
          {duration}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${toneClasses}`}
    >
      <span className="uppercase tracking-wide">{label}</span>
      <span className="opacity-80">&middot;</span>
      <span>{price}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Combined "sale + coupon = final price" callout. A separate, 3rd    */
/*  promo option from the two PriceBadge toggles above — independent   */
/*  of whether those are on or off. Reuses the same Sale Event and     */
/*  Clip Coupon tags (plus a new "final" tone) connected by + and =,   */
/*  so it reads as those two tags adding up to a third one. Every      */
/*  value is plain text you set by hand; nothing here computes a       */
/*  discount.                                                          */
/* ------------------------------------------------------------------ */
function StackPromo({
  saleLabel,
  salePrice,
  saleDuration,
  couponLabel,
  couponPrice,
  finalLabel,
  finalPrice,
}: {
  saleLabel: string;
  salePrice: string;
  saleDuration?: string;
  couponLabel: string;
  couponPrice: string;
  finalLabel: string;
  finalPrice: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <PriceBadge
        tone="sale"
        label={saleLabel}
        price={salePrice}
        duration={saleDuration}
      />
      <span className="text-base font-bold opacity-60">+</span>
      <PriceBadge tone="coupon" label={couponLabel} price={couponPrice} />
      <span className="text-base font-bold opacity-60">=</span>
      <PriceBadge tone="final" label={finalLabel} price={finalPrice} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline icons (no external assets, keeps the page self-contained)   */
/* ------------------------------------------------------------------ */
function OliveBranchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 20c6-1 9-4 10-10 .6-3.5 3-6 6-7-1 3-1 6-3 8-3 3-8 4-13 4 0 2 0 4 0 5Z"
        fill="currentColor"
        opacity={0.9}
      />
      <circle cx="7" cy="17" r="1.4" fill="currentColor" />
      <circle cx="10.5" cy="14.5" r="1.4" fill="currentColor" />
      <circle cx="13.5" cy="11.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AmazonSmileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 15c3 2.5 13 2.5 16 0" />
      <path d="M17.5 15.5c1 .3 2 .8 2.5 1.5-1 .5-2.3.6-3.2.2" />
      <rect x="6" y="8" width="12" height="6" rx="1" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.5 2h-3v13.5a2.75 2.75 0 1 1-2.75-2.75c.24 0 .47.02.7.07V9.7a5.85 5.85 0 0 0-.7-.04A5.84 5.84 0 1 0 16.5 15.5V8.9a7.6 7.6 0 0 0 4.4 1.4V7.3a4.6 4.6 0 0 1-4.4-4.4V2Z" />
    </svg>
  );
}
