"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import SharingModal from "@/components/ui/sharing-modal";
import {
  Bookmark,
  Share2,
  PlayCircle,
  PauseCircle,
  MessageSquare,
  Scroll,
  Save,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DailyAyahSection = ({ ayah }) => {
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

export default DailyAyahSection;
