'use client';

import { useState, useEffect, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export default function ImageCarousel({
  images,
  autoPlayInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // AutoPlay logic
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
    };

    if (!isHovering && images.length > 0) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovering, images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const styles = `
    .image-carousel-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: 8px;
      background-color: #000;
    }

    .image-carousel-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .carousel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .carousel-image.active {
      opacity: 1;
    }

    .carousel-controls {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .carousel-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .carousel-indicator.active {
      background-color: #fff;
    }

    .carousel-nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      display: none;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
      z-index: 10;
    }

    .carousel-nav-button:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .carousel-nav-button.prev {
      left: 12px;
    }

    .carousel-nav-button.next {
      right: 12px;
    }

    @media (max-width: 768px) {
      .carousel-nav-button {
        display: flex;
      }

      .carousel-controls {
        display: none;
      }
    }

    .image-carousel-container:hover {
      ${!isMobile ? '.carousel-nav-button { display: flex; }' : ''}
    }
  `;

  if (images.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No images provided</div>;
  }

  return (
    <>
      <style>{styles}</style>
      <div
        className="image-carousel-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="image-carousel-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="carousel-nav-button prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className="carousel-nav-button next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          ❯
        </button>

        {/* Indicators for Desktop */}
        <div className="carousel-controls">
          {images.map((_, index) => (
            <div
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
