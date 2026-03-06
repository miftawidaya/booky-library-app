export type CategoryIconMap = Record<string, string>;

export const CATEGORY_ICONS: CategoryIconMap = {
  education: '/images/category/education-reference.png',
  fiction: '/images/category/fiction.png',
  finance: '/images/category/finance-business.png',
  'non-fiction': '/images/category/non-fiction.png',
  science: '/images/category/science-technology.png',
  technology: '/images/category/science-technology.png',
  'science-fiction': '/images/category/science-technology.png',
  'self-improvement': '/images/category/self-improvement.png',
  lifestyle: '/images/category/self-improvement.png',
  religious: '/images/category/education-reference.png',
};

export const DEFAULT_CATEGORY_ICON = '/images/category/category-default.png';

/**
 * Utility function to match an API category name to returning a local icon path
 */
export const getCategoryIcon = (categoryName: string): string => {
  const normalizedName = categoryName.toLowerCase().trim();

  if (CATEGORY_ICONS[normalizedName]) {
    return CATEGORY_ICONS[normalizedName];
  }

  for (const [key, iconPath] of Object.entries(CATEGORY_ICONS)) {
    if (normalizedName.includes(key)) {
      return iconPath;
    }
  }

  return DEFAULT_CATEGORY_ICON;
};
