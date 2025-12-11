import { useState, useEffect } from "react";
import Testing from "./components/Testing";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [backgroundType, setBackgroundType] = useState<
    "static" | "live" | "solid"
  >("live");
  const [backgroundValue, setBackgroundValue] = useState<string>(
    "https://www.pexels.com/download/video/3051490/"
  );

  const handleBackgroundChange = (type: string, value: string) => {
    setBackgroundType(type as "static" | "live" | "solid");
    setBackgroundValue(value);
  };

  useEffect(() => {
    const body = document.body;

    if (backgroundType === "live") {
      // For live wallpapers, create a video element
      const existingVideo = document.getElementById(
        "background-video"
      ) as HTMLVideoElement;
      if (existingVideo) {
        existingVideo.remove();
      }

      const video = document.createElement("video");
      video.id = "background-video";
      video.src = backgroundValue;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
      `;
      document.body.appendChild(video);
      video.play().catch(() => {
        // Handle autoplay restrictions
      });

      body.style.backgroundImage = "none";
      body.style.backgroundColor = "transparent";
    } else if (backgroundType === "solid") {
      // Remove video if exists
      const existingVideo = document.getElementById(
        "background-video"
      ) as HTMLVideoElement;
      if (existingVideo) {
        existingVideo.remove();
      }

      body.style.backgroundColor = backgroundValue;
      body.style.backgroundImage = "none";
    } else {
      // Static wallpaper
      const existingVideo = document.getElementById(
        "background-video"
      ) as HTMLVideoElement;
      if (existingVideo) {
        existingVideo.remove();
      }

      body.style.backgroundImage = backgroundValue;
      body.style.backgroundColor = "transparent";
    }
  }, [backgroundType, backgroundValue]);

  return (
    <>
      <Navbar onBackgroundChange={handleBackgroundChange} />
      <Testing />
    </>
  );
}

export default App;
