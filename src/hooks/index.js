import { useCallback } from 'react';
import { debounce } from '../helpers';

export const useDebounce = (func, delay, depth) => useCallback(debounce(func, delay), depth);
