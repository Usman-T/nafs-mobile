"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import Loading from "@/components/ui/loading";
import AyahContent from "@/components/custom/guidance/ayah/ayah-content";

// Sample data for Al-Fatihah verses
const verses = [
  {
    id: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
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
    revelation:
      "This verse appears at the beginning of every surah except At-Tawbah.",
    benefits:
      "Reciting Bismillah brings barakah (blessing) to any action and serves as protection from Satan.",
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
    revelation:
      "This verse teaches us the proper way to begin our prayers and supplications.",
    benefits:
      "Saying Alhamdulillah increases one's gratitude and brings contentment to the heart.",
  },
];

const surahData = {
  id: 1,
  name: "Al-Fatihah",
  arabicName: "الفاتحة",
  verses: 7,
  type: "Meccan",
  meaning: "The Opening",
};

export default function AyahPage() {
  const params = useParams();
  const router = useRouter();
  const surahId = Number(params.surahId);
  const ayahId = Number(params.ayahId);
  const verse = verses.find((v) => v.id === ayahId);

  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return <Loading fullScreen text="Loading ayah..." />;
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
            <p className="text-sm text-[#a89984]">{}</p>
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

      <AyahContent verse={verse} ayahId={ayahId} />
    </div>
  );
}
