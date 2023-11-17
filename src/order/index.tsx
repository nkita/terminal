import type { ReactNode } from 'react';

export const availableOder = [
    "cat",
    "ls",
    "cd",
]

export const getResult = (order: string, setCurrentDir: (path: string) => void) => {

    let result
    if (order) {
        result = availableOder.includes(order) ? <Result /> : `-bash: ${order}: command not found`
    }
    setCurrentDir("/home")

    return result
}

const Result = () => {
    return (
        <div>aaaa </div>
    )
}