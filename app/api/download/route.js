// App's External Imports
import ytdl from "ytdl-core";

export const GET = async (request, response) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("YouTube video ID is required", {
      status: 400,
    });
  }

  try {
    const response_headers = new Headers(response.headers);

    response_headers.set(
      "Content-Disposition",
      `attachment; filename="${id}.mp4"`
    );

    response_headers.set(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );

    const data = ytdl(id);

    return new Response(data, {
      headers: response_headers,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to download video", {
      status: 500,
    });
  }
};
