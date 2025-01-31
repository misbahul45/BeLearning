import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
    search: parseAsString.withDefault(''),
    category: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    tag: parseAsString.withDefault(''),
    orderBy: parseAsString.withDefault(''),
    update: parseAsString.withDefault(''),
    chapterId: parseAsString.withDefault(''),
    article: parseAsString.withDefault(''),
    token: parseAsString.withDefault(''),
    minPrice: parseAsInteger.withDefault(0),
    maxPrice: parseAsInteger.withDefault(0),
  })