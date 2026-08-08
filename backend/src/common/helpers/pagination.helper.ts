export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPaginatedResult<T> {
  items: T[];
  meta: IPaginationMeta;
}

export function buildPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): IPaginatedResult<T> {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    items,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

/**
 * Validate and sanitize sort fields against an allowlist to prevent arbitrary Prisma order-by injection.
 */
export function sanitizeSort(
  sortBy: string | undefined,
  allowedFields: string[],
  defaultField: string = 'createdAt',
): string {
  if (!sortBy || !allowedFields.includes(sortBy)) {
    return defaultField;
  }
  return sortBy;
}

/**
 * Sanitize and cap search input to prevent expensive unbounded string queries.
 */
export function sanitizeSearch(search: string | undefined, maxLength = 100): string | undefined {
  if (!search) return undefined;
  const trimmed = search.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}
