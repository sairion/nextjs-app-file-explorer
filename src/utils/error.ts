export const isNodeError = (error: unknown): error is NodeJS.ErrnoException => error instanceof Error
