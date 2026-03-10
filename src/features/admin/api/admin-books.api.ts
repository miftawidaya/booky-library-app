import type {
  BooksFilterParams,
  BooksResponse,
} from '@/features/books/types/books.types';

export interface AdminBooksFilterParams extends Omit<
  BooksFilterParams,
  'category'
> {
  status?: string;
}

interface ApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly data: BooksResponse;
}

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
} as const;

/**
 * Fetch all books from the admin endpoint via Next.js proxy.
 */
export async function getAdminBooks(
  params: AdminBooksFilterParams = {}
): Promise<BooksResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set('page', String(params.page));
  }
  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }
  if (params.status && params.status !== 'all') {
    searchParams.set('status', params.status.toLowerCase());
  }
  if (params.q) {
    searchParams.set('q', params.q);
  }

  const queryString = searchParams.toString();
  const suffix = queryString ? `?${queryString}` : '';
  const url = `/api/admin/books${suffix}`;

  const response = await fetch(url);
  const json = (await response.json()) as ApiResponse;

  if (response.ok === false) {
    throw new Error(json.message || 'Failed to fetch admin books');
  }

  if (!json.data) {
    return {
      items: [],
      pagination: DEFAULT_PAGINATION,
    };
  }

  const items = (json.data as any).books || json.data.items || [];

  return {
    items: items,
    pagination: json.data.pagination ?? DEFAULT_PAGINATION,
  };
}
