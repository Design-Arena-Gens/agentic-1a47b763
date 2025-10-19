'use client'

import { useState } from 'react'
import { Search, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

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

export default function ResearchDashboard() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ProductInsight[]>([])
  const [category, setCategory] = useState('')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const runResearch = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category }),
      })
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Research failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCompetitionColor = (competition: string) => {
    switch (competition.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getTrendColor = (trend: string) => {
    if (trend.toLowerCase().includes('rising')) return 'text-green-600'
    if (trend.toLowerCase().includes('declining')) return 'text-red-600'
    return 'text-blue-600'
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Market Research</h2>
        <p className="text-gray-600 mb-6">
          Enter a product category or niche to discover trending opportunities
        </p>

        <div className="flex gap-4">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., productivity planners, coloring books, wedding templates..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={runResearch}
            disabled={loading || !category}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Researching...' : 'Research'}
          </button>
        </div>

        {loading && (
          <div className="mt-8 text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing market trends across multiple platforms...</p>
            <p className="text-sm text-gray-500 mt-2">This may take 30-60 seconds</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Research Results ({results.length} opportunities found)
            </h3>
            <button className="text-primary hover:underline">Export as CSV</button>
          </div>

          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{result.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">{result.platform}</span>
                      <span>•</span>
                      <span>{result.price}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(result.competition)}`}>
                    {result.competition} Competition
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Search Volume</div>
                    <div className="text-2xl font-bold text-primary">
                      {result.searchVolume.toLocaleString()}
                      <span className="text-sm text-gray-600 ml-1">/month</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Buying Intent</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${result.buyingIntent}%` }}
                        ></div>
                      </div>
                      <span className="text-xl font-bold text-gray-800">{result.buyingIntent}%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Trend</div>
                    <div className={`text-lg font-semibold flex items-center gap-2 ${getTrendColor(result.trend)}`}>
                      <TrendingUp className="w-5 h-5" />
                      {result.trend}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Top Keywords:</div>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                >
                  {expandedIndex === index ? (
                    <>
                      <ChevronUp className="w-4 h-4" /> Hide Analysis
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" /> View Detailed Analysis
                    </>
                  )}
                </button>

                {expandedIndex === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        Market Opportunity Analysis
                      </h5>
                      <p className="text-gray-700 leading-relaxed">{result.reasoning}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No research results yet</h3>
          <p className="text-gray-600">Enter a category above to start discovering opportunities</p>
        </div>
      )}
    </div>
  )
}
