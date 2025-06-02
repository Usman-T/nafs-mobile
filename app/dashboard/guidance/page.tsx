"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BookOpen,
  Bookmark,
  Share2,
  ChevronRight,
  Award,
  Compass,
  Lightbulb,
  Flame,
  Clock,
  Check,
  Zap,
  Headphones,
  Scroll,
  MessageSquare,
  BarChart3,
  PlayCircle,
  Star,
  Target,
  Heart,
  Sparkles,
  Brain,
  Eye,
  Timer,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Volume2,
  CheckCircle,
  Loader,
  Book,
} from "lucide-react";
import { useRouter } from "next/navigation";
import CommandPalette from "@/components/ui/command";

// Enhanced daily ayah with audio and reflection features
const dailyAyah = {
  arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
  translation:
    "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
  transliteration: "Wa laqad yassarna al-Qurana lil-dhikri fahal min muddakir",
  reference: "Surah Al-Qamar, Ayah 17",
  theme: "Accessibility of Divine Guidance",
  reflection:
    "Allah has made the Quran accessible to all hearts and minds. Its wisdom can be understood by anyone who approaches it with sincerity and an open heart.",
  audioUrl: "/audio/daily-ayah.mp3",
  tags: ["Guidance", "Remembrance", "Accessibility", "Divine Mercy"],
};

// Enhanced Quran surahs with better categorization
const quranSurahs = [
  {
    id: 1,
    name: "Al-Fatihah",
    arabicName: "الفاتحة",
    verses: 7,
    type: "Meccan",
    category: "Essential",
    difficulty: "Beginner",
    estimatedTime: 5,
    keywords: ["Prayer", "Guidance", "Praise"],
  },
  {
    id: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    verses: 286,
    type: "Medinan",
    category: "Law & Guidance",
    difficulty: "Advanced",
    estimatedTime: 120,
    keywords: ["Laws", "Stories", "Guidance"],
  },
  {
    id: 3,
    name: "Aal-Imran",
    arabicName: "آل عمران",
    verses: 200,
    type: "Medinan",
    category: "Stories",
    difficulty: "Intermediate",
    estimatedTime: 80,
    keywords: ["Jesus", "Mary", "Unity"],
  },
  {
    id: 18,
    name: "Al-Kahf",
    arabicName: "الكهف",
    verses: 110,
    type: "Meccan",
    category: "Stories",
    difficulty: "Intermediate",
    estimatedTime: 45,
    keywords: ["Stories", "Wisdom", "Friday"],
  },
  {
    id: 36,
    name: "Ya-Sin",
    arabicName: "يس",
    verses: 83,
    type: "Meccan",
    category: "Heart of Quran",
    difficulty: "Intermediate",
    estimatedTime: 35,
    keywords: ["Heart", "Death", "Resurrection"],
  },
  {
    id: 67,
    name: "Al-Mulk",
    arabicName: "الملك",
    verses: 30,
    type: "Meccan",
    category: "Protection",
    difficulty: "Beginner",
    estimatedTime: 12,
    keywords: ["Kingdom", "Protection", "Death"],
  },
];

