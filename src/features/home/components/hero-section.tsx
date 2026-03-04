'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const IMAGES = [
  '/images/hero-image-1.jpg',
  '/images/hero-image-2.jpg',
  '/images/hero-image-3.jpg',
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className='custom-container mt-6 md:mt-10'>
      <div
        className='bg-muted relative w-full overflow-hidden rounded-xl md:rounded-2xl'
        style={{ aspectRatio: '1200/441' }}
      >
        <div className='h-full w-full overflow-hidden' ref={emblaRef}>
          <div className='flex h-full w-full'>
            {IMAGES.map((src, index) => (
              <div
                key={src}
                className='relative h-full w-full min-w-0 flex-none'
              >
                <Image
                  src={src}
                  alt={`Hero banner ${index + 1}`}
                  fill
                  className='object-cover'
                  priority={index === 0}
                  sizes='(max-width: 768px) 100vw, 1200px'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className='mt-6 flex justify-center gap-2'>
        {IMAGES.map((src, index) => (
          <button
            key={src}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'size-2.5 cursor-pointer rounded-full transition-colors',
              index === selectedIndex
                ? 'bg-primary'
                : 'bg-primary-200 hover:bg-primary/50'
            )}
          />
        ))}
      </div>
    </section>
  );
}
