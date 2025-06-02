"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/ui/loading";
import SharingModal from "@/components/ui/sharing-modal";
import {
  Search,
  BookOpen,
  Bookmark,
  Share2,
  PlayCircle,
  PauseCircle,
  MessageSquare,
  Scroll,
  Headphones,
  Clock,
  Save,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Volume2,
  Award,
  Flame,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CommandPalette from "@/components/ui/command";
import { useInView } from "react-intersection-observer";

// Enhanced mock data
const dailyAyah = {
  id: 1,
  surahId: 1,
  ayahId: 1,
  arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  translation:
    "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
  transliteration: "Bismillahir rahmanir raheem",
  reference: "Al-Fatihah 1:1",
  tafsir:
    "This verse is known as the Basmalah, and it is recommended to recite it before starting any action. It acknowledges that everything we do is with the permission and blessing of Allah.",
  audio: "/audio/1_1.mp3",
  theme: "Divine Names",
  reflection: "",
};

const userStats = {
  totalReflections: 24,
  savedVerses: 18,
  completedSurahs: 3,
  listeningHours: 12.5,
  currentStreak: 7,
  totalReadingDays: 45,
};

const quickAccessFeatures = [
  {
    id: "audio",
    title: "Audio Player",
    description: "Listen to beautiful Quran recitations",
    icon: Headphones,
    color: "#8ec07c",
    route: "/dashboard/guidance/audio/1",
    stats: "12.5 hours listened",
    badge: "New",
  },
  {
    id: "saved",
    title: "Saved Verses",
    description: "Your bookmarked ayahs and favorites",
    icon: Bookmark,
    color: "#fabd2f",
    route: "/dashboard/guidance/saved",
    stats: `${userStats.savedVerses} verses saved`,
    badge: null,
  },
  {
    id: "reflections",
    title: "My Reflections",
    description: "Personal thoughts and insights",
    icon: MessageSquare,
    color: "#83a598",
    route: "/dashboard/guidance/reflections",
    stats: `${userStats.totalReflections} reflections`,
    badge: null,
  },
  {
    id: "progress",
    title: "Reading Progress",
    description: "Track your Quran journey",
    icon: TrendingUp,
    color: "#d3869b",
    route: "/dashboard/guidance/progress",
    stats: `${userStats.completedSurahs} surahs completed`,
    badge: null,
  },
];


const featuredSurahs = [
  {
    id: 1,
    name: "Al-Fatihah",
    arabicName: "الفاتحة",
    verses: 7,
    type: "Meccan",
    progress: 100,
    lastRead: "Today",
    hasAudio: true,
    hasReflections: true,
  },
  {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    verses: 286,
    type: "Medinan",
    progress: 45,
    lastRead: "Yesterday",
    hasAudio: true,
    hasReflections: false,
  },
];

const achievements = [
  {
    id: 1,
    title: "First Reflection",
    description: "Added your first personal reflection",
    icon: MessageSquare,
    unlocked: true,
    date: "Jan 10, 2024",
  },
  {
    id: 2,
    title: "Audio Explorer",
    description: "Listened to 10 hours of recitation",
    icon: Headphones,
    unlocked: true,
    date: "Jan 15, 2024",
  },
  {
    id: 3,
    title: "Consistent Reader",
    description: "Read Quran for 7 consecutive days",
    icon: Flame,
    unlocked: true,
    date: "Today",
  },
];

// Stats Overview Component
const StatsOverview = ({ stats }: { stats: typeof userStats }) => {
  const statItems = [
    {
      label: "Day Streak",
      value: stats.currentStreak,
      icon: Flame,
      color: "#fe8019",
    },
    {
      label: "Saved Verses",
      value: stats.savedVerses,
      icon: Bookmark,
      color: "#fabd2f",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {statItems.map((stat, index) => (
        <div key={stat.label}>
          <Card className="bg-[#282828] border-[#3c3836] relative overflow-hidden group hover:border-[#504945] transition-colors">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-[#ebdbb2]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#a89984]">{stat.label}</p>
                </div>
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon
                    className="h-4 w-4"
                    style={{ color: stat.color }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

// Daily Ayah Component
const DailyAyahSection = ({ ayah }: { ayah: typeof dailyAyah }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState(ayah.reflection);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSharing, setShowSharing] = useState(false);

  const router = useRouter();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSaveReflection = () => {
    setShowReflection(false);
  };

  const navigateToVerse = () => {
    router.push(`/dashboard/guidance/ayah/${ayah.surahId}/${ayah.ayahId}`);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] relative overflow-hidden">
        <CardContent className=" relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[#fe8019] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#1d2021]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#ebdbb2]">Daily Ayah</h2>
                <p className="text-xs text-[#a89984]">{ayah.reference}</p>
              </div>
            </div>
            <Badge className="bg-[#fe8019] text-[#1d2021] px-2 py-0.5 text-xs">
              {ayah.theme}
            </Badge>
          </div>

          {/* Arabic Text */}
          <div
            className="bg-[#1d2021] rounded-xl p-4 mb-4 border border-[#3c3836] cursor-pointer"
            onClick={navigateToVerse}
          >
            <p className="text-xl sm:text-2xl text-[#fe8019] text-right font-arabic leading-loose mb-3">
              {ayah.arabic}
            </p>
            <p className="text-[#ebdbb2] text-sm sm:text-base mb-2">
              "{ayah.translation}"
            </p>
            <p className="text-[#a89984] text-xs italic">
              {ayah.transliteration}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              onClick={handlePlayPause}
              size="sm"
              className="bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90 flex items-center gap-1"
            >
              {isPlaying ? (
                <PauseCircle className="h-3 w-3" />
              ) : (
                <PlayCircle className="h-3 w-3" />
              )}
              {isPlaying ? "Pause" : "Listen"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTafsir(!showTafsir)}
              className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            >
              <Scroll className="h-3 w-3 mr-1" />
              Tafsir
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReflection(!showReflection)}
              className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Reflect
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`border-[#3c3836] ${
                isBookmarked
                  ? "text-[#fabd2f] bg-[#3c3836]"
                  : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              }`}
            >
              <Bookmark
                className={`h-3 w-3 mr-1 ${isBookmarked ? "fill-current" : ""}`}
              />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSharing(true)}
              className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>

          {/* Tafsir Section */}
          {showTafsir && (
            <div className="mb-4">
              <div className="bg-[#1d2021] rounded-xl p-3 border border-[#3c3836]">
                <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center text-sm">
                  <Scroll className="h-3 w-3 mr-1 text-[#fe8019]" />
                  Tafsir
                </h4>
                <p className="text-[#a89984] text-xs leading-relaxed">
                  {ayah.tafsir}
                </p>
              </div>
            </div>
          )}

          {/* Reflection Section */}
          {showReflection && (
            <div>
              <div className="bg-[#1d2021] rounded-xl p-3 border border-[#3c3836]">
                <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center text-sm">
                  <MessageSquare className="h-3 w-3 mr-1 text-[#fe8019]" />
                  Your Reflection
                </h4>
                <Textarea
                  placeholder="What does this ayah mean to you? How can you apply it in your life?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984] mb-3 min-h-[80px] text-sm"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveReflection}
                    size="sm"
                    className="bg-[#83a598] text-[#1d2021] hover:bg-[#83a598]/90"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <SharingModal
        isOpen={showSharing}
        onClose={() => setShowSharing(false)}
        content={{
          arabic: ayah.arabic,
          translation: ayah.translation,
          reference: ayah.reference,
          type: "verse",
        }}
      />
    </>
  );
};

// Quick Access Features Component
const QuickAccessSection = ({
  features,
}: {
  features: typeof quickAccessFeatures;
}) => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className="cursor-pointer"
          onClick={() => router.push(feature.route)}
        >
          <Card className="bg-[#282828] border-[#3c3836] overflow-hidden relative group h-full">
            <CardContent className="">
              <div className="flex items-center justify-center mb-3">
                <div
                  className="h-16 w-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon
                    className="h-8 w-8"
                    style={{ color: feature.color }}
                  />
                </div>
              </div>

              <h3 className="text-base font-semibold text-[#ebdbb2]  text-center group-hover:text-[#fe8019] transition-colors">
                {feature.title}
              </h3>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

// Featured Surahs Component
const FeaturedSurahsSection = ({
  surahs,
}: {
  surahs: typeof featuredSurahs;
}) => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card className="bg-[#282828] border-[#3c3836]">
      <CardContent className="">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#ebdbb2] flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-[#fe8019]" />
            Continue Reading
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/guidance/surahs")}
            className="text-[#a89984] hover:text-[#ebdbb2] h-7 px-2 text-xs"
          >
            View All
          </Button>
        </div>

        <div ref={ref} className="space-y-3">
          {surahs.map((surah) => (
            <div
              key={surah.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#1d2021] border border-[#3c3836] hover:border-[#504945] transition-colors cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/guidance/surah/${surah.id}`)
              }
            >
              <div className="h-10 w-10 rounded-full bg-[#3c3836] flex items-center justify-center text-[#ebdbb2] font-medium flex-shrink-0 text-sm">
                {surah.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-[#ebdbb2] text-sm font-medium">
                    {surah.name}
                  </h4>
                  <p className="text-[#fe8019] font-arabic text-sm">
                    {surah.arabicName}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#a89984]">Progress</span>
                    <span className="text-[#ebdbb2]">{surah.progress}%</span>
                  </div>
                  <div className="w-full bg-[#3c3836] rounded-full h-1.5">
                    <div
                      className="bg-[#8ec07c] h-1.5 rounded-full"
                      style={{ width: `${surah.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#a89984]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Search Component
const EnhancedSearch = ({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
        <Input
          placeholder="Search surahs, verses, topics... (⌘K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onClick={onOpenCommandPalette}
          className={`pl-9 pr-4 py-5 text-sm bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984] transition-all ${
            isSearchFocused ? "border-[#fe8019]" : ""
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Badge className="bg-[#3c3836] text-[#a89984] text-xs">⌘K</Badge>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function GuidancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoading) {
    return <Loading fullScreen text="Loading your spiritual journey..." />;
  }

  return (
    <div className="space-y-6 pb-16 px-6 py-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#ebdbb2] mb-1">
          Guidance
        </h1>
        <p className="text-[#a89984] text-sm">Your journey through the Quran</p>
      </div>

      {/* Search */}
      <EnhancedSearch
        onOpenCommandPalette={() => setShowCommandPalette(true)}
      />

      {/* Stats Overview */}
      <div>
        <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
          <BarChart3 className="h-4 w-4 mr-2 text-[#fe8019]" />
          Your Progress
        </h2>
        <StatsOverview stats={userStats} />
      </div>

      {/* Daily Ayah */}
      <Suspense
        fallback={
          <div className="h-40 bg-[#282828] rounded-lg animate-pulse"></div>
        }
      >
        <DailyAyahSection ayah={dailyAyah} />
      </Suspense>

      {/* Quick Access Features */}
      <div>
        <h2 className="text-lg font-semibold text-[#ebdbb2] mb-3 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-[#fe8019]" />
          Quick Actions
        </h2>
        <QuickAccessSection features={quickAccessFeatures} />
      </div>


      {/* Featured Surahs */}
      <Suspense
        fallback={
          <div className="h-40 bg-[#282828] rounded-lg animate-pulse"></div>
        }
      >
        <FeaturedSurahsSection surahs={featuredSurahs} />
      </Suspense>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </div>
  );
}
