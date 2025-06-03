import React from "react";
import DailyAyahSection from "../daily-ayah";
import { fetchRandomVerse } from "@/lib/guidance";

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

const DailyAyahWrapper = async () => {
  const dailyAyahFetched = await fetchRandomVerse(); 
  console.log("fetched ayah", dailyAyahFetched);

  return (
    <>
      <DailyAyahSection ayah={dailyAyah} />
    </>
  );
};

export default DailyAyahWrapper;