// Enhanced learning paths with detailed progression
const learningPaths = [
  {
    id: 1,
    title: "Quran for Beginners",
    description:
      "Start your journey with the fundamentals of Quran reading and understanding",
    icon: BookOpen,
    color: "#8ec07c",
    progress: 65,
    lessons: 15,
    completed: 10,
    estimatedTime: "3 weeks",
    difficulty: "Beginner",
    category: "Foundation",
    features: [
      "Audio pronunciation",
      "Basic Arabic",
      "Simple meanings",
      "Prayer verses",
    ],
  },
  {
    id: 2,
    title: "Daily Reflections",
    description:
      "Develop a habit of daily reflection with carefully selected verses",
    icon: Lightbulb,
    color: "#fabd2f",
    progress: 45,
    lessons: 30,
    completed: 14,
    estimatedTime: "1 month",
    difficulty: "Beginner",
    category: "Spiritual",
    features: [
      "Daily verses",
      "Guided reflection",
      "Personal journal",
      "Habit tracking",
    ],
  },
  {
    id: 3,
    title: "Tafsir Mastery",
    description:
      "Deep dive into classical and contemporary Quranic commentaries",
    icon: Scroll,
    color: "#fe8019",
    progress: 25,
    lessons: 25,
    completed: 6,
    estimatedTime: "6 weeks",
    difficulty: "Advanced",
    category: "Scholarship",
    features: [
      "Classical tafsir",
      "Modern context",
      "Historical background",
      "Scholarly debates",
    ],
  },
  {
    id: 4,
    title: "Prophetic Stories",
    description: "Learn from the stories of prophets mentioned in the Quran",
    icon: MessageSquare,
    color: "#83a598",
    progress: 80,
    lessons: 20,
    completed: 16,
    estimatedTime: "4 weeks",
    difficulty: "Intermediate",
    category: "Stories",
    features: [
      "Prophet stories",
      "Life lessons",
      "Historical context",
      "Moral guidance",
    ],
  },
  {
    id: 5,
    title: "Memorization Helper",
    description:
      "Scientific methods to help you memorize Quranic verses effectively",
    icon: Brain,
    color: "#d3869b",
    progress: 30,
    lessons: 18,
    completed: 5,
    estimatedTime: "Ongoing",
    difficulty: "Intermediate",
    category: "Memorization",
    features: [
      "Spaced repetition",
      "Audio aids",
      "Progress tracking",
      "Review system",
    ],
  },
  {
    id: 6,
    title: "Quran & Science",
    description:
      "Explore the scientific insights and miracles found in the Quran",
    icon: Eye,
    color: "#b16286",
    progress: 15,
    lessons: 12,
    completed: 2,
    estimatedTime: "3 weeks",
    difficulty: "Advanced",
    category: "Modern",
    features: [
      "Scientific verses",
      "Modern discoveries",
      "Expert commentary",
      "Visual aids",
    ],
  },
];

// Quick access features
const quickActions = [
  {
    icon: Search,
    label: "Search Quran",
    action: "search",
    color: "#fe8019",
  },
  {
    icon: Bookmark,
    label: "My Bookmarks",
    action: "bookmarks",
    color: "#fabd2f",
  },
  {
    icon: Headphones,
    label: "Audio Quran",
    action: "audio",
    color: "#8ec07c",
  },
  {
    icon: Book,
    label: "Learn",
    action: "learn",
    color: "#83a598",
  },
];

const Loading = () => {
  return <Loader className="w-8 h-8 " />;
};

