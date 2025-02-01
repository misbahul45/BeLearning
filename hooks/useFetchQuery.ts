import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface Props<T> {
    queryKey: string | (string | number|null )[];
    queryFn: () => Promise<T>;            
}

const useFetchQuery = <T>({ queryKey, queryFn }: Props<T>): UseQueryResult<T, Error> => {
    return useQuery<T, Error>({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        queryFn,
    });
};

export default useFetchQuery;
