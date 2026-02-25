'use client';

import { useState, useEffect, useRef } from 'react';

interface Slide {
  image: string;
  caption: string;
}

interface ImageFooterCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export default function ImageFooterCarousel({
  slides,
  autoPlayInterval = 5000,
}: ImageFooterCarouselProps) {
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
    .image-footer-carousel {
      position: relative;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      background-color: #1a1a1a;
      border-radius: 8px;
      overflow: hidden;
    }

    .image-footer-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
    }

    .footer-carousel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.6s ease-in-out;
    }

    .footer-carousel-image.active {
      opacity: 1;
    }

    .carousel-footer {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      color: white;
      padding: 30px 20px 20px;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .footer-text {
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 0.5px;
      animation: fadeInText 0.6s ease-in-out;
    }

    @keyframes fadeInText {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .footer-carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      display: none;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .footer-carousel-nav:hover {
      background-color: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.6);
    }

    .footer-carousel-nav.prev {
      left: 15px;
    }

    .footer-carousel-nav.next {
      right: 15px;
    }

    @media (max-width: 768px) {
      .footer-carousel-nav {
        display: flex;
      }
    }

    .image-footer-carousel:hover .footer-carousel-nav {
      display: flex;
    }
  `;

  if (slides.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No slides provided</div>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="image-footer-carousel" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className="image-footer-wrapper">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`footer-carousel-image ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
          <button
            className="footer-carousel-nav prev"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            className="footer-carousel-nav next"
            onClick={goToNext}
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>
        <div className="carousel-footer">
          <div className="footer-text">{slides[currentIndex].caption}</div>
        </div>
      </div>
    </>
  );
}
