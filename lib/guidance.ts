import axios from "axios";
import { getQuranApiToken } from "./token";

export async function fetchRandomVerse() {
  const token = await getQuranApiToken();
  // const verseKey = Math.floor(Math.random() * 114) + 1 + ':' + Math.floor(Math.random() * 4) + 1;
  const verseKey = "1:1";
  console.log({ verseKey });

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://apis-prelive.quran.foundation/content/api/v4/verses/by_key/${verseKey}`,
    headers: {
      Accept: "application/json",
      "x-auth-token": token,
      "x-client-id": process.env.QURAN_API_CLIENT_ID!,
    },
    params: {
      language: "english",
      words: true,
      translations: "85",
      tafsirs: "169",
      fields: "text_uthmani,text_imlaei,text_indopak,text_uthmani_simple",
    },
  };

  try {
    const response = await axios(config);
    return response.data.verse;
  } catch (error) {
    console.error("Error fetching random verse:", error.response);
    throw new Error("Failed to fetch random verse");
  }
}

export async function fetchVerse(surahId: number, ayahId: number) {
  const token = await getQuranApiToken();
  const verseKey = `${surahId}:${ayahId}`;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://apis-prelive.quran.foundation/content/api/v4/verses/by_key/${verseKey}`,
    headers: {
      Accept: "application/json",
      "x-auth-token": token,
      "x-client-id": process.env.QURAN_API_CLIENT_ID!,
    },
    params: {
      language: "english",
      words: true,
      translations: "85",
      tafsirs: "169",
      fields: "text_uthmani,text_imlaei,text_indopak,text_uthmani_simple",
      word_fields: "text_indopak",
    },
  };

  try {
    const response = await axios(config);
    return response.data.verse;
  } catch (error) {
    console.error("Error fetching verse:", error.response);
    throw new Error("Failed to fetch verse");
  }
}

export async function fetchAllSurahs() {
  const token = await getQuranApiToken();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://apis-prelive.quran.foundation/content/api/v4/chapters",
    headers: {
      Accept: "application/json",
      "x-auth-token": token,
      "x-client-id": process.env.QURAN_API_CLIENT_ID,
    },
  };

  try {
    const response = await axios(config);
    console.log({ response: response.data.chapters });
    return response.data.chapters;
  } catch (error) {
    console.error("Error fetching all surahs:", error);
    throw new Error("Failed to fetch all surahs");
  }
}
