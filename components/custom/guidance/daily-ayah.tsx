"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SharingModal from "@/components/ui/sharing-modal";
import {
  Share2,
  PlayCircle,
  Scroll,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const DailyAyahSection = ({ apiVerse }) => {
  const [showTafsir, setShowTafsir] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSharing, setShowSharing] = useState(false);

  const router = useRouter();

  const mapAyah = (apiVerse) => {
    console.log(apiVerse);
    return {
      arabic: apiVerse.text_uthmani,
      translation: apiVerse.translations?.[0]?.text || "",
      reference: `Surah ${apiVerse.verse_key.split(":")[0]}, Ayah ${
        apiVerse.verse_number
      }`,
      transliteration: "",
      theme: "",
      reflection: "",
      surahId: apiVerse.verse_key.split(":")[0],
      ayahId: apiVerse.verse_number,
      tafsir: apiVerse.tafsirs?.[0]?.text || "",
    };
  };

  const ayah = mapAyah(apiVerse);
  console.log(ayah);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${ayah.arabic}\n\n${ayah.translation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateToVerse = () => {
    router.push(`/dashboard/guidance/ayah/${ayah.surahId}/${ayah.ayahId}`);
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-[#282828] to-[#1d2021] border-[#3c3836] relative overflow-hidden">
        <CardContent className=" relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[#fe8019] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#1d2021]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#ebdbb2]">Daily Ayah</h2>
                <p className="text-xs text-[#a89984]">{ayah.reference}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-start ">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${"text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"}`}
                onClick={navigateToVerse}
              >
                <PlayCircle className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${"text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"}`}
                onClick={() => setShowTafsir(!showTafsir)}
              >
                <Scroll className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${"text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"} ${
                  copied ? "text-[#8ec07c]" : ""
                }`}
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]`}
                onClick={() => {
                  setShowSharing(true);
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
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

          <AnimatePresence initial={false}>
            {showTafsir && (
              <motion.div
                key="tafsir"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mb-4"
              >
                <div className="bg-[#1d2021] rounded-xl p-3 border border-[#3c3836]">
                  <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center text-sm">
                    <Scroll className="h-3 w-3 mr-1 text-[#fe8019]" />
                    Tafsir
                  </h4>
                  <p className="text-[#a89984] text-xs leading-relaxed">
                    {ayah.tafsir}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <SharingModal
        isOpen={showSharing}
        onClose={() => {
          localStorage.removeItem("nafs-hide-mobile-nav");
          setShowSharing(false);
        }}
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
