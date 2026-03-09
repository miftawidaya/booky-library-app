import { Category, Book, PopularAuthor } from '../types/home.types';
import { API_URL } from '@/config/env';

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const json = await res.json();
  return json.data.categories;
};

export const getRecommendedBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${API_URL}/books/recommend?by=rating&limit=10`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  const json = await res.json();
  return json.data.books;
};

export const getPopularAuthors = async (): Promise<PopularAuthor[]> => {
  const res = await fetch(`${API_URL}/authors/popular?limit=4`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch popular authors');
  const json = await res.json();
  return json.data.authors;
};
