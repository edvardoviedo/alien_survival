import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { generateSurvivalAdvice } from './zodiac.js'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nickname: '',
    birthdate: '',
    birthplace: '',
    favoriteColor: '#00ff88'
  })
  
  const [advice, setAdvice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nickname || !formData.birthdate || !formData.birthplace) {
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Get basic zodiac info
      const basicInfo = await generateSurvivalAdvice(formData)
      
      // Call backend API for LLM-generated advice
      const response = await fetch('/api/generate-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(basicInfo)
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate survival advice')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setAdvice(result.advice)
      } else {
        throw new Error(result.error || 'Unknown error occurred')
      }
      
    } catch (err) {
      console.error('Error generating advice:', err)
      setError('Failed to generate your survival protocol. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setAdvice(null)
    setError(null)
    setFormData({
      nickname: '',
      birthdate: '',
      birthplace: '',
      favoriteColor: '#00ff88'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
            👽 The Ultimate What-to-Do Reveal 👽
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 animate-bounce">
            (Just in Case) the Alien Invasion Occurs Today!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!advice ? (
            /* Form */
            <Card className="glass-card backdrop-blur-lg bg-white/10 border-purple-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white">
                  🛸 Prepare for Contact 🛸
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nickname" className="text-purple-200">
                      Nickname
                    </Label>
                    <Input
                      id="nickname"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      className="glass-input bg-white/5 border-purple-400/50 text-white placeholder-purple-300"
                      placeholder="What should the aliens call you?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthdate" className="text-purple-200">
                      Birth Date
                    </Label>
                    <Input
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      className="glass-input bg-white/5 border-purple-400/50 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthplace" className="text-purple-200">
                      Birth Place
                    </Label>
                    <Input
                      id="birthplace"
                      name="birthplace"
                      value={formData.birthplace}
                      onChange={handleInputChange}
                      className="glass-input bg-white/5 border-purple-400/50 text-white placeholder-purple-300"
                      placeholder="Where on Earth are you from?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteColor" className="text-purple-200">
                      Favorite Color
                    </Label>
                    <div className="flex items-center space-x-3">
                      <input
                        id="favoriteColor"
                        name="favoriteColor"
                        type="color"
                        value={formData.favoriteColor}
                        onChange={handleInputChange}
                        className="w-12 h-12 rounded-lg border-2 border-purple-400/50 bg-transparent cursor-pointer"
                      />
                      <span className="text-purple-200">{formData.favoriteColor}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Consulting the Cosmic AI Database...
                      </div>
                    ) : (
                      '🚀 Generate My Survival Plan 🚀'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Result card */
            <Card className="result-card glass-card backdrop-blur-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-400/50 shadow-2xl relative overflow-hidden">
              {/* Rotating light effect */}
              <div className="rotating-light"></div>
              
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-3xl text-white mb-2">
                  🛸 {advice.nickname}'s Alien Survival Protocol 🛸
                </CardTitle>
                <p className="text-purple-300">
                  Based on cosmic AI analysis from {advice.birthplace}
                </p>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        ♈ Zodiac Analysis
                      </h3>
                      <p className="text-white">
                        As a <strong>{advice.zodiacSign}</strong> with a <strong>{advice.personality}</strong> personality...
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        🍽️ Survival Nutrition
                      </h3>
                      <p className="text-white">
                        I recommend you eat <strong>{advice.food}</strong> because {advice.foodReason}.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        ⚔️ Weapon of Choice
                      </h3>
                      <p className="text-white">
                        Your ideal weapon: <strong>{advice.weapon}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        💪 Motivation Boost
                      </h3>
                      <p className="text-white">
                        It's time to stop procrastinating because you need to be in shape to run fast and survive the invasion!
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        👗 Battle Outfit
                      </h3>
                      <p className="text-white">
                        Wear: <strong>{advice.clothing}</strong>
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white/5 border border-purple-400/30">
                      <h3 className="text-lg font-semibold text-purple-300 mb-2">
                        🎵 Victory Dance
                      </h3>
                      <p className="text-white">
                        Dance to <strong>"{advice.song}"</strong> non-stop! {advice.songReason}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-purple-400/30">
                  <Button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    🔄 Generate New Protocol 🔄
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

