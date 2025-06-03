import axios from "axios";
import { getQuranApiToken } from "./token";

export async function fetchRandomVerse() {
  try {
    const token = await getQuranApiToken();
    // const verseKey = Math.floor(Math.random() * 114) + 1 + ':' + Math.floor(Math.random() * 4) + 1;
    const verseKey = "1:2";
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
    };

    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.error("Error fetching random verse:", error);
    throw error;
  }
}
