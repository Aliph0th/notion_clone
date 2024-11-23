import { createContext } from 'react';
import { ErrorContextType } from '../types';

export const ErrorContext = createContext<ErrorContextType | null>(null);
