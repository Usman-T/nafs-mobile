"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  PlayCircle,
  PauseCircle,
  Bookmark,
  Share2,
  MessageSquare,
  Scroll,
  Heart,
  Copy,
  Check,
  BookOpen,
  Save,
  Eye,
  Lightbulb,
} from "lucide-react"
import Loading from "@/components/ui/loading"

// Sample data for Al-Fatihah verses
const verses = [
  {
    id: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    transliteration: "Bismillahir rahmanir raheem",
    wordByWord: [
      { arabic: "بِسْمِ", translation: "In (the) name" },
      { arabic: "اللَّهِ", translation: "(of) Allah" },
      { arabic: "الرَّحْمَٰنِ", translation: "the Most Gracious" },
      { arabic: "الرَّحِيمِ", translation: "the Most Merciful" },
    ],
    tafsir:
      "This verse is known as the Basmalah, and it is recommended to recite it before starting any action. It acknowledges that everything we do is with the permission and blessing of Allah, who is described with two of His beautiful names: Ar-Rahman (the Most Gracious) and Ar-Raheem (the Most Merciful).",
    theme: "Divine Names",
    revelation: "This verse appears at the beginning of every surah except At-Tawbah.",
    benefits: "Reciting Bismillah brings barakah (blessing) to any action and serves as protection from Satan.",
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbil 'alamin",
    wordByWord: [
      { arabic: "الْحَمْدُ", translation: "All praise" },
      { arabic: "لِلَّهِ", translation: "(is) for Allah" },
      { arabic: "رَبِّ", translation: "(the) Lord" },
      { arabic: "الْعَالَمِينَ", translation: "(of) the worlds" },
    ],
    tafsir:
      "This verse establishes that all praise belongs to Allah alone, who is the Lord and Sustainer of all creation. The term 'worlds' refers to everything that exists, including all creatures, realms, and dimensions.",
    theme: "Praise and Lordship",
    revelation: "This verse teaches us the proper way to begin our prayers and supplications.",
    benefits: "Saying Alhamdulillah increases one's gratitude and brings contentment to the heart.",
  },
]

const surahData = {
  id: 1,
  name: "Al-Fatihah",
  arabicName: "الفاتحة",
  verses: 7,
  type: "Meccan",
  meaning: "The Opening",
}

export default function AyahPage() {
  const params = useParams()
  const router = useRouter()
  const surahId = Number(params.surahId)
  const ayahId = Number(params.ayahId)

  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTafsir, setShowTafsir] = useState(true)
  const [showWordByWord, setShowWordByWord] = useState(false)
  const [showReflection, setShowReflection] = useState(false)
  const [reflection, setReflection] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [fontSize, setFontSize] = useState(24)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const verse = verses.find((v) => v.id === ayahId) || verses[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(`${verse.arabic}\n\n${verse.translation}\n\n- ${surahData.name} ${ayahId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveReflection = () => {
    // Save reflection logic
    setShowReflection(false)
  }

  if (isLoading) {
    return <Loading fullScreen text="Loading ayah..." />
  }

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fe8019] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-[#3c3836]">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <h1 className="text-lg font-semibold">
              {surahData.name} {ayahId}
            </h1>
            <p className="text-sm text-[#a89984]">{verse.theme}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/dashboard/guidance/surah/${surahId}`)}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            <BookOpen className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Verse Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] relative overflow-hidden">
            <CardContent className="p-8">
              {/* Verse Number Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-[#fe8019] text-[#1d2021] text-lg px-4 py-2">Ayah {ayahId}</Badge>
              </div>

              {/* Arabic Text */}
              <motion.div whileHover={{ scale: 1.02 }} className="text-center mb-6">
                <p className="font-arabic text-[#fe8019] leading-loose mb-4" style={{ fontSize: `${fontSize}px` }}>
                  {verse.arabic}
                </p>
              </motion.div>

              {/* Translation */}
              <div className="text-center mb-6">
                <p className="text-xl text-[#ebdbb2] italic mb-2">"{verse.translation}"</p>
                <p className="text-[#a89984]">{verse.transliteration}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90"
                  >
                    {isPlaying ? <PauseCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
                    {isPlaying ? "Pause" : "Listen"}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`border-[#3c3836] ${
                      isBookmarked
                        ? "text-[#fabd2f] bg-[#3c3836]"
                        : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  >
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </motion.div>
              </div>

              {/* Toggle Buttons */}
              <div className="flex justify-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWordByWord(!showWordByWord)}
                  className="text-[#a89984] hover:text-[#ebdbb2]"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Word by Word
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReflection(!showReflection)}
                  className="text-[#a89984] hover:text-[#ebdbb2]"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Reflect
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Word by Word */}
        <AnimatePresence>
          {showWordByWord && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <Card className="bg-[#282828] border-[#3c3836]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-[#fe8019]" />
                    Word by Word Translation
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {verse.wordByWord.map((word, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-3 rounded-lg bg-[#1d2021] border border-[#3c3836]"
                      >
                        <p className="font-arabic text-xl text-[#fe8019] mb-2">{word.arabic}</p>
                        <p className="text-sm text-[#ebdbb2]">{word.translation}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tafsir */}
        <AnimatePresence>
          {showTafsir && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Card className="bg-[#282828] border-[#3c3836]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                    <Scroll className="h-5 w-5 mr-2 text-[#fe8019]" />
                    Tafsir (Explanation)
                  </h3>
                  <p className="text-[#a89984] leading-relaxed mb-4">{verse.tafsir}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                      <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-[#fabd2f]" />
                        Context
                      </h4>
                      <p className="text-sm text-[#a89984]">{verse.revelation}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                      <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-[#d3869b]" />
                        Benefits
                      </h4>
                      <p className="text-sm text-[#a89984]">{verse.benefits}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reflection */}
        <AnimatePresence>
          {showReflection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="bg-[#282828] border-[#3c3836]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-[#fe8019]" />
                    Your Reflection
                  </h3>
                  <Textarea
                    placeholder="What does this ayah mean to you? How can you apply it in your daily life?"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984] mb-4 min-h-[120px]"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveReflection}
                      className="bg-[#83a598] text-[#1d2021] hover:bg-[#83a598]/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Reflection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
