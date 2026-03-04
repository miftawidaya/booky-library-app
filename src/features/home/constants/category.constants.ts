export type CategoryIconMap = Record<string, string>;

export const CATEGORY_ICONS: CategoryIconMap = {
  education: '/images/category/education.png',
  fiction: '/images/category/fiction.png',
  finance: '/images/category/finance-business.png',
  'non-fiction': '/images/category/non-fiction.png',
  science: '/images/category/science-technology.png',
  technology: '/images/category/science-technology.png',
  'science-fiction': '/images/category/science-technology.png',
  'self-improvement': '/images/category/self-improvement.png',
  lifestyle: '/images/category/self-improvement.png',
  religious: '/images/category/education.png',
};

export const DEFAULT_CATEGORY_ICON = '/images/category/category-default.png';

/**
 * Utility function to match an API category name to returning a local icon path
 */
export const getCategoryIcon = (categoryName: string): string => {
  const normalizedName = categoryName.toLowerCase().trim();

  // 1. Exact match
  if (CATEGORY_ICONS[normalizedName]) {
    return CATEGORY_ICONS[normalizedName];
  }

  // 2. Partial match fallback (e.g. "Science-Fiction" might match "Science" or "Fiction")
  // We iterate through available keys to see if the category name includes them
  for (const [key, iconPath] of Object.entries(CATEGORY_ICONS)) {
    if (normalizedName.includes(key)) {
      return iconPath;
    }
  }

  // 3. Complete fallback
  return DEFAULT_CATEGORY_ICON;
};
