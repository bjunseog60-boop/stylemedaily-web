import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { guides, getGuideBySlug } from '@/lib/guides-data';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { guidesContent } from '@/lib/guides-content';
import ShopTheLook from '@/components/ShopTheLook';
import MidArticleCTA from '@/components/MidArticleCTA';
import StickyShopBar from '@/components/StickyShopBar';
import NewsletterCTA from '@/components/NewsletterCTA';
import AdUnit from '@/components/AdUnit';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: `${guide.category}, fashion guide, style tips, ${guide.title.toLowerCase()}, women fashion 2026, outfit ideas`,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.date,
      authors: ['StyleMeDaily Team'],
      images: guide.image ? [{ url: guide.image, width: 1200, height: 630 }] : [],
      siteName: SITE_NAME,
      url: `${SITE_URL}/guides/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: guide.image ? [guide.image] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/guides/${params.slug}`,
    },
  };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const related = guides.filter(g => g.category === guide.category && g.slug !== guide.slug).slice(0, 3);
  const moreGuides = guides.filter(g => g.category !== guide.category && g.slug !== guide.slug).slice(0, 3);
  const products = guide.affiliateProducts || [];
  const minPrice = products.reduce((min, p) => {
    const price = parseFloat(p.price.replace('$', ''));
    return price < min ? price : min;
  }, 999);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    image: guide.image || '',
    datePublished: guide.date,
    dateModified: guide.date,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/guides/${guide.slug}` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `${SITE_URL}/guides/${guide.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Product schema for rich snippets */}
      {products.map((p, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.name,
          brand: { '@type': 'Brand', name: p.brand },
          image: p.image || guide.image || '',
          description: `${p.name} by ${p.brand} — featured in ${guide.title}`,
          offers: {
            '@type': 'Offer',
            price: p.price.replace('$', ''),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: p.url,
          },
        }) }} />
      ))}
      {/* FAQ schema for search snippets */}
      {guidesContent[guide.slug] && guidesContent[guide.slug].length > 1 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guidesContent[guide.slug].slice(0, 5).map(section => ({
            '@type': 'Question',
            name: section.heading.endsWith('?') ? section.heading : `What about ${section.heading.toLowerCase()}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: section.paragraphs[0] || guide.description,
            },
          })),
        }) }} />
      )}

      <article className="pt-8 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-gray-600">Guides</Link>
          <span>/</span>
          <span className="text-gray-600 capitalize">{guide.category.replace('-', ' ')}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-new">{guide.tag}</span>
            <span className="text-xs text-gray-400">{guide.readTime} read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">{guide.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <span>By StyleMeDaily Team</span>
            <span>·</span>
            <span>{new Date(guide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Hero Image */}
        {guide.image && (
          <div className="mb-8 rounded-2xl overflow-hidden relative h-64 sm:h-80">
            <Image src={guide.image} alt={guide.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        )}

        {/* Quick Shop Banner — Clean */}
        {products.length > 0 && (
          <div className="mb-8 bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-gray-900">{products.length} curated items in this guide</p>
              <p className="text-xs text-gray-400 mt-0.5">Prices start at {minPrice < 999 ? `$${minPrice}` : '$15'}</p>
            </div>
            <a href="#shop-the-look" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
              View all
            </a>
          </div>
        )}

        {/* Shop the Look - Top */}
        {products.length > 0 && (
          <div className="mb-8" id="shop-the-look">
            <ShopTheLook products={products} />
          </div>
        )}

        {/* Table of Contents */}
        {guidesContent[guide.slug] && (
          <div className="border border-gray-100 rounded-xl p-5 mb-8 bg-white">
            <h3 className="font-display font-bold text-sm text-gray-700 mb-3">In This Guide</h3>
            <ul className="space-y-2">
              {guidesContent[guide.slug].map((section, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center justify-center font-medium">{idx + 1}</span>
                  {section.heading}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Content */}
        <div className="prose-style">
          {guidesContent[guide.slug] ? (
            guidesContent[guide.slug].map((section, idx) => (
              <div key={idx}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {/* Mid-Article CTA after first section — hero with image */}
                {idx === 0 && products.length > 0 && (
                  <MidArticleCTA products={products} variant="hero" />
                )}

                {/* In-Article AdSense after second section */}
                {idx === 1 && (
                  <AdUnit slot="7545186477" format="fluid" layout="in-article" />
                )}

                {/* Mid-Article CTA after third section — pair */}
                {idx === 2 && products.length > 1 && (
                  <MidArticleCTA products={products.slice(1)} variant="pair" />
                )}

                {/* Rectangle ad after 4th section */}
                {idx === 3 && (
                  <AdUnit slot="6237750336" format="rectangle" style={{ minHeight: 280 }} />
                )}
              </div>
            ))
          ) : (
            <>
              <h2>Why This Guide Matters</h2>
              <p>{guide.description}</p>
            </>
          )}
        </div>

        {/* Shop the Look - Bottom */}
        {products.length > 0 && (
          <div className="my-8">
            <ShopTheLook products={products} />
          </div>
        )}

        {/* Share & Save */}
        <div className="border border-gray-100 rounded-xl p-5 my-8 bg-white">
          <p className="font-display font-bold text-gray-900 text-sm mb-1 text-center">Found this helpful?</p>
          <p className="text-xs text-gray-400 mb-4 text-center">Share it with someone who&apos;d love it.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {/* Pinterest */}
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`${SITE_URL}/guides/${guide.slug}`)}&description=${encodeURIComponent(guide.title)}&media=${encodeURIComponent(guide.image || '')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#E60023] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#cc001f] transition-colors"
              aria-label="Save to Pinterest"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Pinterest
            </a>
            {/* Twitter/X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(guide.title)}&url=${encodeURIComponent(`${SITE_URL}/guides/${guide.slug}`)}&via=stylemedaily`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Share on X (Twitter)"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/guides/${guide.slug}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1877F2] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1665d8] transition-colors"
              aria-label="Share on Facebook"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            {/* Copy Link */}
            <button
              onClick={() => { navigator.clipboard?.writeText(`${SITE_URL}/guides/${guide.slug}`); }}
              className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Copy link"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Related Guides */}
        {related.length > 0 && (
          <div className="mt-10 mb-8">
            <h3 className="font-display font-bold text-gray-900 mb-4">You Might Also Like</h3>
            <div className="grid gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/guides/${r.slug}`} className="card-hover p-4 flex items-center gap-4 group">
                  {r.image ? (
                    <Image src={r.image} alt={r.title} width={64} height={64} className="rounded-xl object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-gray-600 transition-colors">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.readTime} · {r.tag}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* More From StyleMeDaily */}
        {moreGuides.length > 0 && (
          <div className="mb-8">
            <h3 className="font-display font-bold text-gray-900 mb-4">Explore More Guides</h3>
            <div className="grid gap-3">
              {moreGuides.map(r => (
                <Link key={r.slug} href={`/guides/${r.slug}`} className="card-hover p-4 flex items-center gap-4 group">
                  {r.image ? (
                    <Image src={r.image} alt={r.title} width={64} height={64} className="rounded-xl object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-gray-600 transition-colors">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.readTime} · {r.tag}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <NewsletterCTA />

        {/* Bottom AdSense Banner */}
        <AdUnit slot="8863913673" format="horizontal" className="mt-8" />

        <p className="text-xs text-gray-400 text-center mt-8">
          Last updated: {guide.date} · Affiliate disclosure: Some links may earn us a commission at no extra cost to you.
        </p>
      </article>

      {/* Mobile Sticky Shop Bar */}
      {products.length > 0 && (
        <StickyShopBar productCount={products.length} firstProductUrl={products[0].url} />
      )}
    </>
  );
}
