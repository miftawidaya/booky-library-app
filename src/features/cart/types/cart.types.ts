export interface CartItem {
  readonly bookId: number;
  readonly title: string;
  readonly authorId: number | null;
  readonly authorName: string;
  readonly categoryId: number | null;
  readonly categoryName: string;
  readonly coverImage: string | null;
  readonly selected: boolean;
  readonly serverItemId?: number;
}
