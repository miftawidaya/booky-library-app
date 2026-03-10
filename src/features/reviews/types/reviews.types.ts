export interface Review {
  id: number;
  userId: string;
  bookId: number;
  rating?: number;
  star?: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    photo?: string | null;
  };
  book?: {
    id: number;
    title: string;
    description?: string | null;
    isbn?: string;
    publishedYear?: number | null;
    coverImage?: string | null;
    rating?: number;
    author?: {
      id: number;
      name: string;
    };
    authors?: Array<{
      id: number;
      name: string;
    }>;
    category?: {
      id: number;
      name: string;
    };
  };
}

export interface ReviewsResponse {
  items: Review[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
