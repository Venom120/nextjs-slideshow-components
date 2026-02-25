'use client';

import { useState, useEffect, useRef } from 'react';

interface Slide {
  image: string;
  title: string;
}

interface ImageHeaderCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export default function ImageHeaderCarousel({
  slides,
  autoPlayInterval = 5000,
}: ImageHeaderCarouselProps) {
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
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
    };

    if (!isHovering && slides.length > 0) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovering, slides.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const styles = `
    .image-header-carousel {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f5f5f5;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header-top-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      text-align: center;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-title {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.5px;
      animation: slideDownTitle 0.5s ease-in-out;
    }

    @keyframes slideDownTitle {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .header-image-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
    }

    .header-carousel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.6s ease-in-out;
    }

    .header-carousel-image.active {
      opacity: 1;
    }

    .header-carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(102, 126, 234, 0.7);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      display: none;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .header-carousel-nav:hover {
      background-color: rgba(102, 126, 234, 1);
      transform: translateY(-50%) scale(1.1);
    }

    .header-carousel-nav.prev {
      left: 15px;
    }

    .header-carousel-nav.next {
      right: 15px;
    }

    @media (max-width: 768px) {
      .header-carousel-nav {
        display: flex;
      }
    }

    .image-header-carousel:hover .header-carousel-nav {
      display: flex;
    }

    .header-indicators {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      background-color: white;
    }

    .header-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ddd;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .header-indicator.active {
      background-color: #667eea;
      transform: scale(1.3);
    }
  `;

  if (slides.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No slides provided</div>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="image-header-carousel" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className="header-top-section">
          <div className="header-title">{slides[currentIndex].title}</div>
        </div>

        <div className="header-image-wrapper">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`header-carousel-image ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
          <button
            className="header-carousel-nav prev"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            className="header-carousel-nav next"
            onClick={goToNext}
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>

        <div className="header-indicators">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`header-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
