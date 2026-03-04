import { HeroSection } from '@/features/home/components/hero-section';
import { CategorySection } from '@/features/home/components/category-section';
import { RecommendationSection } from '@/features/home/components/recommendation-section';
import { PopularAuthorsSection } from '@/features/home/components/popular-authors-section';
import {
  getCategories,
  getPopularAuthors,
  getRecommendedBooks,
} from '@/features/home/api/home.api';

export const metadata = {
  title: 'Booky - Your Digital Library',
  description:
    'Discover inspiring stories & timeless knowledge, ready to borrow anytime.',
};

export default async function Home() {
  const [categories, books, authors] = await Promise.all([
    getCategories().catch(() => []),
    getRecommendedBooks().catch(() => []),
    getPopularAuthors().catch(() => []),
  ]);

  return (
    <div className='flex flex-col pb-10'>
      <HeroSection />
      {categories.length > 0 && <CategorySection categories={categories} />}
      {books.length > 0 && <RecommendationSection books={books} />}
      {authors.length > 0 && <PopularAuthorsSection authors={authors} />}
    </div>
  );
}
