import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) { // (...inputs) -> is used to pass the multiple arguments to the function.

    return twMerge(clsx(inputs)) // -> twMerge is used to merge the tailwind classes and clsx is used to create the tailwind classes.
        // clsx is used to create the tailwind classes.
        // twMerge is used to merge the tailwind classes.

}