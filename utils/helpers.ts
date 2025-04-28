// Random helpful reusable functions

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Example: classNames("text-white", isActive && "font-bold")
