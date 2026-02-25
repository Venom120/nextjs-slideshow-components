'use client';

import { useState, useEffect, useRef } from 'react';

interface Card {
  image: string;
  label: string;
  description?: string;
}

interface CreativeCarouselProps {
  cards: Card[];
  autoPlayInterval?: number;
}

export default function CreativeCardCarousel({
  cards,
  autoPlayInterval = 6000,
}: CreativeCarouselProps) {
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
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      }, autoPlayInterval);
    };

    if (!isHovering && cards.length > 0) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovering, cards.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const getCardPosition = (index: number) => {
    const diff = (index - currentIndex + cards.length) % cards.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === cards.length - 1) return 'left';
    return 'back';
  };

  const styles = `
    .creative-carousel-wrapper {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      perspective: 1000px;
    }

    .creative-carousel-container {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      border-radius: 20px;
      overflow: visible;
    }

    .creative-cards-track {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .creative-card {
      position: absolute;
      width: 320px;
      height: 400px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      cursor: pointer;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }

    .creative-card.center {
      z-index: 30;
      transform: translateX(0) scale(1) rotateY(0deg);
      opacity: 1;
      pointer-events: auto;
    }

    .creative-card.right {
      z-index: 20;
      transform: translateX(150px) scale(0.85) rotateY(-25deg);
      opacity: 0.6;
      pointer-events: none;
    }

    .creative-card.left {
      z-index: 20;
      transform: translateX(-150px) scale(0.85) rotateY(25deg);
      opacity: 0.6;
      pointer-events: none;
    }

    .creative-card.back {
      z-index: 10;
      transform: translateX(0) scale(0.7) rotateY(0deg);
      opacity: 0;
      pointer-events: none;
    }

    .card-image {
      width: 100%;
      height: 70%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .card-content {
      flex: 1;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .card-label {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .card-description {
      font-size: 12px;
      opacity: 0.9;
      line-height: 1.4;
    }

    .creative-nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      display: none;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 40;
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }

    .creative-nav-button:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
    }

    .creative-nav-button.prev {
      left: 20px;
    }

    .creative-nav-button.next {
      right: 20px;
    }

    @media (max-width: 768px) {
      .creative-carousel-container {
        height: 350px;
        padding: 20px;
      }

      .creative-card {
        width: 280px;
        height: 340px;
      }

      .creative-card.right {
        transform: translateX(100px) scale(0.8) rotateY(-20deg);
      }

      .creative-card.left {
        transform: translateX(-100px) scale(0.8) rotateY(20deg);
      }

      .creative-nav-button {
        display: flex;
        width: 40px;
        height: 40px;
        font-size: 16px;
      }

      .creative-nav-button.prev {
        left: 10px;
      }

      .creative-nav-button.next {
        right: 10px;
      }
    }

    .creative-carousel-container:hover .creative-nav-button {
      display: flex;
    }

    .creative-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 35;
    }

    .creative-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(102, 126, 234, 0.4);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .creative-dot.active {
      background-color: #667eea;
      transform: scale(1.3);
      border-color: rgba(102, 126, 234, 0.2);
    }

    @media (max-width: 768px) {
      .creative-dots {
        bottom: 10px;
      }
    }

    .carousel-info {
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: rgba(102, 126, 234, 0.1);
      backdrop-filter: blur(10px);
      color: #667eea;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid rgba(102, 126, 234, 0.3);
      z-index: 35;
    }
  `;

  if (cards.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No cards provided</div>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="creative-carousel-wrapper">
        <div className="creative-carousel-container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="creative-cards-track">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`creative-card ${getCardPosition(index)}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={card.image} alt={card.label} className="card-image" />
                <div className="card-content">
                  <div className="card-label">{card.label}</div>
                  {card.description && <div className="card-description">{card.description}</div>}
                </div>
              </div>
            ))}
          </div>

          <button
            className="creative-nav-button prev"
            onClick={goToPrevious}
            aria-label="Previous card"
          >
            ❮
          </button>
          <button
            className="creative-nav-button next"
            onClick={goToNext}
            aria-label="Next card"
          >
            ❯
          </button>

          <div className="creative-dots">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`creative-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <div className="carousel-info">
            {currentIndex + 1} of {cards.length}
          </div>
        </div>
      </div>
    </>
  );
}
