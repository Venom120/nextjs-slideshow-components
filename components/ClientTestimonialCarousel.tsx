'use client';

import { useState, useEffect, useRef } from 'react';

interface Testimonial {
  image: string;
  name: string;
  review: string;
  rating: number;
}

interface ClientTestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export default function ClientTestimonialCarousel({
  testimonials,
  autoPlayInterval = 6000,
}: ClientTestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [, setIsMobile] = useState(false);
  const [disableTransitions, setDisableTransitions] = useState(false);
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
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, autoPlayInterval);
    };

    if (!isHovering && testimonials.length > 0) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovering, testimonials.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + testimonials.length) % testimonials.length;
      if (prev === 0) {
        setDisableTransitions(true);
        setTimeout(() => setDisableTransitions(false), 0);
      }
      return next;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % testimonials.length;
      if (prev === testimonials.length - 1) {
        setDisableTransitions(true);
        setTimeout(() => setDisableTransitions(false), 0);
      }
      return next;
    });
  };

  const getCardPosition = (index: number) => {
    const diff = (index - currentIndex + testimonials.length) % testimonials.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2 && testimonials.length > 3) return 'far-right';
    if (diff === testimonials.length - 1) return 'left';
    if (diff === testimonials.length - 2 && testimonials.length > 3) return 'far-left';
    return 'back';
  };

  const renderStars = (rating: number) => {
    return (
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const styles = `
    .testimonial-carousel-wrapper {
      width: 100%;
      margin: 0 auto;
      padding: 20px;
    }

    .testimonial-carousel-title {
      text-align: center;
      font-size: 42px;
      font-weight: 600;
      color: #2c4a6e;
      margin-bottom: 40px;
      letter-spacing: -0.5px;
    }

    .testimonial-carousel-container {
      position: relative;
      height: 620px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 20px;
      overflow: hidden;
    }

    .testimonial-cards-track {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .testimonial-card {
      position: absolute;
      bottom: 0;
      width: 340px;
      height: 390px;
      border-radius: 28px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 15px;
    }

    .testimonial-card.no-transition {
      transition: none !important;
    }

    .testimonial-card.center {
      z-index: 30;
      transform: translateX(0) translateY(-24px) scale(1);
      opacity: 1;
      pointer-events: auto;
      height: 570px;
      background: transparent;
    }

    .testimonial-card.right {
      z-index: 20;
      transform: translateX(360px) translateY(0) scale(0.9);
      opacity: 1;
      pointer-events: none;
    }

    .testimonial-card.left {
      z-index: 20;
      transform: translateX(-360px) translateY(0) scale(0.9);
      opacity: 1;
      pointer-events: none;
    }

    .testimonial-card.far-right {
      z-index: 10;
      transform: translateX(580px) translateY(0) scale(0.75);
      opacity: 1;
      pointer-events: none;
    }

    .testimonial-card.far-left {
      z-index: 10;
      transform: translateX(-580px) translateY(0) scale(0.75);
      opacity: 1;
      pointer-events: none;
    }

    .testimonial-card.back {
      z-index: 5;
      transform: translateX(0) translateY(0) scale(0.6);
      opacity: 0;
      pointer-events: none;
    }

    .testimonial-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 28px;
      flex-shrink: 0;
      filter: grayscale(30%);
      transition: height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .testimonial-card.center .testimonial-image {
      height: 340px;
    }

    .testimonial-content {
      flex: 1;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: relative;
      gap: 4px;
      min-height: 0;
      margin-top: 0;
      opacity: 0;
      transform: translateY(20px);
      max-height: 0;
      transition: opacity 0.35s ease, transform 0.35s ease, max-height 0.35s ease;
      transition-delay: 0s;
      pointer-events: none;
      background: white;
      box-shadow: 0 10px 5px rgba(0, 0, 0, 0.05);
    }

    .testimonial-card.center .testimonial-content {
      opacity: 1;
      justify-content: center;
      align-items: center;
      transform: translateY(0);
      max-height: 200px;
      padding: 18px 20px 20px 20px;
      width: 100%;
      border-radius: 28px;
      border: 1px solid #d9d9d9;
      transition-delay: 0.2s;
      pointer-events: auto;
    }

    .testimonial-name {
      font-size: 22px;
      font-weight: 600;
      color: #2c4a6e;
      margin-bottom: 6px;
      margin-top: 10px;
      flex-shrink: 0;
    }

    .testimonial-review {
      font-size: 13px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 5px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      flex: 1;
      overflow-y: auto;
      max-height: 70px;
    }

    .testimonial-stars {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .star {
      font-size: 18px;
      color: #ddd;
    }

    .star.filled {
      color: #ffc107;
    }

    .testimonial-nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      color: #2c4a6e;
      border: 2px solid #2c4a6e;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 40;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      opacity: 0;
    }

    .testimonial-carousel-container:hover .testimonial-nav-button {
      opacity: 1;
    }

    .testimonial-nav-button:hover {
      background: #2c4a6e;
      color: white;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 8px 30px rgba(44, 74, 110, 0.3);
    }

    .testimonial-nav-button.prev {
      left: 40px;
    }

    .testimonial-nav-button.next {
      right: 40px;
    }

    @media (max-width: 1024px) {
      .testimonial-card.right {
        transform: translateX(180px) translateY(0) scale(0.85);
      }

      .testimonial-card.left {
        transform: translateX(-180px) translateY(0) scale(0.85);
      }

      .testimonial-card.far-right,
      .testimonial-card.far-left {
        opacity: 0;
        transform: translateX(0) scale(0.5);
      }
    }

    @media (max-width: 768px) {
      .testimonial-carousel-wrapper {
        padding: 30px 0;
      }

      .testimonial-carousel-title {
        font-size: 32px;
        margin-bottom: 30px;
        padding: 0 20px;
      }

      .testimonial-carousel-container {
        height: 620px;
        padding: 20px 15px;
        align-items: center;
      }

      .testimonial-card {
        width: calc(100% - 30px);
        max-width: none;
        height: auto;
        max-width: 375px;
        border-radius: 20px;
      }

      .testimonial-image {
        object-fit: cover;
        margin: 0 auto;
        top: 50px;
        left: auto;
        right: auto;
        aspect-ratio: 1 / 1;
      }

      .testimonial-card.center .testimonial-image {
        aspect-ratio: 1 / 1;
        border-radius: 28px;
      }

      .testimonial-card.right,
      .testimonial-card.left,
      .testimonial-card.far-right,
      .testimonial-card.far-left {
        display: none;
      }

      .testimonial-nav-button {
        width: 44px;
        height: 44px;
        font-size: 18px;
        opacity: 1;
      }

      .testimonial-nav-button.prev {
        left: 10px;
      }

      .testimonial-nav-button.next {
        right: 10px;
      }

      .testimonial-card.center .testimonial-content {
        width: 100%;
        border-radius: 20px;
      }

      .testimonial-dots {
        bottom: -50px;
      }
    }

    .testimonial-dots {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 35;
    }

    .testimonial-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(44, 74, 110, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .testimonial-dot.active {
      background-color: #2c4a6e;
      transform: scale(1.3);
      border-color: rgba(44, 74, 110, 0.2);
    }

    @media (max-width: 768px) {
      .testimonial-dots {
        bottom: -30px;
      }
    }
  `;

  if (testimonials.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No testimonials provided</div>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="testimonial-carousel-wrapper">
        <h2 className="testimonial-carousel-title">What Our Client's Say</h2>
        <div 
          className="testimonial-carousel-container" 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="testimonial-cards-track">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${getCardPosition(index)} ${disableTransitions ? 'no-transition' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <div className="testimonial-content">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-review">{testimonial.review}</div>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>

          <button
            className="testimonial-nav-button prev"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            ❮
          </button>
          <button
            className="testimonial-nav-button next"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            ❯
          </button>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
