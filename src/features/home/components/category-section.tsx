import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../types/home.types';
import { getCategoryIcon } from '../constants/category.constants';

export function CategorySection({
  categories,
}: Readonly<{ categories: Category[] }>) {
  const displayCategories = categories.slice(0, 6);

  return (
    <section className='custom-container mt-10'>
      <div className='grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-6'>
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={`/books?category=${category.id}`}
            className='bg-card shadow-card dark:border-border flex cursor-pointer flex-col items-start justify-center gap-3 rounded-2xl p-2 transition-transform hover:-translate-y-1 hover:shadow-lg md:p-3 dark:border dark:shadow-none'
          >
            <div className='bg-accent flex h-14 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl md:h-16'>
              <Image
                src={getCategoryIcon(category.name)}
                alt={category.name}
                width={52}
                height={52}
                className='size-11 object-contain md:size-13'
                unoptimized
              />
            </div>
            <span className='text-foreground line-clamp-1 w-full text-left text-xs leading-6 font-semibold md:text-base md:leading-7 md:tracking-tight'>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
