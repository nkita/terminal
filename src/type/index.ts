import type { ReactNode } from 'react';

export type History = { dir: string; command: string | null; result: ReactNode }
export type Histories = History[]
export type Order = { order: string }
