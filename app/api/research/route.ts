import { NextRequest, NextResponse } from 'next/server'

interface ProductInsight {
  title: string
  platform: string
  searchVolume: number
  competition: string
  price: string
  trend: string
  buyingIntent: number
  reasoning: string
  keywords: string[]
}

// Simulated research data - in production, this would scrape real platforms
async function performMarketResearch(category: string): Promise<ProductInsight[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  const insights: ProductInsight[] = []

  // Generate insights based on category
  const categoryLower = category.toLowerCase()

  if (categoryLower.includes('planner') || categoryLower.includes('productivity')) {
    insights.push({
      title: '90-Day Goal Setting & Productivity Planner',
      platform: 'Etsy',
      searchVolume: 45000,
      competition: 'Low',
      price: '$12.99',
      trend: 'Rising Fast',
      buyingIntent: 87,
      reasoning: 'This niche shows strong growth due to New Year resolutions and Q1 goal-setting. Current competitors have outdated designs. High search volume with only 234 competing listings. Buyers actively searching for "90 day planner" with commercial intent keywords. Average conversion rate 8.2%.',
      keywords: ['90 day planner', 'goal planner', 'productivity journal', 'quarterly planner', 'goal tracker']
    })

    insights.push({
      title: 'Budget Planner for Couples - Financial Tracker',
      platform: 'Amazon KDP',
      searchVolume: 38000,
      competition: 'Low',
      price: '$15.99',
      trend: 'Rising',
      buyingIntent: 92,
      reasoning: 'Wedding season drives demand. "Couples budget planner" has 38K monthly searches with minimal competition. Current top seller has 2,500+ reviews at $15.99. Niche-specific keywords show 94% buyer intent. Perfect for newlyweds and engaged couples market segment.',
      keywords: ['couples budget', 'financial planner couples', 'money tracker', 'wedding budget', 'shared expenses']
    })
  }

  if (categoryLower.includes('coloring') || categoryLower.includes('art')) {
    insights.push({
      title: 'Mindful Mandalas - Adult Coloring Book',
      platform: 'Etsy',
      searchVolume: 67000,
      competition: 'Medium',
      price: '$8.99',
      trend: 'Steady Growth',
      buyingIntent: 78,
      reasoning: 'Adult coloring books maintain consistent demand. Mandala-specific searches show 67K/month volume. Low barrier to entry but requires unique designs. Current bestsellers at $8-12 range with 500+ sales/month. Strong recurring customer base.',
      keywords: ['mandala coloring', 'adult coloring book', 'mindfulness coloring', 'stress relief', 'meditation art']
    })

    insights.push({
      title: 'Botanical Gardens - Nature Coloring Collection',
      platform: 'Amazon KDP',
      searchVolume: 52000,
      competition: 'Low',
      price: '$9.99',
      trend: 'Rising',
      buyingIntent: 81,
      reasoning: 'Nature-themed coloring books trending upward. "Botanical coloring book" niche underserved with only 187 titles. High-quality illustrations in this segment sell 1,200+ copies monthly. Strong gift-giving potential for holidays.',
      keywords: ['botanical coloring', 'nature coloring book', 'flower coloring', 'garden art', 'plant illustrations']
    })
  }

  if (categoryLower.includes('journal') || categoryLower.includes('diary')) {
    insights.push({
      title: 'Gratitude & Manifestation Journal',
      platform: 'Etsy',
      searchVolume: 71000,
      competition: 'Low',
      price: '$11.99',
      trend: 'Rising Fast',
      buyingIntent: 89,
      reasoning: 'Manifestation journaling is a breakout trend with 71K searches monthly. Current competition focuses on basic gratitude journals. Combining gratitude + manifestation captures emerging niche. Top sellers at $11.99 with 3,000+ monthly sales.',
      keywords: ['manifestation journal', 'gratitude journal', 'law of attraction', 'daily affirmations', 'mindset journal']
    })

    insights.push({
      title: 'Self-Discovery Prompts - 365 Day Journal',
      platform: 'Amazon KDP',
      searchVolume: 43000,
      competition: 'Low',
      price: '$13.99',
      trend: 'Steady',
      buyingIntent: 85,
      reasoning: 'Self-improvement journals show consistent year-round demand. "Self discovery journal" has low competition (312 titles) vs high search volume. Prompt-based journals have higher perceived value, commanding $13.99+ price points with strong margins.',
      keywords: ['self discovery', 'journal prompts', 'personal growth journal', '365 days', 'daily reflection']
    })
  }

  if (categoryLower.includes('template') || categoryLower.includes('business')) {
    insights.push({
      title: 'Social Media Content Planner Templates',
      platform: 'Etsy',
      searchVolume: 89000,
      competition: 'Medium',
      price: '$19.99',
      trend: 'Rising Fast',
      buyingIntent: 94,
      reasoning: 'Small business owners and content creators desperately need organization tools. 89K monthly searches with 94% commercial intent. Current templates lack modern design. Canva-compatible templates in this niche sell 5,000+ times monthly at premium pricing.',
      keywords: ['social media planner', 'content calendar', 'instagram planner', 'post planning', 'social media templates']
    })

    insights.push({
      title: 'Business Proposal & Invoice Template Bundle',
      platform: 'Etsy',
      searchVolume: 56000,
      competition: 'Low',
      price: '$24.99',
      trend: 'Steady',
      buyingIntent: 96,
      reasoning: 'Freelancers and small businesses require professional documents. Bundle approach increases value perception. Current competition offers single templates. Bundles at $24.99 have 2x conversion rate vs individual templates. B2B buyer intent extremely high.',
      keywords: ['business proposal template', 'invoice template', 'contract template', 'freelance templates', 'business bundle']
    })
  }

  if (categoryLower.includes('ebook') || categoryLower.includes('book')) {
    insights.push({
      title: 'The Complete Guide to Passive Income Streams',
      platform: 'Amazon KDP',
      searchVolume: 124000,
      competition: 'High',
      price: '$9.99',
      trend: 'Rising',
      buyingIntent: 91,
      reasoning: 'Financial education eBooks have massive demand. "Passive income" searches at 124K/month indicate strong interest. While competition is high, niche sub-topics (e.g., "passive income for beginners 2025") are underserved. Comprehensive guides at $9.99 see 800+ monthly sales.',
      keywords: ['passive income', 'make money online', 'side hustle', 'financial freedom', 'income streams']
    })

    insights.push({
      title: 'Meal Prep Mastery: 30-Minute Family Dinners',
      platform: 'Amazon KDP',
      searchVolume: 67000,
      competition: 'Medium',
      price: '$7.99',
      trend: 'Steady Growth',
      buyingIntent: 88,
      reasoning: 'Recipe eBooks for busy families maintain strong demand. Meal prep niche less saturated than general cookbooks. Time-specific promises ("30-minute") increase conversion. Current bestsellers at $7.99 with 1,200+ monthly sales. Strong review potential drives organic ranking.',
      keywords: ['meal prep recipes', 'quick dinner recipes', 'family meals', '30 minute meals', 'easy cooking']
    })
  }

  if (categoryLower.includes('workbook') || categoryLower.includes('worksheet')) {
    insights.push({
      title: 'Anxiety Relief Workbook - CBT Techniques',
      platform: 'Etsy',
      searchVolume: 78000,
      competition: 'Low',
      price: '$16.99',
      trend: 'Rising Fast',
      buyingIntent: 90,
      reasoning: 'Mental health workbooks see explosive growth post-pandemic. CBT-based content has credibility. 78K searches with only 423 competing products. Therapeutic workbooks command premium pricing ($16.99) due to perceived value. High completion rate drives positive reviews.',
      keywords: ['anxiety workbook', 'cbt workbook', 'mental health', 'anxiety relief', 'therapy worksheets']
    })

    insights.push({
      title: 'Kids Activity Workbook - STEM Learning Fun',
      platform: 'Amazon KDP',
      searchVolume: 91000,
      competition: 'Medium',
      price: '$11.99',
      trend: 'Seasonal',
      buyingIntent: 86,
      reasoning: 'Educational workbooks for children peak during summer and holidays. STEM focus appeals to parents. 91K monthly searches with moderate competition. Activity books at ages 5-8 range sell best. Homeschool market provides year-round demand beyond seasonal spikes.',
      keywords: ['kids activity book', 'stem workbook', 'learning activities', 'educational workbook', 'homeschool']
    })
  }

  // If no specific matches, return general opportunities
  if (insights.length === 0) {
    insights.push({
      title: `${category} Ultimate Guide & Workbook`,
      platform: 'Amazon KDP',
      searchVolume: 35000,
      competition: 'Medium',
      price: '$12.99',
      trend: 'Steady',
      buyingIntent: 75,
      reasoning: `The "${category}" niche shows consistent interest with room for fresh content. Combining educational content with practical worksheets increases value. Current market has outdated offerings. Comprehensive guides in emerging niches can quickly gain traction with proper SEO.`,
      keywords: [category.toLowerCase(), `${category.toLowerCase()} guide`, `${category.toLowerCase()} workbook`, `learn ${category.toLowerCase()}`, `${category.toLowerCase()} tips`]
    })
  }

  return insights
}

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json()

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    const results = await performMarketResearch(category)

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Research error:', error)
    return NextResponse.json({ error: 'Research failed' }, { status: 500 })
  }
}
