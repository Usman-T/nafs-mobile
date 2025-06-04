import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlayCircle,
  PauseCircle,
  Bookmark,
  Share2,
  MessageSquare,
  Scroll,
  Heart,
  Copy,
  Check,
  Save,
  Eye,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";

type WordByWord = {
  arabic: string;
  translation: string;
};

type Verse = {
  id: number;
  arabic: string;
  translation: string;
  transliteration: string;
  wordByWord: WordByWord[];
  tafsir: string;
  theme: string;
  revelation: string;
  benefits: string;
};

type AyahContentProps = {
  verse: Verse;
  ayahId: number;
};

const AyahContent = ({ verse, ayahId }: AyahContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTafsir, setShowTafsir] = useState(true);
  const [showWordByWord, setShowWordByWord] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(24);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${verse.arabic}\n\n${verse.translation}\n\n- Ayah ${ayahId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveReflection = () => {
    setShowReflection(false);
  };
  return (
    <div className="relative z-10 max-w-4xl mx-auto p-6">
      {/* Verse Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] relative overflow-hidden">
          <CardContent className="p-8">
            {/* Verse Number Badge */}
            <div className="flex justify-center mb-6">
              <Badge className="bg-[#fe8019] text-[#1d2021] text-lg px-4 py-2">
                Ayah {ayahId}
              </Badge>
            </div>

            {/* Arabic Text */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center mb-6"
            >
              <p
                className="font-arabic text-[#fe8019] leading-loose mb-4"
                style={{ fontSize: `${fontSize}px` }}
              >
                {verse.arabic}
              </p>
            </motion.div>

            {/* Translation */}
            <div className="text-center mb-6">
              <p className="text-xl text-[#ebdbb2] italic mb-2">
                "{verse.translation}"
              </p>
              <p className="text-[#a89984]">{verse.transliteration}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90"
                >
                  {isPlaying ? (
                    <PauseCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <PlayCircle className="h-4 w-4 mr-2" />
                  )}
                  {isPlaying ? "Pause" : "Listen"}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`border-[#3c3836] ${
                    isBookmarked
                      ? "text-[#fabd2f] bg-[#3c3836]"
                      : "text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  }`}
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${
                      isBookmarked ? "fill-current" : ""
                    }`}
                  />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
                      <p className="font-arabic text-xl text-[#fe8019] mb-2">
                        {word.arabic}
                      </p>
                      <p className="text-sm text-[#ebdbb2]">
                        {word.translation}
                      </p>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-[#282828] border-[#3c3836]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#ebdbb2] mb-4 flex items-center">
                  <Scroll className="h-5 w-5 mr-2 text-[#fe8019]" />
                  Tafsir (Explanation)
                </h3>
                <p className="text-[#a89984] leading-relaxed mb-4">
                  {verse.tafsir}
                </p>

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
  );
};

export default AyahContent;
