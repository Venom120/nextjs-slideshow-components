'use client';

import ImageCarousel from '@/components/ImageCarousel';
import ImageFooterCarousel from '@/components/ImageFooterCarousel';
import ImageHeaderCarousel from '@/components/ImageHeaderCarousel';
import ZoomedImageCarousel from '@/components/ZoomedImageCarousel';
import CreativeCardCarousel from '@/components/CreativeCardCarousel';
import ClientTestimonialCarousel from '@/components/ClientTestimonialCarousel';

// Sample image URLs (using placeholder images from a free service)
const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&q=60',
];

const sampleSlides = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    caption: 'Mountain Sunrise - Beautiful peaks at dawn',
  },
  {
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=450&fit=crop',
    caption: 'Ocean Waves - Nature\'s powerful beauty',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    caption: 'Forest Path - Serenity in nature',
  },
];

const sampleHeaderSlides = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    title: 'Mountain Adventure',
  },
  {
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=450&fit=crop',
    title: 'Ocean Exploration',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
    title: 'Forest Journey',
  },
];

const sampleCards = [
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=320&h=280&fit=crop',
    label: 'Mountains',
    description: 'Majestic peaks',
  },
  {
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=320&h=280&fit=crop',
    label: 'Oceans',
    description: 'Vast waters',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=320&h=280&fit=crop',
    label: 'Forests',
    description: 'Green paradise',
  },
  {
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=320&h=280&fit=crop',
    label: 'Beaches',
    description: 'Sandy shores',
  },
];

const sampleTestimonials = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=340&h=280&fit=crop',
    name: 'John Smith',
    review: 'The experience was really amazing with Lorain. Best service in Jab. Highly recommended for everyone!',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=340&h=280&fit=crop',
    name: 'Sarah Johnson',
    review: 'Outstanding quality and professional service. They exceeded all my expectations. Will definitely use again!',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=340&h=280&fit=crop',
    name: 'Michael Chen',
    review: 'Impressive work from start to finish. The attention to detail was remarkable. Great team to work with!',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=340&h=280&fit=crop',
    name: 'Emily Davis',
    review: 'Professional, reliable, and efficient. They delivered exactly what I needed on time. Fantastic experience!',
    rating: 4,
  },
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=340&h=280&fit=crop',
    name: 'David Wilson',
    review: 'Top-notch service and exceptional quality. Made the entire process smooth and easy. Highly satisfied!',
    rating: 5,
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '40px 20px' }}>
      <main style={{ margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          color: '#1a1a1a'
        }}>
          🎠 Carousel Showcase
        </h1>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '16px', 
          color: '#666', 
          marginBottom: '60px',
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          Six unique carousel/slideshow components with smooth animations, responsive design, 
          and self-contained styling. Hover to pause on desktop, use arrows on mobile!
        </p>

        {/* Carousel 1: Image Only */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#1a1a1a'
            }}>
              1. Image Only Carousel
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px' 
            }}>
              Simple slideshow with just images. One image is visible at a time with smooth fade transitions.
              Hover to see navigation buttons on desktop, or use arrows on mobile.
            </p>
            <ImageCarousel images={sampleImages} autoPlayInterval={4000} />
          </div>
        </section>

        {/* Carousel 2: Image + Footer */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#1a1a1a'
            }}>
              2. Image + Footer Text Carousel
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px' 
            }}>
              Each slide has an image with descriptive text displayed in a dark footer section below.
              Perfect for galleries with captions or photo stories.
            </p>
            <ImageFooterCarousel slides={sampleSlides} autoPlayInterval={5000} />
          </div>
        </section>

        {/* Carousel 3: Image + Header */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#1a1a1a'
            }}>
              3. Image + Header Text Carousel
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px' 
            }}>
              Header section displays the slide title in a beautiful gradient. Great for presentation-style galleries.
            </p>
            <ImageHeaderCarousel slides={sampleHeaderSlides} autoPlayInterval={5000} />
          </div>
        </section>

        {/* Carousel 4: Zoomed Image */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#1a1a1a'
            }}>
              4. Zoomed Image Carousel
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px' 
            }}>
              Active image is zoomed in while background images fade in subtle mode. Creates a dynamic 3D-like effect
              with blurred backdrop. Image counter shows position in sequence.
            </p>
            <ZoomedImageCarousel images={sampleImages} autoPlayInterval={5000} />
          </div>
        </section>

        {/* Carousel 5: Creative Card */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#1a1a1a'
            }}>
              5. Creative 3D Card Carousel
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px' 
            }}>
              Modern 3D card carousel with perspective animation. Cards show labels and descriptions
              with smooth transitions. Click cards to navigate or use arrow buttons. Fully responsive for mobile!
            </p>
            <CreativeCardCarousel cards={sampleCards} autoPlayInterval={6000} />
          </div>
        </section>

        {/* Carousel 6: Client Testimonials */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '15px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '10px',
              color: '#1a1a1a'
            }}>
              6. Client Testimonial Carousel
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginBottom: '20px' 
            }}>
              Professional testimonial showcase with building/architecture images. Features star ratings,
              client names, and reviews. Perfect for displaying customer feedback with elegant styling!
            </p>
            <ClientTestimonialCarousel testimonials={sampleTestimonials} autoPlayInterval={2000} />
          </div>
        </section>

        {/* Footer Info */}
        <section style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            marginBottom: '20px',
            color: '#1a1a1a'
          }}>
            📋 Component Features
          </h2>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            columns: '2',
            columnGap: '40px'
          }}>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Desktop hover stops autoplay</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Mobile arrows for navigation</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Self-contained styling (no global CSS)</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Fully responsive design</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Smooth animations & transitions</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Easy to integrate into any project</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ TypeScript support</li>
            <li style={{ marginBottom: '12px', lineHeight: '1.6' }}>✅ Cross-browser compatible</li>
          </ul>
        </section>

        {/* Usage Instructions */}
        <section style={{ 
          backgroundColor: '#f0f4ff', 
          padding: '30px', 
          borderRadius: '12px',
          border: '1px solid #e0e8ff'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: '#1a1a1a'
          }}>
            🚀 How to Use in Your Project
          </h2>
          <p style={{ marginBottom: '12px', color: '#333' }}>
            Simply import the component you want and pass the required props:
          </p>
          <pre style={{ 
            backgroundColor: '#ffffff',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '13px',
            color: '#333',
            border: '1px solid #e0e8ff'
          }}>
{`import ImageCarousel from '@/components/ImageCarousel';

// For images only
<ImageCarousel images={imageArray} autoPlayInterval={5000} />

// For images with footer text
<ImageFooterCarousel slides={slidesArray} />

// And so on for other components...`}
          </pre>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Each component is self-contained with all styling included. Simply copy the component file 
            to any Next.js project and import it!
          </p>
        </section>
      </main>
    </div>
  );
}
