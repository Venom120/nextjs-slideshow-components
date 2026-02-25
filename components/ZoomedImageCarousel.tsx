'use client';

import { useState, useEffect, useRef } from 'react';

interface ZoomedCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export default function ZoomedImageCarousel({
  images,
  autoPlayInterval = 5000,
}: ZoomedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    .zoomed-carousel-container {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: 12px;
      background-color: #000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .zoomed-carousel-backdrop {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.3;
      filter: blur(20px);
      transform: scale(1.2);
      z-index: 1;
    }

    .zoomed-carousel-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 5;
    }

    .zoomed-image-item {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transform: scale(0.7);
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 2;
    }

    .zoomed-image-item.active {
      opacity: 1;
      transform: scale(1);
      z-index: 10;
    }

    .zoomed-image-item.prev-item {
      opacity: 0.4;
      transform: scale(0.55);
      z-index: 3;
    }

    .zoomed-carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.4);
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: none;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 20;
      backdrop-filter: blur(10px);
    }

    .zoomed-carousel-nav:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
      border-color: rgba(255, 255, 255, 0.7);
      transform: translateY(-50%) scale(1.15);
    }

    .zoomed-carousel-nav.prev {
      left: 20px;
    }

    .zoomed-carousel-nav.next {
      right: 20px;
    }

    @media (max-width: 768px) {
      .zoomed-carousel-nav {
        display: flex;
      }
    }

    .zoomed-carousel-container:hover .zoomed-carousel-nav {
      display: flex;
    }

    .zoomed-indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 20;
    }

    .zoomed-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    .zoomed-indicator.active {
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1.4);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
      .zoomed-indicators {
        display: none;
      }
    }

    .zoom-counter {
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      z-index: 15;
    }
  `;

  if (images.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No images provided</div>;
  }

  const getPrevIndex = () => (currentIndex - 1 + images.length) % images.length;

  return (
    <>
      <style>{styles}</style>
      <div
        className="zoomed-carousel-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Blurred backdrop */}
        <img
          src={images[currentIndex]}
          alt="backdrop"
          className="zoomed-carousel-backdrop"
        />

        {/* Active and background images */}
        <div className="zoomed-carousel-wrapper">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`zoomed-image-item ${
                index === currentIndex ? 'active' : index === getPrevIndex() ? 'prev-item' : ''
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="zoomed-carousel-nav prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className="zoomed-carousel-nav next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          ❯
        </button>

        {/* Indicators */}
        <div className="zoomed-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`zoomed-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="zoom-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </>
  );
}
