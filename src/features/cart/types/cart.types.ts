export interface CartItem {
  readonly bookId: number;
  readonly title: string;
  readonly authorName: string;
  readonly categoryName: string;
  readonly coverImage: string | null;
  readonly selected: boolean;
}
