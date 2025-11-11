import axios from "axios";
import cheerio from "cheerio";

export async function fetchPreview(url: string) {
  try {
    const { data } = await axios.get(url, { timeout: 7000 });
    const $ = cheerio.load(data);

    const getMeta = (name: string) =>
      $(`meta[name='${name}']`).attr("content") ||
      $(`meta[property='${name}']`).attr("content") ||
      $(`meta[property='og:${name}']`).attr("content");

    const title =
      $("title").first().text() ||
      $("meta[property='og:title']").attr("content") ||
      getMeta("title") ||
      "";

    const description = getMeta("description") || $("meta[property='og:description']").attr("content") || "";

    const image =
      $("meta[property='og:image']").attr("content") ||
      $("link[rel='image_src']").attr("href") ||
      $("img").first().attr("src") ||
      "";

    return { title, description, image };
  } catch (err) {
    return { title: "", description: "", image: "" };
  }
}