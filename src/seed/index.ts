import type { Payload } from 'payload'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { Page } from '../payload-types'

import { type CoverName, renderCover } from './images'
import { bold, h2, ol, p, quote, richText, ul } from './lexical'

/**
 * Starter content for the EFC Media site.
 *
 *   npm run seed            – load the content into an empty database
 *   npm run seed -- reset   – wipe existing content first, then load it again
 *
 * Where the copy comes from
 * - Brand facts (who EFC Media is, story, vision, mission, logo story) are taken from the
 *   brand book. Services reflect the brand book and the agency's public Instagram profile.
 * - Nothing is invented about clients or results. Case studies, testimonials, team members
 *   and statistics are seeded as clearly labelled PLACEHOLDERS (`placeholder: true`) that
 *   the site marks visibly until they are replaced with real, approved content.
 * - The phone/WhatsApp number is the one printed on the agency's public Instagram posts;
 *   the email address is left empty on purpose.
 */

type SeedOptions = { payload: Payload; reset?: boolean }

/**
 * Request context for every seed operation. Seeding runs outside a Next.js request, so
 * the cache-revalidation hooks are skipped; `seeding` also lets a reset delete the
 * otherwise protected home page.
 *
 * A fresh object per call matters: Payload plugins keep per-request state on the context
 * (the storage plugin marks an upload as handled there), so sharing one object would make
 * every upload after the first silently skip cloud storage.
 */
const ctx = () => ({ disableRevalidate: true, seeding: true })

const CONTENT_COLLECTIONS = [
  'form-submissions',
  'forms',
  'pages',
  'posts',
  'case-studies',
  'services',
  'categories',
  'testimonials',
  'team',
  'faqs',
  'media',
] as const

type LinkTarget = { relationTo: 'case-studies' | 'pages' | 'posts' | 'services'; value: number }

const internal = (label: string, target: LinkTarget, appearance?: 'primary' | 'secondary' | 'text') => ({
  appearance,
  label,
  reference: target,
  type: 'reference' as const,
})

const ROOT = process.cwd()

