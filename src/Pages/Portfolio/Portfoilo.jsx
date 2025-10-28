import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./portfolio.module.css";
import { galleryImages } from "../../data";

const categories = ["All", "Bank", "Insurance", "Residency", "Restaurant"];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const normalizedCategory = selectedCategory.toLowerCase();

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (normalizedCategory === "all") return galleryImages;
    return galleryImages.filter(
      (img) =>
        img.category &&
        img.category.toLowerCase().trim() === normalizedCategory
    );
  }, [normalizedCategory]);

  return (
    <div className={styles.galleryWrapper}>
      <h2 className={styles.heading}>Our Gallery</h2>

      {/* Category Filter Buttons */}
      <div className={styles.categoryButtons}>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${styles.categoryButton} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div layout className={styles.galleryGrid}>
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.src + index}
              layout
              className={styles.galleryCard}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05,
              }}
            >
              <div className={styles.imageWrapper}>
                <motion.img
                  src={img.src}
                  alt={img.name || img.category}
                  loading="lazy"
                  className={styles.galleryImage}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className={styles.imageInfo}>
                <p className={styles.imageTitle}>{img.name}</p>
                <span className={styles.imageCategory}>{img.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;
