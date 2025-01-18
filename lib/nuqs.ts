import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
    search: parseAsString.withDefault(''),
    category: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    tag: parseAsString.withDefault(''),
    token: parseAsString.withDefault(''),
    article: parseAsString.withDefault(''),
    orderBy: parseAsString.withDefault(''),
    update: parseAsString.withDefault(''),
  })