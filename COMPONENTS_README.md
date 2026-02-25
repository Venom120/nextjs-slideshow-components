# 🎠 Carousel Components

A collection of fully responsive, self-contained carousel/slideshow components for Next.js with beautiful animations and smooth interactions.

## 📦 Components Overview

### 1. **ImageCarousel** - Simple Image Slideshow
A clean, minimal carousel that displays one image at a time with fade transitions.

**Props:**
- `images` (string[]): Array of image URLs
- `autoPlayInterval` (number, optional): Auto-play interval in milliseconds (default: 5000)

**Features:**
- Fade transition between images
- Desktop: Dot indicators (click to navigate)
- Mobile: Arrow buttons for navigation
- Auto-play pauses on hover

**Usage:**
```tsx
import ImageCarousel from '@/components/ImageCarousel';

<ImageCarousel 
  images={['url1', 'url2', 'url3']} 
  autoPlayInterval={4000} 
/>
```

---

### 2. **ImageFooterCarousel** - Image with Footer Caption
Displays images with descriptive text in a dark footer section below each image.

**Props:**
- `slides` (Slide[]): Array of objects with `image` and `caption` properties
- `autoPlayInterval` (number, optional): Auto-play interval in milliseconds (default: 5000)

**Features:**
- Animated footer text transitions
- Semi-transparent header overlay
- Clean gradient footer background
- Mobile-friendly arrow navigation

**Usage:**
```tsx
import ImageFooterCarousel from '@/components/ImageFooterCarousel';

<ImageFooterCarousel 
  slides={[
    { image: 'url1', caption: 'Caption 1' },
    { image: 'url2', caption: 'Caption 2' }
  ]}
/>
```

---

### 3. **ImageHeaderCarousel** - Image with Header Title
Features a colorful gradient header displaying the slide title above the image.

**Props:**
- `slides` (Slide[]): Array of objects with `image` and `title` properties
- `autoPlayInterval` (number, optional): Auto-play interval in milliseconds (default: 5000)

**Features:**
- Animated gradient header (purple to pink)
- Smooth title transitions
- Indicator dots with scale animation
- Professional presentation style

**Usage:**
```tsx
import ImageHeaderCarousel from '@/components/ImageHeaderCarousel';

<ImageHeaderCarousel 
  slides={[
    { image: 'url1', title: 'Title 1' },
    { image: 'url2', title: 'Title 2' }
  ]}
/>
```

---

### 4. **ZoomedImageCarousel** - 3D Zoom Effect
Creates a dynamic effect where the active image is zoomed in while background images fade subtly behind with blur.

**Props:**
- `images` (string[]): Array of image URLs
- `autoPlayInterval` (number, optional): Auto-play interval in milliseconds (default: 5000)

**Features:**
- Active image zoomed (scale 1)
- Previous image visible at reduced scale (0.55)
- Blurred backdrop with 3D effect
- Image counter display
- Smooth cubic-bezier transitions

**Usage:**
```tsx
import ZoomedImageCarousel from '@/components/ZoomedImageCarousel';

<ZoomedImageCarousel 
  images={['url1', 'url2', 'url3']} 
  autoPlayInterval={5000}
/>
```

---

### 5. **CreativeCardCarousel** - 3D Card Carousel
A modern, creative carousel with 3D perspective card animations. Cards show images, labels, and descriptions.

**Props:**
- `cards` (Card[]): Array of objects with `image`, `label`, and optional `description`
- `autoPlayInterval` (number, optional): Auto-play interval in milliseconds (default: 6000)

**Card Object:**
```tsx
{
  image: string;
  label: string;
  description?: string;
}
```

**Features:**
- 3D perspective transformations
- Cards rotate and scale smoothly
- Clickable cards for navigation
- Gradient label section (purple gradient)
- Desktop: Auto-hides arrows on hover
- Mobile: Always shows arrows
- Responsive grid on mobile
- Counter showing position in sequence

**Usage:**
```tsx
import CreativeCardCarousel from '@/components/CreativeCardCarousel';

<CreativeCardCarousel 
  cards={[
    { image: 'url1', label: 'Card 1', description: 'Description' },
    { image: 'url2', label: 'Card 2', description: 'Description' }
  ]}
/>
```

---

### 6. **ClientTestimonialCarousel** - Professional Testimonial Showcase
An elegant testimonial carousel designed for displaying customer reviews with professional styling. Features architecture/building images, star ratings, and client feedback.

