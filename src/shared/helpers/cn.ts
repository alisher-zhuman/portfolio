import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// clsx resolves conditional classes; twMerge lets a later Tailwind class win over a conflicting
// earlier one (px-6 over px-4), which plain concatenation leaves to stylesheet order.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