export const seed = async ({ payload, reset = false }: SeedOptions): Promise<void> => {
  const log = (message: string) => payload.logger.info(`[seed] ${message}`)

  /* ---------------------------------------------------------------------- */
  /*  Safety checks                                                         */
  /* ---------------------------------------------------------------------- */

  const existing = await payload.count({ collection: 'pages' })

  if (existing.totalDocs > 0 && !reset) {
    log('Content already exists — nothing was changed. Use "npm run seed -- reset" to wipe and re-seed.')
    return
  }

  if (reset) {
    log('Reset requested: deleting existing content…')
    for (const collection of CONTENT_COLLECTIONS) {
      const result = await payload.delete({ collection, context: ctx(), where: { id: { exists: true } } })
      if (result.errors.length) {
        throw new Error(`Could not delete ${result.errors.length} document(s) from "${collection}": ${result.errors[0]?.message}`)
      }
    }
  }

  /* ---------------------------------------------------------------------- */
  /*  Media                                                                 */
  /* ---------------------------------------------------------------------- */

  log('Uploading brand assets and cover artwork…')

  const uploadFile = async (relativePath: string, name: string, alt: string) => {
    const data = await readFile(path.join(ROOT, relativePath))
    return payload.create({
      collection: 'media',
      context: ctx(),
      data: { alt },
      file: { data, mimetype: 'image/png', name, size: data.byteLength },
    })
  }

  const uploadCover = async (cover: CoverName, name: string, alt: string, width = 1600, height = 1200) => {
    const data = await renderCover(cover, width, height)
    return payload.create({
      collection: 'media',
      context: ctx(),
      data: { alt },
      file: { data, mimetype: 'image/webp', name: `${name}.webp`, size: data.byteLength },
    })
  }

  // The logo files are the artwork exactly as supplied (transparent margins trimmed only).
  const logo = await uploadFile('src/assets/brand/efc-media-logo.png', 'efc-media-logo.png', 'EFC Media — Your Growth Partner')
  const logoMark = await uploadFile('src/assets/brand/efc-media-mark.png', 'efc-media-mark.png', 'EFC Media symbol')
  const favicon = await uploadFile('public/brand/icon-512.png', 'efc-media-icon.png', 'EFC Media icon')

  const covers = {
    caseOne: await uploadCover('sunrise', 'sample-project-01', 'Abstract artwork: a sun rising over a sand-coloured field'),
    caseTwo: await uploadCover('orbit', 'sample-project-02', 'Abstract artwork: an orange ring on a charcoal field'),
    caseThree: await uploadCover('ascent', 'sample-project-03', 'Abstract artwork: rounded columns rising from left to right'),
    postOne: await uploadCover('ripple', 'insight-clicks-to-customers', 'Abstract artwork: charcoal rings spreading across an orange field', 1600, 1000),
    postTwo: await uploadCover('quarters', 'insight-website-before-ads', 'Abstract artwork: four quarter circles in charcoal and orange', 1600, 1000),
    postThree: await uploadCover('horizon', 'insight-content-plan', 'Abstract artwork: a half sun on a charcoal horizon', 1600, 1000),
  }

  /* ---------------------------------------------------------------------- */
  /*  Library: categories, FAQs, testimonials, team                         */
  /* ---------------------------------------------------------------------- */

  log('Creating categories, FAQs, testimonials and team placeholders…')

  const createCategory = (title: string, slug: string) =>
    payload.create({ collection: 'categories', context: ctx(), data: { slug, title } })

  const categories = {
    content: await createCategory('Content', 'content'),
    performance: await createCategory('Performance', 'performance'),
    strategy: await createCategory('Strategy', 'strategy'),
  }

  const faqs = [
    {
      question: 'What does EFC Media do?',
      answer: richText(
        p(
          'EFC Media is a full-service digital marketing agency. We help businesses build strong brands, generate quality leads and accelerate growth through strategic marketing, creative design and technology-driven solutions.',
        ),
      ),
    },
    {
      question: 'Which services do you offer?',
      answer: richText(
        p(
          'Branding, social media marketing, content creation, performance advertising, SEO, and web design and development. You can work with us on a single service, or bring them together under one growth plan.',
        ),
      ),
    },
    {
      question: 'What does “growth partner” mean?',
      answer: richText(
        p(
          'It means we measure our work by what it does for your business — not by how many posts or campaigns we deliver. We combine creativity, strategy and performance marketing, and we stay involved: reviewing what’s working and improving it.',
        ),
      ),
    },
    {
      question: 'How do you measure results?',
      answer: richText(
        p(
          'Before work begins we agree what success looks like for you — enquiries, sales, reach — and we report against it, so you can always see what your marketing is doing.',
        ),
      ),
    },
    {
      question: 'How do we get started?',
      answer: richText(
        p(
          'Send us a message through the contact form or give us a call. Tell us a little about your business and what you’d like to achieve, and we’ll take it from there.',
        ),
      ),
    },
  ]

  for (const faq of faqs) {
    await payload.create({ collection: 'faqs', context: ctx(), data: faq })
  }

  const testimonials = []
  for (const number of ['one', 'two', 'three']) {
    testimonials.push(
      await payload.create({
        collection: 'testimonials',
        context: ctx(),
        data: {
          company: 'Company name',
          name: `Client name ${number}`,
          placeholder: true,
          quote:
            'Placeholder testimonial. Replace this with a real quote from a client, shared with their permission.',
          role: 'Job title',
        },
      }),
    )
  }

  for (const number of ['one', 'two', 'three', 'four']) {
    await payload.create({
      collection: 'team',
      context: ctx(),
      data: {
        bio: 'Placeholder bio. Add a line or two about this person.',
        name: `Team member ${number}`,
        placeholder: true,
        role: 'Job title',
      },
    })
  }

  /* ---------------------------------------------------------------------- */
  /*  Services                                                              */
  /* ---------------------------------------------------------------------- */

  log('Creating services…')

  const serviceData = [
    {
      title: 'Branding & Identity',
      slug: 'branding',
      icon: 'spark' as const,
      summary:
        'A clear, distinctive brand — strategy, logo, visual identity and guidelines — so your business looks and sounds like itself everywhere.',
      intro: richText(
        p(
          'Your brand is the first thing people notice and the last thing they remember. We help you define what you stand for, then give it a look and a voice that set you apart.',
        ),
        p(
          'From a new identity to a refresh of an existing one, the outcome is the same: a brand that is easy to recognise, easy to apply and built to grow with your business.',
        ),
      ),
      deliverables: [
        { title: 'Brand strategy & positioning', text: 'Who you are for, what makes you different, and how you say it.' },
        { title: 'Logo & visual identity', text: 'Logo, colour, typography and the graphic language around them.' },
        { title: 'Brand guidelines', text: 'A practical guide so every piece of communication stays consistent.' },
        { title: 'Brand collateral', text: 'Stationery, social templates and the everyday materials your team needs.' },
      ],
    },
    {
      title: 'Social Media Marketing',
      slug: 'social-media-marketing',
      icon: 'megaphone' as const,
      summary:
        'Strategy, content calendars and community management that turn your social channels into a steady source of attention and enquiries.',
      intro: richText(
        p(
          'Showing up now and then isn’t a strategy. We plan, create and manage your social presence so your brand is consistently in front of the people who matter to it.',
        ),
        p(
          'Every month has a plan, every post has a purpose, and you can see how the channels are performing.',
        ),
      ),
      deliverables: [
        { title: 'Channel strategy', text: 'The right platforms, audiences and messages for your goals.' },
        { title: 'Content calendar & creative', text: 'Planned, designed and scheduled so you never scramble for a post.' },
        { title: 'Community management', text: 'Timely replies to comments and messages, in your brand’s voice.' },
        { title: 'Reporting & insights', text: 'A clear view of what’s working and what we’ll do next.' },
      ],
    },
    {
      title: 'Content Creation',
      slug: 'content-creation',
      icon: 'play' as const,
      summary:
        'Scroll-stopping creative — graphics, reels, video and copy — made for the platforms your customers actually use.',
      intro: richText(
        p(
          'Good content earns attention; great content earns customers. We produce design, video and writing that is unmistakably yours and made for the way people really scroll, watch and read.',
        ),
      ),
      deliverables: [
        { title: 'Social creatives & campaigns', text: 'Posts, carousels and campaign concepts with a consistent look.' },
        { title: 'Reels & short-form video', text: 'Ideas, scripting, shooting and editing for short video.' },
        { title: 'Photography & video production', text: 'Product, brand and location shoots.' },
        { title: 'Copywriting', text: 'Captions, ad copy and web copy that sound like your brand.' },
      ],
    },
    {
      title: 'Performance Advertising',
      slug: 'performance-advertising',
      icon: 'target' as const,
      summary:
        'Paid campaigns across search and social, built around your goals and optimised continuously so your budget keeps working harder.',
      intro: richText(
        p(
          'Ads should pay for themselves. We plan, build and manage campaigns around the outcome you care about — leads, sales or footfall — and keep refining audiences, creative and spend based on what the numbers tell us.',
        ),
      ),
      deliverables: [
        { title: 'Campaign strategy & setup', text: 'Objectives, structure, budgets and tracking done properly from day one.' },
        { title: 'Audience targeting & creative testing', text: 'Finding the right people and the messages they respond to.' },
        { title: 'Landing page guidance', text: 'Making sure the click lands somewhere built to convert.' },
        { title: 'Reporting & optimisation', text: 'Regular reviews and changes that improve results over time.' },
      ],
    },
    {
      title: 'SEO',
      slug: 'seo',
      icon: 'search' as const,
      summary:
        'Technical fixes, useful content and local search work that help the right people find you when they’re looking.',
      intro: richText(
        p(
          'Search is where intent lives: people looking for exactly what you offer. We improve how your site is built, what it says and how it appears locally, so you’re found by customers who are ready to act.',
        ),
      ),
      deliverables: [
        { title: 'Technical & on-page SEO', text: 'Site speed, structure, metadata and the fundamentals search engines expect.' },
        { title: 'Keyword & content planning', text: 'The topics your customers search for, turned into a content plan.' },
        { title: 'Local SEO', text: 'Your business profile and local listings, set up and kept up to date.' },
        { title: 'Reporting', text: 'Rankings, traffic and enquiries, tracked and explained.' },
      ],
    },
    {
      title: 'Web Design & Development',
      slug: 'web-design-development',
      icon: 'code' as const,
      summary:
        'Fast, good-looking websites built to convert — designed around your brand and easy for your team to update.',
      intro: richText(
        p(
          'Your website is where marketing turns into business. We design and build sites that load quickly, explain what you do clearly and make the next step obvious.',
        ),
        p('And because you shouldn’t need a developer to change a headline, we set you up to edit it yourself.'),
      ),
      deliverables: [
        { title: 'UX & UI design', text: 'Structure and design shaped around what your visitors need to do.' },
        { title: 'Development', text: 'Built on a modern, fast and secure stack.' },
        { title: 'Content management', text: 'An editor your team can use, with training to match.' },
        { title: 'Launch & care', text: 'Hosting, launch and ongoing improvements.' },
      ],
    },
  ]

  const services = []
  for (const service of serviceData) {
    services.push(
      await payload.create({
        collection: 'services',
        context: ctx(),
        data: { ...service, _status: 'published' },
      }),
    )
  }

  /* ---------------------------------------------------------------------- */
  /*  Case studies — PLACEHOLDERS                                           */
  /* ---------------------------------------------------------------------- */

  log('Creating placeholder case studies…')

  const placeholderStory = (what: string) =>
    richText(p(`Placeholder text. ${what} Replace this with the real story, approved by the client.`))

  const caseStudyData = [
    { cover: covers.caseOne.id, service: services[0], title: 'Sample case study one', slug: 'sample-case-study-one' },
    { cover: covers.caseTwo.id, service: services[1], title: 'Sample case study two', slug: 'sample-case-study-two' },
    { cover: covers.caseThree.id, service: services[3], title: 'Sample case study three', slug: 'sample-case-study-three' },
  ]

  for (const [index, item] of caseStudyData.entries()) {
    await payload.create({
      collection: 'case-studies',
      context: ctx(),
      data: {
        _status: 'published',
        approach: placeholderStory('Describe what you did: the strategy, the creative and the channels.'),
        challenge: placeholderStory('Describe the situation the client was in and what they needed.'),
        client: 'Client name',
        coverImage: item.cover,
        featured: true,
        industry: 'Industry',
        outcome: placeholderStory('Describe what changed for the client as a result.'),
        placeholder: true,
        results: [
          { label: 'Placeholder metric — replace with a verified result', value: '00%' },
          { label: 'Placeholder metric — replace with a verified result', value: '0×' },
          { label: 'Placeholder metric — replace with a verified result', value: '000' },
        ],
        services: item.service ? [item.service.id] : [],
        slug: item.slug,
        summary:
          'Placeholder summary. In one or two sentences, say what the client needed and what you delivered.',
        testimonial: testimonials[index]?.id,
        title: item.title,
        year: 'Year',
      },
    })
  }

  /* ---------------------------------------------------------------------- */
  /*  Insights — starter articles                                           */
  /* ---------------------------------------------------------------------- */

  log('Creating starter articles…')

  const now = Date.now()
  const daysAgo = (days: number) => new Date(now - days * 24 * 60 * 60 * 1000).toISOString()

  await payload.create({
    collection: 'posts',
    context: ctx(),
    data: {
      _status: 'published',
      categories: [categories.strategy.id],
      coverImage: covers.postOne.id,
      excerpt:
        'Likes, views and clicks feel like progress. Here is how to tell whether they are turning into business — and what to fix when they are not.',
      publishedAt: daysAgo(2),
      slug: 'clicks-are-not-customers',
      title: 'Clicks are not customers: closing the gap between attention and sales',
      content: richText(
        p(
          'Attention is the easy part to measure. Dashboards fill up with impressions, reach and clicks, and it is tempting to treat those numbers as the result. They are not. They are the start of a journey that either ends with a customer or quietly stops somewhere along the way.',
        ),
        h2('Follow one visitor from start to finish'),
        p(
          'Pick a single route into your business — say, an Instagram ad — and walk it yourself, on your phone. Tap the ad. Read the page it opens. Try to enquire or buy. Most leaks are obvious the moment you do this:',
        ),
        ul(
          'The ad promises one thing and the page talks about another.',
          'The page takes too long to load on mobile data.',
          'It is not clear what to do next, or the form asks for too much.',
          'Nobody replies to the enquiry for a day.',
        ),
        h2('Measure the steps, not just the ends'),
        p(
          'You do not need complicated tooling. For each route, write down four numbers every week: how many people saw it, how many clicked, how many enquired, and how many became customers. The step with the biggest drop is the one to work on first.',
        ),
        quote('More traffic into a leaky journey just means more people leaving.'),
        h2('Fix in this order'),
        ol(
          'Speed of response. Reply to every enquiry quickly; it is the cheapest improvement there is.',
          'The landing page. One message, one clear action, proof that you are credible.',
          'The offer. Make the first step small and specific — a call, a quote, a sample.',
          'The targeting and creative. Only now is it worth spending more to bring people in.',
        ),
        p(
          bold('The takeaway: '),
          'treat clicks as a means, not a goal. When every step between the click and the sale is doing its job, growth stops being a matter of luck.',
        ),
      ),
    },
  })

  await payload.create({
    collection: 'posts',
    context: ctx(),
    data: {
      _status: 'published',
      categories: [categories.performance.id],
      coverImage: covers.postTwo.id,
      excerpt:
        'Advertising sends people to your website. If the site is slow, unclear or hard to act on, you pay for visits that go nowhere. Check these five things first.',
      publishedAt: daysAgo(9),
      slug: 'what-to-fix-on-your-website-before-you-spend-on-ads',
      title: 'What to fix on your website before you spend on ads',
      content: richText(
        p(
          'An ad can only do half the job: it gets someone to your website. What happens next decides whether the money was well spent. Before you increase a budget, make sure the page people land on is ready for them.',
        ),
        h2('1. It loads fast on a phone'),
        p(
          'Most visitors arrive on mobile, often on a patchy connection. Compress images, remove what you do not need, and test the page on your own phone away from Wi-Fi.',
        ),
        h2('2. It says what you do in one sentence'),
        p(
          'A visitor should understand what you offer, who it is for and why it is worth their time before they scroll. If the headline could belong to any business, rewrite it.',
        ),
        h2('3. There is one obvious next step'),
        p(
          'Decide the single action you want — call, WhatsApp, enquiry form, purchase — and make it impossible to miss. Repeat it down the page rather than offering five different options.',
        ),
        h2('4. It gives people a reason to trust you'),
        p(
          'Real photos, real reviews, real work. Proof does not have to be elaborate, but it does have to be genuine.',
        ),
        h2('5. You can see what happens'),
        p(
          'Set up tracking for the actions that matter before the campaign starts. Without it, you are guessing which ads work — and paying for the guess.',
        ),
        p(
          bold('A simple test: '),
          'send the page to someone who does not know your business and ask them what you sell and what they would do next. If they hesitate, fix that before you buy more traffic.',
        ),
      ),
    },
  })

  await payload.create({
    collection: 'posts',
    context: ctx(),
    data: {
      _status: 'published',
      categories: [categories.content.id],
      coverImage: covers.postThree.id,
      excerpt:
        'You do not need to post every day. You need a small number of repeatable formats, a calendar you can keep to, and a reason for each post.',
      publishedAt: daysAgo(16),
      slug: 'a-simple-content-plan-for-small-business-social-media',
      title: 'A simple content plan for small business social media',
      content: richText(
        p(
          'Most small businesses do not struggle with social media because they lack ideas. They struggle because every post starts from a blank page. A simple plan removes that problem.',
        ),
        h2('Choose three or four content pillars'),
        p('Pillars are the themes you return to. For most businesses, some mix of these works well:'),
        ul(
          'What you sell — products, services and how they help.',
          'Proof — customer stories, reviews and results.',
          'Expertise — tips and answers to the questions you are asked most.',
          'People — the team, the process and what happens behind the scenes.',
        ),
        h2('Give each pillar a format'),
        p(
          'Decide how each theme usually shows up: a short reel for tips, a carousel for customer stories, a single image for offers. Repeating formats makes content quicker to produce and easier for followers to recognise.',
        ),
        h2('Plan a month, make it in batches'),
        p(
          'Lay the pillars across a calendar — even three posts a week is enough to stay visible — then create the month’s content in one or two sittings. Leave room for anything timely, like festivals and local events.',
        ),
        h2('Review once a month'),
        p(
          'Look at which posts brought enquiries, saves and shares, not just likes. Do more of what worked, drop what did not, and carry the plan forward.',
        ),
        p(bold('Consistency beats volume. '), 'A plan you can keep to will always outperform a burst of activity followed by silence.'),
      ),
    },
  })

  /* ---------------------------------------------------------------------- */
  /*  Contact form                                                          */
  /* ---------------------------------------------------------------------- */

  log('Creating the contact form…')

  const contactForm = await payload.create({
    collection: 'forms',
    context: ctx(),
    data: {
      title: 'Contact',
      submitButtonLabel: 'Send message',
      confirmationType: 'message',
      confirmationMessage: richText(
        p(bold('Thank you — your message is on its way.')),
        p('We’ll read it and get back to you soon.'),
      ),
      fields: [
        { blockType: 'text', name: 'name', label: 'Your name', required: true, width: 50 },
        { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
        { blockType: 'text', name: 'phone', label: 'Phone', required: false, width: 50 },
        { blockType: 'text', name: 'company', label: 'Business name', required: false, width: 50 },
        {
          blockType: 'select',
          name: 'service',
          label: 'What do you need help with?',
          placeholder: 'Choose a service',
          required: false,
          width: 100,
          options: [
            ...services.map((service) => ({ label: service.title, value: service.title })),
            { label: 'Not sure yet', value: 'Not sure yet' },
          ],
        },
        { blockType: 'textarea', name: 'message', label: 'Tell us about your project', required: true, width: 100 },
        {
          blockType: 'message',
          message: richText(
            p('We’ll only use these details to reply to your enquiry.'),
          ),
        },
      ],
      emails: [
        {
          // Leave "to" empty to use CONTACT_TO_EMAIL from the environment.
          replyTo: '{{email}}',
          subject: 'New website enquiry from {{name}}',
          message: richText(p('A new enquiry was sent from the website:'), p('{{*:table}}')),
        },
      ],
    },
  })

  /* ---------------------------------------------------------------------- */
  /*  Pages                                                                 */
  /* ---------------------------------------------------------------------- */

  log('Creating pages…')

  // Create the pages first so sections can link to each other by reference.
  const pageDefs = [
    ['home', 'Home'],
    ['about', 'About'],
    ['services', 'Services'],
    ['work', 'Work'],
    ['insights', 'Insights'],
    ['contact', 'Contact'],
    ['privacy', 'Privacy policy'],
  ] as const

  const pages = {} as Record<(typeof pageDefs)[number][0], Page>
  for (const [slug, title] of pageDefs) {
    pages[slug] = await payload.create({
      collection: 'pages',
      context: ctx(),
      data: { _status: 'draft', layout: [], slug, title },
      draft: true,
    })
  }

  const toPage = (slug: keyof typeof pages): LinkTarget => ({ relationTo: 'pages', value: pages[slug].id })

  const startProject = { link: internal('Start a project', toPage('contact'), 'primary') }

  const closingCTA = (theme: 'dark' | 'light' | 'tint' = 'dark') => ({
    blockType: 'cta' as const,
    eyebrow: 'Let’s talk',
    heading: 'Let’s *grow* together.',
    links: [startProject],
    showContact: true,
    text: 'Tell us where you want your business to be. We’ll show you how we can help you get there.',
    theme,
  })

  const approachSection = {
    blockType: 'approach' as const,
    anchor: 'approach',
    eyebrow: 'How we work',
    heading: 'From first conversation to *measurable growth.*',
    intro: 'A simple, repeatable way of working — so you always know what’s happening and why.',
    steps: [
      {
        title: 'Understand',
        description:
          'We start by listening: your business, your customers, your competitors and where you want to go.',
        keywords: 'Discovery, Audit, Goals',
      },
      {
        title: 'Plan',
        description:
          'We turn that into a clear strategy — who we’re talking to, what we’ll say, where we’ll say it and how we’ll measure it.',
        keywords: 'Positioning, Channels, Roadmap',
      },
      {
        title: 'Create',
        description:
          'Design, content and campaigns made to stand out — and made consistently, so your brand shows up week after week.',
        keywords: 'Design, Content, Web',
      },
      {
        title: 'Launch & optimise',
        description:
          'We put the work in front of the right people, watch the numbers and keep improving what performs.',
        keywords: 'Ads, Reporting, Optimisation',
      },
    ],
    theme: 'dark' as const,
  }

  const layouts: Record<keyof typeof pages, { description: string; layout: NonNullable<Page['layout']> }> = {
    home: {
      description:
        'EFC Media is a full-service digital marketing agency. We build brands that stand out and scale, with strategy, content and ads working as one.',
      layout: [
        {
          blockType: 'hero',
          style: 'statement',
          eyebrow: 'EFC Media — Your Growth Partner.',
          headline: 'We turn clicks\ninto *customers.*',
          intro:
            'EFC Media is a full-service digital marketing agency. We build brands that stand out and scale — with strategy, content and ads working as one.',
          links: [startProject, { link: internal('Explore services', toPage('services'), 'secondary') }],
          orbitText: 'Strategy · Content · Ads',
          pillars: [
            { title: 'Strategy', text: 'Clear positioning and a plan built around your goals.' },
            { title: 'Content', text: 'Creative that earns attention on every platform.' },
            { title: 'Ads', text: 'Performance campaigns that turn attention into enquiries.' },
          ],
        },
        {
          blockType: 'marquee',
          tone: 'brand',
          items: ['Branding', 'Social Media', 'Content Creation', 'Performance Ads', 'SEO', 'Web Design'].map(
            (text) => ({ text }),
          ),
        },
        {
          blockType: 'statement',
          eyebrow: 'Why EFC Media',
          text: 'We set out with one goal: to be a *growth partner* for businesses, not just another marketing agency. We combine creativity, strategy and performance marketing to deliver results you can measure.',
          columns: [
            { title: 'Creativity', text: 'Ideas and design that make your brand hard to scroll past.' },
            { title: 'Strategy', text: 'Every piece of work starts with your goals, your audience and a plan.' },
            { title: 'Performance', text: 'We track what matters and keep improving what’s working.' },
          ],
          link: internal('More about us', toPage('about')),
        },
        {
          blockType: 'servicesList',
          anchor: 'services',
          eyebrow: 'What we do',
          heading: 'Everything your brand needs to *grow.*',
          intro: 'Work with us on one service, or bring them together under a single growth plan.',
          source: 'all',
          detail: 'rows',
          link: internal('All services', toPage('services')),
          theme: 'light',
        },
        {
          blockType: 'workGrid',
          eyebrow: 'Selected work',
          heading: 'Work that moves brands *forward.*',
          intro: 'A look at the kind of projects we take on.',
          source: 'featured',
          limit: 2,
          link: internal('All work', toPage('work')),
          theme: 'tint',
        },
        approachSection,
        {
          blockType: 'stats',
          eyebrow: 'Results',
          heading: 'Proof, not *promises.*',
          placeholder: true,
          items: [
            { value: '00+', label: 'Brands we’ve worked with' },
            { value: '00+', label: 'Campaigns delivered' },
            { value: '00%', label: 'Average growth in enquiries' },
            { value: '0.0', label: 'Average client rating' },
          ],
          theme: 'light',
        },
        {
          blockType: 'testimonials',
          eyebrow: 'Client stories',
          heading: 'What our clients *say.*',
          source: 'all',
          theme: 'light',
        },
        {
          blockType: 'postsGrid',
          eyebrow: 'Insights',
          heading: 'Ideas for *growing* brands.',
          source: 'latest',
          limit: 3,
          link: internal('All insights', toPage('insights')),
          theme: 'tint',
        },
        closingCTA('dark'),
      ],
    },

    about: {
      description:
        'EFC Media was founded with one goal — to be a growth partner for businesses, not just another marketing agency. Meet the agency behind the work.',
      layout: [
        {
          blockType: 'hero',
          style: 'page',
          eyebrow: 'About EFC Media',
          headline: 'A growth partner,\nnot just another *agency.*',
          intro:
            'EFC Media is a full-service digital marketing agency helping businesses build strong brands, generate quality leads and accelerate growth.',
        },
        {
          blockType: 'content',
          eyebrow: 'Our story',
          heading: 'Founded with *one goal.*',
          layout: 'split',
          richText: richText(
            p(
              'EFC Media was founded with one goal — to become a growth partner for businesses rather than just another marketing agency.',
            ),
            p(
              'We combine creativity, strategy and performance marketing to deliver measurable results. That means we care about what the work does for your business — the enquiries, the customers, the growth — and not only about how it looks.',
            ),
          ),
        },
        {
          blockType: 'featureGrid',
          eyebrow: 'Vision & mission',
          heading: 'Where we’re *headed.*',
          items: [
            {
              title: 'Our vision',
              text: 'To become one of India’s most trusted digital marketing agencies by delivering innovative, creative and measurable digital solutions.',
            },
            {
              title: 'Our mission',
              text: 'Helping businesses grow through branding, digital marketing, creative content, web development and performance advertising.',
            },
          ],
          theme: 'tint',
        },
        {
          blockType: 'mediaText',
          eyebrow: 'Our logo',
          heading: 'A circle, and an arrow *pointing up.*',
          media: logo.id,
          mediaPosition: 'right',
          mediaStyle: 'plate',
          richText: richText(
            p(bold('The logo represents continuous business growth.')),
            p(
              'The circular form symbolises continuous improvement, trust and long-term partnerships, while the upward arrow reflects growth, progress, success and measurable performance.',
            ),
            p('Together, they represent EFC Media’s commitment to helping brands move forward in the digital world.'),
          ),
        },
        {
          blockType: 'featureGrid',
          eyebrow: 'What we stand for',
          heading: 'How we *work* with you.',
          items: [
            { title: 'Partnership', text: 'Long-term relationships over one-off projects. Your growth is how we measure ours.' },
            { title: 'Creativity', text: 'Ideas with a point of view — work that gets noticed for the right reasons.' },
            { title: 'Strategy', text: 'Decisions grounded in your goals, your audience and the data.' },
            { title: 'Measurable performance', text: 'Clear reporting on what the work is achieving, and continuous improvement.' },
          ],
        },
        {
          blockType: 'team',
          eyebrow: 'Team',
          heading: 'The people behind the *work.*',
          source: 'all',
          theme: 'tint',
        },
        closingCTA('dark'),
      ],
    },

    services: {
      description:
        'Branding, social media marketing, content creation, performance advertising, SEO and web development — everything your brand needs to grow.',
      layout: [
        {
          blockType: 'hero',
          style: 'page',
          eyebrow: 'Services',
          headline: 'Strategy, content and ads,\nworking as *one.*',
          intro:
            'From brand identity to performance campaigns, everything we do is built to help your business grow.',
          links: [startProject],
        },
        { blockType: 'servicesList', source: 'all', detail: 'detailed' },
        approachSection,
        {
          blockType: 'faq',
          eyebrow: 'FAQs',
          heading: 'Good questions.',
          intro: 'The things we’re asked most often.',
          source: 'all',
        },
        closingCTA('tint'),
      ],
    },

    work: {
      description: 'Case studies from the brands EFC Media partners with.',
      layout: [
        {
          blockType: 'hero',
          style: 'page',
          eyebrow: 'Work',
          headline: 'Work that moves\nbrands *forward.*',
          intro: 'Case studies from the brands we partner with.',
        },
        { blockType: 'workGrid', source: 'all' },
        closingCTA('dark'),
      ],
    },

    insights: {
      description: 'Practical thinking on branding, content, advertising and the web from EFC Media.',
      layout: [
        {
          blockType: 'hero',
          style: 'page',
          eyebrow: 'Insights',
          headline: 'Ideas for\n*growing* brands.',
          intro: 'Practical thinking on branding, content, advertising and the web.',
        },
        { blockType: 'postsGrid', source: 'all' },
        closingCTA('dark'),
      ],
    },

    contact: {
      description:
        'Tell us about your business and what you’d like to achieve. Get in touch with EFC Media, your growth partner.',
      layout: [
        {
          blockType: 'hero',
          style: 'page',
          eyebrow: 'Contact',
          headline: 'Let’s *grow*\ntogether.',
          intro:
            'Tell us about your business and what you’d like to achieve. We’ll get back to you to talk it through.',
        },
        {
          blockType: 'formBlock',
          eyebrow: 'Get in touch',
          heading: 'Tell us about your *project.*',
          intro: 'Fill in the form, or reach us directly using the details below.',
          form: contactForm.id,
          showContactDetails: true,
        },
        {
          blockType: 'faq',
          eyebrow: 'FAQs',
          heading: 'Before you ask.',
          source: 'all',
          theme: 'tint',
        },
      ],
    },

    privacy: {
      description: 'How EFC Media handles the information you share through this website.',
      layout: [
        {
          blockType: 'hero',
          style: 'page',
          eyebrow: 'Legal',
          headline: 'Privacy policy',
        },
        {
          blockType: 'content',
          layout: 'single',
          richText: richText(
            p(
              bold('Placeholder — replace this text with your privacy policy before launch. '),
              'It is here so the page and its footer link exist; it is not a legal document.',
            ),
            p('A privacy policy for this website would normally explain:'),
            ul(
              'What information the website collects — for example, the name, email address, phone number and message people send through the contact form.',
              'Why it is collected and how it is used.',
              'How long it is kept, and who it is shared with (such as email and hosting providers).',
              'How someone can ask to see, correct or delete their information, and how to contact you about it.',
            ),
          ),
        },
      ],
    },
  }

  // Each service page closes with the process and a call to action (editable per service).
  for (const service of services) {
    await payload.update({
      collection: 'services',
      context: ctx(),
      data: { _status: 'published', layout: [approachSection, closingCTA('tint')] },
      id: service.id,
    })
  }

  for (const [slug] of pageDefs) {
    const { description, layout } = layouts[slug]
    await payload.update({
      collection: 'pages',
      context: ctx(),
      data: {
        _status: 'published',
        layout,
        meta: { description },
      },
      id: pages[slug].id,
    })
  }

  /* ---------------------------------------------------------------------- */
  /*  Globals: navigation, footer, site settings                            */
  /* ---------------------------------------------------------------------- */

  log('Setting up navigation, footer and site settings…')

  await payload.updateGlobal({
    slug: 'header',
    context: ctx(),
    data: {
      cta: internal('Start a project', toPage('contact')),
      navItems: [
        { link: internal('Services', toPage('services')) },
        { link: internal('Work', toPage('work')) },
        { link: internal('About', toPage('about')) },
        { link: internal('Insights', toPage('insights')) },
        { link: internal('Contact', toPage('contact')) },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: ctx(),
    data: {
      statement: 'Your *growth* partner.',
      columns: [
        {
          title: 'Explore',
          links: [
            { link: internal('Home', toPage('home')) },
            { link: internal('About', toPage('about')) },
            { link: internal('Work', toPage('work')) },
            { link: internal('Insights', toPage('insights')) },
            { link: internal('Contact', toPage('contact')) },
          ],
        },
        {
          title: 'Services',
          links: services.map((service) => ({
            link: internal(service.title, { relationTo: 'services', value: service.id }),
          })),
        },
      ],
      legalLinks: [{ link: internal('Privacy policy', toPage('privacy')) }],
      note: 'All rights reserved.',
    },
  })

  await payload.updateGlobal({
    slug: 'settings',
    context: ctx(),
    data: {
      siteName: 'EFC Media',
      tagline: 'Your Growth Partner.',
      logo: logo.id,
      logoMark: logoMark.id,
      favicon: favicon.id,

      // From the agency's public Instagram posts. Email is intentionally left empty:
      // the site shows a labelled placeholder until a real address is added.
      phone: '+91 9995 081 483',
      whatsapp: '919995081483',
      address: 'Kochi, Kerala, India',
      city: 'Kochi',
      region: 'Kerala',
      country: 'IN',

      social: [{ platform: 'instagram', url: 'https://www.instagram.com/__efcmedia/' }],

      seo: {
        titleSuffix: 'EFC Media',
        description:
          'EFC Media is a full-service digital marketing agency in Kochi, Kerala — branding, social media, content, ads, SEO and web development for businesses that want to grow.',
      },

      launch: {
        allowIndexing: false,
        hidePlaceholders: false,
      },
    },
  })

  /* ---------------------------------------------------------------------- */
  /*  First admin user (optional)                                           */
  /* ---------------------------------------------------------------------- */

  const adminEmail = process.env.SEED_ADMIN_EMAIL
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  const users = await payload.count({ collection: 'users' })

  if (users.totalDocs === 0 && adminEmail && adminPassword) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, name: 'Site admin', password: adminPassword, role: 'admin' },
    })
    log(`Created the first admin user (${adminEmail}).`)
  } else if (users.totalDocs === 0) {
    log('No users yet: open /admin to create the first admin account.')
  }

  log('Done.')
}
