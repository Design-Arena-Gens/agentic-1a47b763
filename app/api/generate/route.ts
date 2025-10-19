import { NextRequest } from 'next/server'

interface GenerationRequest {
  productType: string
  topic: string
}

async function generateProductContent(productType: string, topic: string) {
  // Simulate AI content generation with progress updates
  const steps = [
    'Analyzing market trends and audience...',
    'Researching content structure...',
    'Generating outline and chapters...',
    'Writing professional content...',
    'Designing layout and formatting...',
    'Creating visual elements...',
    'Finalizing PDF document...',
    'Product ready for download!'
  ]

  return { steps }
}

function generateProductDetails(productType: string, topic: string) {
  const typeLabels: Record<string, string> = {
    ebook: 'eBook',
    journal: 'Journal',
    planner: 'Planner',
    coloring: 'Coloring Book',
    workbook: 'Workbook',
    template: 'Template Pack'
  }

  const descriptions: Record<string, string> = {
    ebook: `A comprehensive ${topic} eBook with 50+ pages of expert content, professional formatting, and actionable insights. Includes table of contents, chapter summaries, and bonus resources.`,
    journal: `A beautifully designed ${topic} journal featuring 100+ guided prompts, reflection pages, and tracking tools. Perfect for daily use with space for personal notes and goal setting.`,
    planner: `A professional ${topic} planner with monthly spreads, weekly layouts, goal-setting pages, and progress trackers. Includes bonus templates and planning guides.`,
    coloring: `An artistic ${topic} coloring book with 40 unique, intricate designs on single-sided pages. Features various complexity levels suitable for all skill levels.`,
    workbook: `An interactive ${topic} workbook with exercises, worksheets, and practical activities. Includes answer keys, progress trackers, and bonus downloadable resources.`,
    template: `A complete ${topic} template pack with 20+ professionally designed, fully customizable templates. Includes instructions, examples, and commercial use license.`
  }

  const title = `${topic.charAt(0).toUpperCase() + topic.slice(1)} - Professional ${typeLabels[productType]}`

  return {
    title,
    type: typeLabels[productType],
    description: descriptions[productType] || `A professional ${topic} ${typeLabels[productType]} created with AI-powered content generation.`,
    downloadUrl: '/api/download/sample-product.pdf'
  }
}

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()

  try {
    const { productType, topic }: GenerationRequest = await request.json()

    if (!productType || !topic) {
      return new Response(
        JSON.stringify({ error: 'Product type and topic are required' }),
        { status: 400 }
      )
    }

    const { steps } = await generateProductContent(productType, topic)

    const stream = new ReadableStream({
      async start(controller) {
        // Send progress updates
        for (let i = 0; i < steps.length; i++) {
          const progress = steps[i]
          const data = `data: ${JSON.stringify({ progress })}\n\n`
          controller.enqueue(encoder.encode(data))

          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 1500))
        }

        // Send final product
        const product = generateProductDetails(productType, topic)
        const data = `data: ${JSON.stringify({ product })}\n\n`
        controller.enqueue(encoder.encode(data))

        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Generation error:', error)
    return new Response(
      JSON.stringify({ error: 'Generation failed' }),
      { status: 500 }
    )
  }
}
