import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useUrlParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getAllParams = (): Record<string, string> => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };

  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const setParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Array.from(params.keys()).forEach((key) => {
      if (!(key in newParams)) {
        params.delete(key);
      }
    });

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const removeParams = (...keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    keys.forEach((key) => params.delete(key));

    router.replace(`${pathname}?${params.toString()}`);
  };

  return { getAllParams, getParam, setParams, removeParams };
};
