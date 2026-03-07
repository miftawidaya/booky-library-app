export interface Review {
  id: number;
  userId: string;
  bookId: number;
  rating?: number;
  star?: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    photo?: string | null;
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
