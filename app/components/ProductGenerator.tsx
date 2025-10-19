'use client'

import { useState } from 'react'
import { Sparkles, Download, FileText, BookOpen, Layout, Image, Palette } from 'lucide-react'

interface GeneratedProduct {
  title: string
  type: string
  description: string
  downloadUrl: string
}

export default function ProductGenerator() {
  const [loading, setLoading] = useState(false)
  const [productType, setProductType] = useState('ebook')
  const [topic, setTopic] = useState('')
  const [generatedProduct, setGeneratedProduct] = useState<GeneratedProduct | null>(null)
  const [progress, setProgress] = useState('')

  const productTypes = [
    { id: 'ebook', label: 'eBook', icon: BookOpen, description: 'Full-length digital book' },
    { id: 'journal', label: 'Journal', icon: FileText, description: 'Guided journal with prompts' },
    { id: 'planner', label: 'Planner', icon: Layout, description: 'Productivity planner' },
    { id: 'coloring', label: 'Coloring Book', icon: Palette, description: 'Adult coloring pages' },
    { id: 'workbook', label: 'Workbook', icon: FileText, description: 'Interactive workbook' },
    { id: 'template', label: 'Template Pack', icon: Layout, description: 'Business templates' },
  ]

  const generateProduct = async () => {
    setLoading(true)
    setProgress('Initializing AI generation...')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productType, topic }),
      })

      if (!response.ok) throw new Error('Generation failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6))
              if (data.progress) {
                setProgress(data.progress)
              }
              if (data.product) {
                setGeneratedProduct(data.product)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Generation failed:', error)
      setProgress('Generation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Generator Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Generate Digital Product</h2>
        <p className="text-gray-600 mb-6">
          Create professional digital products automatically using AI
        </p>

        {/* Product Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Product Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {productTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setProductType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    productType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-2 ${productType === type.id ? 'text-primary' : 'text-gray-600'}`} />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{type.label}</div>
                    <div className="text-xs text-gray-600">{type.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Topic Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Topic / Niche
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Mindfulness meditation guide, Budget planner for couples..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateProduct}
          disabled={loading || !topic}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 text-lg"
        >
          <Sparkles className="w-6 h-6" />
          {loading ? 'Generating...' : 'Generate Product'}
        </button>

        {/* Progress */}
        {loading && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="loading-spinner"></div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 mb-1">AI is working...</div>
                <div className="text-gray-600">{progress}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generated Product Preview */}
      {generatedProduct && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Your Product is Ready!</h3>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              ✓ Generated
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Product Title</div>
              <div className="text-xl font-bold text-gray-800">{generatedProduct.title}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Type</div>
              <div className="text-gray-800">{generatedProduct.type}</div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Description</div>
              <div className="text-gray-700 leading-relaxed">{generatedProduct.description}</div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <a
                href={generatedProduct.downloadUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Product
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      {!generatedProduct && !loading && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3">What gets generated?</h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Professional design:</strong> AI-crafted layouts, typography, and formatting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Complete content:</strong> Researched, well-written content tailored to your niche</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Market-ready:</strong> Ready to sell on Etsy, Amazon, Gumroad, or your own store</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Instant download:</strong> PDF format with professional presentation</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
