import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

interface NavbarProps {
  onBackgroundChange: (type: string, value: string) => void;
}

function Navbar({ onBackgroundChange }: NavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const staticWallpapers = [
    { name: "Static 1", value: "url('./assets/bg-1.jpg')" },
    {
      name: "Static 2",
      value:
        "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')",
    },
    {
      name: "Static 3",
      value:
        "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920')",
    },
    {
      name: "Static 4",
      value:
        "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920')",
    },
    {
      name: "Static 5",
      value:
        "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920')",
    },
  ];

  const liveWallpapers = [
    {
      name: "Ocean Waves",
      value: "https://www.pexels.com/download/video/1918465/",
    },
    {
      name: "Forest Nature",
      value: "https://www.pexels.com/download/video/35120885/",
    },
    {
      name: "City Lights",
      value: "https://www.pexels.com/download/video/857267/",
    },
    {
      name: "Mountain Clouds",
      value: "https://www.pexels.com/download/video/35118365/",
    },
    {
      name: "Abstract Flow",
      value: "https://www.pexels.com/download/video/3051490/",
    },
  ];

  const solidColors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
  ];

  const handleOptionClick = (category: string, value: string) => {
    onBackgroundChange(category, value);
    setActiveCategory(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    const isImage = fileType.startsWith("image/");
    const isVideo = fileType.startsWith("video/");

    if (isImage || isVideo) {
      const fileUrl = URL.createObjectURL(file);
      const category = isImage ? "static" : "live";
      const value = isImage ? `url('${fileUrl}')` : fileUrl;
      onBackgroundChange(category, value);
    }

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCustomUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleColorPickerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;
    onBackgroundChange("solid", color);
  };

  const handleColorPickerBlur = () => {
    // Close dropdown when color picker loses focus (user finished selecting)
    setActiveCategory(null);
  };

  const handleColorPickerClick = () => {
    // Trigger the color picker to open first
    setTimeout(() => {
      colorInputRef.current?.click();
      // Close the dropdown menu after opening color picker
      setActiveCategory(null);
    }, 0);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={navRef}>
        {/* Color input moved outside dropdown so it's always available */}
        <input
          ref={colorInputRef}
          type="color"
          style={{ display: "none" }}
          onChange={handleColorPickerChange}
          onBlur={handleColorPickerBlur}
        />
        <div className="nav-item-wrapper">
          <button
            className={`nav-button ${
              activeCategory === "static" ? "active" : ""
            }`}
            onClick={() =>
              setActiveCategory(activeCategory === "static" ? null : "static")
            }
          >
            Static Wallpapers
          </button>
          {activeCategory === "static" && (
            <div className="dropdown-menu">
              {staticWallpapers.map((wallpaper, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick("static", wallpaper.value)}
                >
                  {wallpaper.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-item-wrapper">
          <button
            className={`nav-button ${
              activeCategory === "live" ? "active" : ""
            }`}
            onClick={() =>
              setActiveCategory(activeCategory === "live" ? null : "live")
            }
          >
            Live Wallpapers
          </button>
          {activeCategory === "live" && (
            <div className="dropdown-menu">
              {liveWallpapers.map((wallpaper, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick("live", wallpaper.value)}
                >
                  {wallpaper.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-item-wrapper">
          <button
            className={`nav-button ${
              activeCategory === "solid" ? "active" : ""
            }`}
            onClick={() =>
              setActiveCategory(activeCategory === "solid" ? null : "solid")
            }
          >
            Solid Colors
          </button>
          {activeCategory === "solid" && (
            <div className="dropdown-menu">
              {solidColors.map((color, index) => (
                <button
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick("solid", color.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    className="color-preview"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </button>
              ))}
              <button
                className="dropdown-item"
                onClick={handleColorPickerClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  className="color-preview"
                  style={{
                    backgroundColor: "#ffffff",
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "8px 8px",
                    backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                  }}
                />
                Color Picker
              </button>
            </div>
          )}
        </div>

        <div className="nav-item-wrapper">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <button className="nav-button" onClick={handleCustomUploadClick}>
            Custom Upload
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