**Props:**
- `testimonials` (Testimonial[]): Array of objects with `image`, `name`, `review`, and `rating`
- `autoPlayInterval` (number, optional): Auto-play interval in milliseconds (default: 6000)

**Testimonial Object:**
```tsx
{
  image: string;      // URL to client/building image
  name: string;       // Client name
  review: string;     // Testimonial text
  rating: number;     // Star rating (1-5)
}
```

**Features:**
- "What Our Client's Say" centered title
- Multiple visible cards (center + side cards)
- Background cards sit at the bottom of the slider box
- **Dynamic card sizing**:
  - Inactive cards: Portrait 8:9 aspect ratio (image-only)
  - Active card: Square 1:1 image with review panel below
- **Staged animation**:
  - Slide shifts left/right first
  - Then the active card lifts up while the review panel fades in from the bottom
  - On exit, the review panel fades down, then the slide shifts again
- **Smart content display**: Review text, name, and stars only visible on active card
- Grayscale filter on images for professional look
- 5-star rating display with filled/unfilled stars
- White testimonial cards with blue accent bar
- Expandable review text with word wrap and auto-scroll
- Padding between image and review section for better spacing
- Smooth scaling, height, and opacity transitions
- Circular navigation buttons (white with blue border)
- Dot indicators for position tracking
- Fully responsive with mobile optimization
- Light gray background (#e8e8e8)

**Usage:**
```tsx
import ClientTestimonialCarousel from '@/components/ClientTestimonialCarousel';

<ClientTestimonialCarousel 
  testimonials={[
    { 
      image: 'url1', 
      name: 'John Smith', 
      review: 'Great service!', 
      rating: 5 
    },
    { 
      image: 'url2', 
      name: 'Jane Doe', 
      review: 'Highly recommended!', 
      rating: 4 
    }
  ]}
  autoPlayInterval={6000}
/>
```

---

## 🎯 Universal Features

All components share these features:

✅ **Fully Responsive**
- Works on desktop, tablet, and mobile
- Touch-friendly on mobile devices

✅ **Self-Contained Styling**
- All CSS is included within the component file
- No global styles needed
- Can be moved to any Next.js project without modifications

✅ **Desktop Interaction**
- Auto-play slideshow
- Hover pauses the slideshow
- Navigation arrows appear on hover (mobile: always visible)

✅ **Mobile Interaction**
- Arrow buttons for manual navigation
- No hover effects (not applicable on touch devices)
- Full-touch support

✅ **Smooth Animations**
- Easy in-out transitions
- Cubic-bezier easing for natural motion
- Fade effects for image transitions

✅ **TypeScript Support**
- Full TypeScript type definitions
- Props are fully typed

---

## 🚀 Installation & Setup

1. **Copy component files to your project:**
   ```bash
   cp components/*.tsx your-project/components/
   ```

2. **Import the component you want:**
   ```tsx
   import ImageCarousel from '@/components/ImageCarousel';
   ```

3. **Use it in your page/component:**
   ```tsx
   export default function Page() {
     return (
       <ImageCarousel images={imageArray} autoPlayInterval={5000} />
     );
   }
   ```

---

## 💡 Tips & Best Practices

1. **Image URLs**: Use high-quality images optimized for web
2. **Auto-play Interval**: Adjust based on content (typically 3000-6000ms)
3. **Lazy Loading**: Consider using Next.js Image component for better performance
4. **Accessibility**: Components include proper ARIA labels
5. **Responsive Testing**: Test on various screen sizes for optimal experience

---

## 📱 Mobile Behavior

- Arrow buttons are always visible
- Carousels are fully touchable
- No CSS hover states on touch devices
- Optimized touch targets (40px+ minimum)

---

## 🎨 Styling Notes

Each component uses `<style>` tags within the component file containing all necessary CSS.

**No external dependencies needed for styling!**

This approach allows you to:
- Copy any component to another Next.js project
- Move components between projects without configuration
- Avoid CSS conflicts from global styles

---

## 🔄 Auto-play Behavior

All carousels:
- **Desktop**: Auto-play stops when hovering over the carousel
- **Mobile**: Auto-play continues (no hover on touch devices)
- Can be disabled by not providing `autoPlayInterval` or setting it to 0

---

## 📝 Browser Support

- Modern Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (Chrome, Safari iOS)

---

## 🎓 Component Examples

See `app/page.tsx` for complete working examples of all components with sample data.

Run the development server:
```bash
npm run dev
```

Then visit `http://localhost:3000` to see all carousels in action!

---

## 📄 License

Free to use and modify for personal and commercial projects.

---

**Enjoy your carousels! 🎠✨**
