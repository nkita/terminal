import type { ReactNode } from 'react';

export const availableOder = [
    "cat",
    "ls",
    "cd",
]

export const HOMEDIR = ["home", "nkita"]

export const getResult = (order: string, user: any) => {

    let result
    if (order) {
        result = availableOder.includes(order) ? <Result /> : `-bash: ${order}: command not found`
    }

    
    return result
}

const Result = () => {
    return (
        <div>aaaa </div>
    )
}