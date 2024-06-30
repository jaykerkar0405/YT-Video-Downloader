"use client";

// React's Hook Imports
import { useState, useEffect } from "react";

export default function Home() {
  const [video_id, set_video_id] = useState("");
  const [video_url, set_video_url] = useState("");
  const [loading, set_loading] = useState(false);

  const handle_input_change = (event) => {
    set_video_url(event.target.value);
  };

  const get_video_id = () => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/]+)/;

    const match = video_url.match(regex);
    return match ? match[1] : null;
  };

  const download = async () => {
    set_loading(true);

    try {
      const response = await fetch(`/api/download?id=${video_id}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const download_link = document.createElement("a");

      download_link.href = url;
      download_link.download = `${video_id}.mp4`;

      download_link.click();
      download_link.remove();

      set_loading(false);
    } catch (error) {
      set_loading(false);
      alert("Failed to download video");
    }
  };

  useEffect(() => {
    if (video_url.length != 0) {
      set_video_id(get_video_id());
    } else {
      set_video_id("");
    }
  }, [video_url]);

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            YouTube Video Downloader
          </h1>

          <div className="mb-4">
            <label
              htmlFor="video-url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Video URL
            </label>

            <input
              disabled
              type="text"
              id="video-url"
              value={video_url}
              onChange={handle_input_change}
              placeholder="Enter YouTube video URL"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-between mb-4 gap-10">
            <button
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                set_video_url(text);
              }}
              className="bg-purple-600 text-white w-1/2 px-4 py-2 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Paste
            </button>

            <button
              onClick={() => {
                set_video_url("");
              }}
              className="bg-red-600 text-white w-1/2 px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>

          {video_id && (
            <>
              <div className="mb-4">
                <iframe
                  width="100%"
                  height="315"
                  frameborder="0"
                  allowfullscreen
                  src={`https://www.youtube.com/embed/${video_id}`}
                />
              </div>

              <button
                onClick={download}
                disabled={loading}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-100"></div>
                    <span className="ml-2">Downloading...</span>
                  </div>
                ) : (
                  "Download"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
