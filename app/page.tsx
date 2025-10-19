'use client'

import { useState } from 'react'
import { Search, TrendingUp, Zap, FileText, BookOpen, Layout, Image } from 'lucide-react'
import ResearchDashboard from './components/ResearchDashboard'
import ProductGenerator from './components/ProductGenerator'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'research' | 'generate'>('research')

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Digital Product Research Agent</h1>
            <p className="text-xl opacity-90 mb-6">
              AI-Powered Market Research & Product Generation Platform
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Discover trending digital products with high demand and low competition.
              Automatically generate professional eBooks, journals, templates, and more.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Search className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Deep Market Research</h3>
              <p className="opacity-90">Analyze Amazon, Etsy, and other platforms for trending products</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Competition Analysis</h3>
              <p className="opacity-90">Find high-volume, low-competition niches with buying intent</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Auto-Generate Products</h3>
              <p className="opacity-90">Create professional digital products instantly with AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('research')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'research'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Market Research
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'generate'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Generate Product
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'research' ? <ResearchDashboard /> : <ProductGenerator />}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-600">
            <p className="mb-4">Supported Product Types:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <BookOpen className="w-5 h-5" /> eBooks
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <FileText className="w-5 h-5" /> Journals
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <Layout className="w-5 h-5" /> Templates
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <Image className="w-5 h-5" /> Coloring Books
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <FileText className="w-5 h-5" /> Workbooks
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
