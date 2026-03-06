export interface BookOption {
  id: number;
  title: string;
  author: { name: string } | null;
  authorName?: string;
  coverImage: string | null;
  rating?: number | null;
  categoryId?: number;
}

export interface CategoryOption {
  id: number;
  name: string;
}

export interface BooksFilterParams {
  category?: string;
  sort?: string;
  q?: string;
  minRating?: string;
  page?: number;
  limit?: number;
}

export interface BooksResponse {
  items: BookOption[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
