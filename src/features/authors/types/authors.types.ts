import { Book } from '@/features/home/types/home.types';

export interface AuthorDetail {
  id: number;
  name: string;
  bio: string | null;
  photo?: string | null;
}

export interface AuthorBooksResponse {
  success: boolean;
  message: string;
  data: {
    author: AuthorDetail;
    bookCount: number;
    books: Book[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
