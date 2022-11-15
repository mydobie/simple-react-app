/* eslint-disable no-console */
import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ajaxFinally } from '../js/axios.config';

// EXAMPLE: Custom hook
export const useGetVersion = (
  getVersionsConfig: AxiosRequestConfig | null = null
): [{ [key: string]: string }, boolean] => {
  const axiosConfig = getVersionsConfig || {
    url: '/versions.json',
    method: 'get',
  };

  const {
    isLoading,
    error,
    data: version,
  } = useQuery({
    queryKey: [],
    queryFn: () =>
      axios(axiosConfig).then(async (response) => {
        await ajaxFinally();
        return response.data;
      }),
    retry: false,
  });

  React.useEffect(() => {
    if (error) {
      console.log('Error loading versions file: ', error);
    }
  }, [error]);

  return [version, isLoading];
};