// Enhanced daily ayah card with rich interactions
const DailyAyahCard = ({ ayah }: { ayah: typeof dailyAyah }) => {
  const [showReflection, setShowReflection] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 text-6xl">📖</div>
          <div className="absolute bottom-4 left-4 text-4xl">✨</div>
        </div>

        <CardHeader className="relative">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-[#ebdbb2] text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#fe8019]" />
                Daily Ayah
              </CardTitle>
              <CardDescription className="text-[#a89984] flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3" />
                {ayah.reference} • {ayah.theme}
              </CardDescription>
            </div>
            <Badge className="bg-[#fe8019] text-[#1d2021] px-3 py-1">
              <Trophy className="h-3 w-3 mr-1" />
              +50 XP
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative ">
          {/* Arabic text */}
          <motion.div
            className="bg-[#1d2021] rounded-lg p-6 border border-[#3c3836]"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-2xl text-[#fe8019] text-right font-arabic leading-loose mb-4">
              {ayah.arabic}
            </p>

            {/* Audio controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#a89984] hover:text-[#fe8019] hover:bg-[#3c3836]"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Playing...
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Listen
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-[#a89984] hover:text-[#fabd2f] hover:bg-[#3c3836]"
                onClick={() => setShowTransliteration(!showTransliteration)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showTransliteration ? "Hide" : "Show"} Transliteration
              </Button>
            </div>

            {/* Transliteration */}
            <AnimatePresence>
              {showTransliteration && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-[#3c3836]"
                >
                  <p className="text-[#a89984] italic text-center">
                    {ayah.transliteration}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Translation */}
          <div className="space-y-3">
            <p className="text-[#ebdbb2] text-lg leading-relaxed italic">
              "{ayah.translation}"
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {ayah.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-[#3c3836] text-[#a89984] text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              onClick={() => setShowReflection(!showReflection)}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showReflection ? "Hide" : "Show"} Reflection
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`border-[#3c3836] hover:bg-[#3c3836] ${
                isBookmarked
                  ? "text-[#fabd2f] border-[#fabd2f]"
                  : "text-[#a89984] hover:text-[#fabd2f]"
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
              />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-[#3c3836] text-[#a89984] hover:text-[#83a598] hover:bg-[#3c3836]"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Reflection section */}
          <AnimatePresence>
            {showReflection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
                  <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-[#d3869b]" />
                    Today's Reflection
                  </h4>
                  <p className="text-[#a89984] text-sm leading-relaxed">
                    {ayah.reflection}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="border-t border-[#3c3836] pt-4 relative ">
          <Button className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90 w-full">
            <Check className="h-4 w-4 mr-2" />
            Mark as Read & Earn XP
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Enhanced learning path card
const LearningPathCard = ({ path }: { path: (typeof learningPaths)[0] }) => {
  const IconComponent = path.icon;
  const progressPercentage = (path.completed / path.lessons) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <Card className="bg-[#282828] border-[#3c3836] hover:border-[#504945] transition-all duration-300 overflow-hidden relative group">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative ">
          <div className="flex items-start gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${path.color}20`, color: path.color }}
            >
              <IconComponent className="h-6 w-6" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-[#ebdbb2] text-lg">
                  {path.title}
                </CardTitle>
                <Badge
                  className="text-xs"
                  style={{
                    backgroundColor: `${path.color}20`,
                    color: path.color,
                  }}
                >
                  {path.difficulty}
                </Badge>
              </div>

              <CardDescription className="text-[#a89984] text-sm">
                {path.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative ">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Progress</span>
              <span className="text-[#ebdbb2]">
                {path.completed}/{path.lessons} lessons
              </span>
            </div>
            <div className="w-full bg-[#3c3836] rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: path.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2">
            {path.features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-[#a89984]"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: path.color }}
                />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1 text-[#a89984]">
              <Clock className="h-3 w-3" />
              {path.estimatedTime}
            </div>
            <div className="flex items-center gap-1 text-[#a89984]">
              <Award className="h-3 w-3" />
              {path.category}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-[#3c3836] pt-4 relative ">
          <Button
            className="w-full"
            style={{ backgroundColor: path.color, color: "#1d2021" }}
          >
            {path.completed > 0 ? "Continue Learning" : "Start Journey"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Enhanced surah card with quick actions
const SurahCard = ({ surah }: { surah: (typeof quranSurahs)[0] }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const navigateToSurah = () => {
    router.push(`/dashboard/guidance/surah/${surah.id}`);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "#8ec07c";
      case "Intermediate":
        return "#fabd2f";
      case "Advanced":
        return "#fb4934";
      default:
        return "#a89984";
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={navigateToSurah}
    >
      <Card className="bg-[#282828] border-[#3c3836] hover:border-[#504945] transition-all duration-300 overflow-hidden relative group">
        <CardContent className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-4">
            {/* Left side - Surah info */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#3c3836] flex items-center justify-center text-[#ebdbb2] font-bold text-sm sm:text-base flex-shrink-0">
                {surah.id}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[#ebdbb2] font-semibold text-base sm:text-lg truncate">
                  {surah.name}
                </h3>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[#a89984] flex-wrap">
                  <span>{surah.verses} verses</span>
                  <span className="hidden xs:inline">•</span>
                  <span className="hidden xs:inline">{surah.type}</span>
                  <span className="hidden xs:inline">•</span>
                  <span>{surah.estimatedTime} min</span>
                </div>
                {/* Mobile-only second row for type */}
                <div className="xs:hidden text-xs text-[#a89984] mt-1">
                  {surah.type}
                </div>
              </div>
            </div>
            
            {/* Right side - Arabic name and difficulty */}
            <div className="flex items-center justify-between sm:justify-end sm:text-right gap-3">
              <p className="text-xl sm:text-2xl text-[#fe8019] font-arabic">
                {surah.arabicName}
              </p>
              <Badge
                className="text-xs flex-shrink-0"
                style={{
                  backgroundColor: `${getDifficultyColor(surah.difficulty)}20`,
                  color: getDifficultyColor(surah.difficulty),
                }}
              >
                {surah.difficulty}
              </Badge>
            </div>
          </div>
          
          {/* Keywords */}
          <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
            {surah.keywords.slice(0, 4).map((keyword, index) => (
              <Badge
                key={index}
                className="bg-[#3c3836] text-[#a89984] text-xs"
              >
                {keyword}
              </Badge>
            ))}
            {surah.keywords.length > 4 && (
              <Badge className="bg-[#3c3836] text-[#a89984] text-xs">
                +{surah.keywords.length - 4}
              </Badge>
            )}
          </div>
          
          {/* Quick actions */}
          <AnimatePresence>
            {(isHovered || window.innerWidth < 640) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-2"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] text-xs sm:text-sm px-2 sm:px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle audio play
                  }}
                >
                  <Headphones className="h-3 w-3 sm:mr-1" />
                  <span className="hidden xs:inline ml-1">Listen</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] text-xs sm:text-sm px-2 sm:px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle bookmark
                  }}
                >
                  <Bookmark className="h-3 w-3 sm:mr-1" />
                  <span className="hidden xs:inline ml-1">Save</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Quick actions section
const QuickActionsSection = ({
  onActionClick,
}: {
  onActionClick: (action: string) => void;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {quickActions.map((action, index) => (
        <motion.div
          key={action.action}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => onActionClick(action.action)}
        >
          <Card className="bg-[#282828] border-[#3c3836] hover:border-[#504945] transition-all duration-300 text-center">
            <CardContent className="">
              <div
                className="h-12 w-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${action.color}20` }}
              >
                <action.icon
                  className="h-6 w-6"
                  style={{ color: action.color }}
                />
              </div>
              <h3 className="text-[#ebdbb2] font-medium text-sm mb-1">
                {action.label}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// Main guidance page component
export default function GuidancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSurahs, setFilteredSurahs] = useState(quranSurahs);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle filtering
  useEffect(() => {
    let filtered = quranSurahs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (surah) => surah.category === selectedCategory
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (surah) => surah.difficulty === selectedDifficulty
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (surah) =>
          surah.name.toLowerCase().includes(query) ||
          surah.arabicName.includes(query) ||
          surah.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query)
          )
      );
    }

    setFilteredSurahs(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "search":
        setShowCommandPalette(true);
        break;
      case "bookmarks":
        // Navigate to bookmarks
        break;
      case "audio":
        // Open audio player
        break;
      case "memory":
        // Open memory games
        break;
      case "achievements":
        // Show achievements
        break;
      case "groups":
        // Show study groups
        break;
    }
  };

  // Handle keyboard shortcuts
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
    return <Loading fullScreen text="Loading your guidance journey..." />;
  }

  const categories = [
    "All",
    ...Array.from(new Set(quranSurahs.map((s) => s.category))),
  ];
  const difficulties = [
    "All",
    ...Array.from(new Set(quranSurahs.map((s) => s.difficulty))),
  ];

  return (
    <div className="pb-20 p-8">
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#282828] to-[#1d2021] border border-[#3c3836] mb-6">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#fe8019] opacity-5"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(40px)",
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-[#ebdbb2] mb-2"
              >
                Guidance
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#a89984] text-lg"
              >
                Your journey through the Quran and spiritual growth
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full md:w-80"
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-[#1d2021] border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                onClick={() => setShowCommandPalette(true)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search Quran, verses, topics...
                <Badge className="ml-auto bg-[#3c3836] text-[#a89984] text-xs">
                  ⌘K
                </Badge>
              </Button>
            </motion.div>
          </div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-[#1d2021]/50 rounded-lg p-4 border border-[#3c3836]">
              <div className="text-2xl font-bold text-[#fe8019]">127</div>
              <div className="text-[#a89984] text-sm">Verses Read</div>
            </div>
            <div className="bg-[#1d2021]/50 rounded-lg p-4 border border-[#3c3836]">
              <div className="text-2xl font-bold text-[#8ec07c]">5</div>
              <div className="text-[#a89984] text-sm">Surahs Completed</div>
            </div>
            <div className="bg-[#1d2021]/50 rounded-lg p-4 border border-[#3c3836]">
              <div className="text-2xl font-bold text-[#fabd2f]">14</div>
              <div className="text-[#a89984] text-sm">Day Streak</div>
            </div>
            <div className="bg-[#1d2021]/50 rounded-lg p-4 border border-[#3c3836]">
              <div className="text-2xl font-bold text-[#d3869b]">1,250</div>
              <div className="text-[#a89984] text-sm">Total XP</div>
            </div>
          </motion.div>
        </div>
      </div>

      <Tabs
        defaultValue="home"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <TabsList className="flex space-x-2 w-full md:w-auto">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-[#fe8019] data-[state=active]:text-[#1d2021]"
            >
              <Compass className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger
              value="quran"
              className="data-[state=active]:bg-[#fe8019] data-[state=active]:text-[#1d2021]"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Quran
            </TabsTrigger>
            <TabsTrigger
              value="learn"
              className="data-[state=active]:bg-[#fe8019] data-[state=active]:text-[#1d2021]"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Learn
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="home" className="space-y-8">
          {/* Daily Ayah */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <DailyAyahCard ayah={dailyAyah} />
          </motion.section>

          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#ebdbb2] flex items-center">
                <Zap className="h-5 w-5 mr-2 text-[#fe8019]" />
                Quick Actions
              </h2>
            </div>
            <QuickActionsSection onActionClick={handleQuickAction} />
          </motion.section>

          {/* Featured Learning Paths */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#ebdbb2] flex items-center">
                <Compass className="h-5 w-5 mr-2 text-[#fe8019]" />
                Continue Your Journey
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="text-[#a89984] border-[#3c3836] hover:bg-[#3c3836]"
                onClick={() => setActiveTab("learn")}
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningPaths.slice(0, 4).map((path) => (
                <LearningPathCard key={path.id} path={path} />
              ))}
            </div>
          </motion.section>
        </TabsContent>

        <TabsContent value="quran" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-[#ebdbb2] flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-[#fe8019]" />
              Explore the Quran
            </h2>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                className="bg-[#282828] border border-[#3c3836] rounded-lg px-3 py-2 text-[#ebdbb2] text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                className="bg-[#282828] border border-[#3c3836] rounded-lg px-3 py-2 text-[#ebdbb2] text-sm"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSurahs.map((surah) => (
              <SurahCard key={surah.id} surah={surah} />
            ))}
          </div>

          {filteredSurahs.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-[#504945] mx-auto mb-4" />
              <p className="text-[#a89984] mb-2">No surahs found</p>
              <p className="text-sm text-[#504945]">
                Try adjusting your filters or search terms
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="learn" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#ebdbb2] flex items-center">
              <Lightbulb className="h-6 w-6 mr-2 text-[#fe8019]" />
              Learning Paths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#ebdbb2] flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-[#fe8019]" />
              Your Progress
            </h2>
          </div>

          {/* Progress stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#a89984] text-sm mb-1">
                      Reading Streak
                    </p>
                    <p className="text-3xl font-bold text-[#fe8019]">14 days</p>
                    <p className="text-[#504945] text-xs">
                      Personal best: 21 days
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-[#fe8019]/20 flex items-center justify-center">
                    <Flame className="h-8 w-8 text-[#fe8019]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#a89984] text-sm mb-1">
                      Knowledge Level
                    </p>
                    <p className="text-3xl font-bold text-[#8ec07c]">Level 7</p>
                    <p className="text-[#504945] text-xs">1,250 / 1,500 XP</p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-[#8ec07c]/20 flex items-center justify-center">
                    <Star className="h-8 w-8 text-[#8ec07c]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#a89984] text-sm mb-1">
                      Total Study Time
                    </p>
                    <p className="text-3xl font-bold text-[#fabd2f]">47h</p>
                    <p className="text-[#504945] text-xs">
                      This month: 12h 30m
                    </p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-[#fabd2f]/20 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-[#fabd2f]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent achievements */}
          <Card className="bg-[#282828] border-[#3c3836]">
            <CardHeader>
              <CardTitle className="text-[#ebdbb2] flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-[#fabd2f]" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Consistent Reader",
                    description: "Read for 7 days straight",
                    xp: 100,
                    icon: BookOpen,
                    color: "#8ec07c",
                  },
                  {
                    title: "Wisdom Seeker",
                    description: "Completed 5 learning paths",
                    xp: 250,
                    icon: Lightbulb,
                    color: "#fabd2f",
                  },
                  {
                    title: "Community Helper",
                    description: "Shared 10 insights",
                    xp: 150,
                    icon: Heart,
                    color: "#d3869b",
                  },
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-[#1d2021] rounded-lg border border-[#3c3836]"
                  >
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${achievement.color}20` }}
                    >
                      <achievement.icon
                        className="h-6 w-6"
                        style={{ color: achievement.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#ebdbb2] font-medium">
                        {achievement.title}
                      </h4>
                      <p className="text-[#a89984] text-sm">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge className="bg-[#fabd2f] text-[#1d2021]">
                      +{achievement.xp} XP
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </div>
  );
}
