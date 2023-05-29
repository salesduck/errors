export const ERROR_UNKNOWN = 'UNKNOWN';

export type ErrorOptions = {
    [key: string]: unknown;
    message?: string;
    code?: string;
    cause?: Error;
};

/**
 * Define base logic for every error
 */
export abstract class AbstractError extends Error {

    /**
     * Specifies the name of the error
     */
    public readonly name: string;

    /**
     * Uniquely identifies the error
     */
    public readonly code: string;

    /**
     * Human friendly error description
     */
    public readonly message: string;

    constructor(options?: ErrorOptions) {
        const { message = 'Unknown Error', code = ERROR_UNKNOWN } = options || {};

        super(message);

        this.code = code;

        // Set prototype for stack trace
        Object.setPrototypeOf(this, new.target.prototype);

        // Define name from constructor
        Object.defineProperty(this, 'name', {
            value: new.target.name,
            enumerable: false,
            writable: false,
            configurable: false
        });

        // Try remove constructor from stack
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, this.constructor);
        }

        // Make message enumerable
        Object.defineProperty(this, 'message', {
            value: this.message,
            enumerable: true,
            writable: false,
            configurable: false
        });
    }

    /**
     * Represents error as string value
     */
    public toString(): string {
        return this.stack;
    }
}
