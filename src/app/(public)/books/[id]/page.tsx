import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@iconify/react';
import { getBookById, getBooks } from '@/features/books/api/books.api';
import { ReviewList } from '@/features/reviews/components/review-list';
import { BookCard } from '@/components/shared/book-card';
import { BookActionButtons } from '@/features/cart/components/book-action-buttons';
import { Book } from '@/features/home/types/home.types';

export default async function BookDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  let book: Book;
  try {
    book = await getBookById(id);
  } catch {
    notFound();
  }

  // Fetch Recommendations safely
  const recommendationsRes = await getBooks({
    category: book.categoryId?.toString() || '',
    limit: 5,
  }).catch(() => ({
    items: [],
    pagination: { total: 0, page: 1, limit: 5, totalPages: 1 },
  }));

  const reviews = book.reviews || [];
  const recommendations = (recommendationsRes.items || []) as Book[];

  return (
    <div className='bg-background flex flex-col pb-24 md:pb-12'>
      {/* Breadcrumb Navigation */}
      <div className='custom-container pt-8 md:pt-10'>
        <nav className='flex items-center gap-1'>
          <Link
            href='/'
            className='text-primary text-sm font-semibold hover:underline'
          >
            Home
          </Link>
          <Icon
            icon='ri:arrow-right-s-line'
            className='text-foreground size-4'
          />
          <Link
            href={
              book.categoryId ? `/books?category=${book.categoryId}` : '/books'
            }
            className='text-primary text-sm font-semibold hover:underline'
          >
            {book.category?.name || 'Uncategorized'}
          </Link>
          <Icon
            icon='ri:arrow-right-s-line'
            className='text-foreground size-4'
          />
          <span className='text-foreground line-clamp-1 text-sm font-semibold'>
            {book.title}
          </span>
        </nav>
      </div>

      <div className='custom-container mt-6 flex flex-col gap-8 md:mt-10 md:flex-row md:items-start md:gap-14'>
        {/* Left Section - Cover Image with Gray Frame */}
        <div className='bg-secondary mx-auto flex h-fit w-fit shrink-0 items-center justify-center p-2'>
          <div className='relative h-fit w-60 overflow-hidden md:w-80'>
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                width={320}
                height={480}
                unoptimized
                className='h-auto max-h-80 w-full object-contain md:max-h-none'
                priority={true}
                fetchPriority='high'
              />
            ) : (
              <div className='flex aspect-2/3 w-full flex-col items-center justify-center gap-3 bg-neutral-100 text-neutral-400 dark:bg-neutral-900'>
                <Icon icon='ri:book-2-line' className='size-16 opacity-50' />
                <span className='font-medium'>No Cover</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Book Details */}
        <div className='flex flex-1 flex-col justify-start md:px-0'>
          {/* Metadata Badges */}
          <div className='mb-3 flex items-center'>
            <span className='border-border text-foreground rounded-full border px-3 py-1 text-sm font-semibold'>
              {book.category?.name || 'Uncategorized'}
            </span>
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='text-display-sm md:text-display-lg text-foreground leading-tight font-extrabold'>
              {book.title}
            </h1>
            <p className='text-muted-foreground text-lg font-medium'>
              {book.author?.name || book.authorName || 'Unknown Author'}
            </p>
            <div className='mt-1 flex items-center gap-1.5'>
              <Icon icon='ri:star-fill' className='text-rating size-5' />
              <span className='text-foreground text-lg font-bold'>
                {book.rating || '0.0'}
              </span>
            </div>
          </div>

          <div className='my-6 flex items-center gap-5 md:my-8'>
            <div className='flex grow flex-col md:w-25.5 md:grow-0'>
              <span className='md:text-display-xs text-foreground text-lg font-bold tracking-[-0.03em] md:tracking-normal'>
                {book.publishedYear || 320}
              </span>
              <span className='md:text-md text-foreground text-sm font-medium tracking-[-0.03em]'>
                Page
              </span>
            </div>
            <div className='bg-border h-15 w-px md:h-16.5' />
            <div className='flex grow flex-col md:w-25.5 md:grow-0'>
              <span className='md:text-display-xs text-foreground text-lg font-bold tracking-[-0.03em] md:tracking-normal'>
                {book.rating || '0.0'}
              </span>
              <span className='md:text-md text-foreground text-sm font-medium tracking-[-0.03em]'>
                Rating
              </span>
            </div>
            <div className='bg-border h-15 w-px md:h-16.5' />
            <div className='flex grow flex-col md:w-25.5 md:grow-0'>
              <span className='md:text-display-xs text-foreground text-lg font-bold tracking-[-0.03em] md:tracking-normal'>
                {book.reviewCount || 0}
              </span>
              <span className='md:text-md text-foreground text-sm font-medium tracking-[-0.03em]'>
                Reviews
              </span>
            </div>
          </div>

          {/* Book Synopsis/Description */}
          <div className='flex flex-col gap-3'>
            <h3 className='text-foreground text-xl font-bold'>Description</h3>
            <div className='prose prose-neutral dark:prose-invert prose-p:leading-relaxed max-w-none'>
              <p className='text-foreground'>
                {book.description || 'No description available for this book.'}
              </p>
            </div>
          </div>

          {/* Action Buttons (Client Component) */}
          <BookActionButtons
            bookId={book.id}
            title={book.title}
            availableCopies={book.availableCopies || 0}
          />
        </div>
      </div>

      <div className='custom-container'>
        <hr className='border-border my-6 border-t md:my-16' />
      </div>

      {/* Reviews Section */}
      <section id='reviews' className='custom-container flex flex-col gap-8'>
        {/* Section Header */}
        <div className='flex flex-col gap-2 md:gap-3'>
          <h2 className='text-display-xs md:text-display-lg text-foreground font-extrabold'>
            Review
          </h2>
          <div className='flex items-center gap-1'>
            <Icon
              icon='ri:star-fill'
              className='text-rating size-4.5 md:size-6'
            />
            <span className='text-md text-foreground font-extrabold md:text-xl'>
              {book.rating || '0.0'} ({book.reviewCount || 0} Reviews)
            </span>
          </div>
        </div>

        {/* Review List */}
        {reviews.length > 0 ? (
          <ReviewList
            bookId={book.id}
            initialReviews={reviews}
            totalReviews={book.reviewCount || reviews.length}
          />
        ) : (
          <div className='border-border bg-muted/20 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-10'>
            <Icon
              icon='ri:chat-smile-2-line'
              className='text-muted-foreground size-10 opacity-50'
            />
            <p className='text-muted-foreground font-medium'>No reviews yet.</p>
          </div>
        )}
      </section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <>
          <div className='custom-container'>
            <hr className='border-border my-6 border-t md:my-16' />
          </div>
          <section className='custom-container'>
            <h2 className='text-display-xs md:text-display-sm text-foreground mb-6 font-extrabold'>
              Related Books
            </h2>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
              {recommendations.slice(0, 5).map((rec) => (
                <BookCard key={rec.id} book={rec} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
