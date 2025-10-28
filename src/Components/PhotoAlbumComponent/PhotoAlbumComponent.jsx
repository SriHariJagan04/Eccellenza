import React, { useEffect, useMemo, useState } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import styles from "./PhotoAlbumComponent.module.css";

const PhotoAlbumComponent = ({ photos = [] }) => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setTheme(newTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const formattedPhotos = useMemo(
    () =>
      photos
        .filter((p) => p.src)
        .map((p) => ({
          src: p.src,
          alt: p.alt || p.name || "Image",
          width: Number(p.width) || 1200,
          height: Number(p.height) || 800,
        })),
    [photos]
  );

  // Disable scroll + hide navbar on open
  const handleGalleryOpen = () => {
    document.body.style.overflow = "hidden";
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.style.display = "none";
  };

  // Restore scroll + show navbar on close
  const handleGalleryClose = () => {
    document.body.style.overflow = "";
    const navbar = document.querySelector(".navbar");
    if (navbar) navbar.style.display = "";
  };

  return (
    <div
      className={`${styles.albumWrapper} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        elementClassNames={styles.galleryGrid}
        onAfterOpen={handleGalleryOpen}
        onBeforeClose={handleGalleryClose}
      >
        {formattedPhotos.map((photo, i) => (
          <a
            key={i}
            href={photo.src}
            data-lg-size={`${photo.width}-${photo.height}`}
            className={styles.photoCard}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={styles.photoImg}
            />
            <div className={styles.overlay}>
              <span>{photo.alt}</span>
            </div>
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default PhotoAlbumComponent;
