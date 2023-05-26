export const ERROR_UNKNOWN = 'UNKNOWN';

export type ApplicationErrorOptions = {
    [key: string]: unknown;
    message?: string;
    code?: string;
    cause?: Error;
};

/**
 * Defines the base functionality for all errors
 *
 * @example
 *
 * new ApplicationError({
 *   message: 'User not found',
 *   code: 'USER_NOT_FOUND',
 *   cause: err
 *   id: 'user uuid' // you can specify more context
 * });
 */
export class ApplicationError extends Error {

    /**
     * Specifies the name of the error
     */
    public readonly name: string;

    /**
     * Uniquely identifies the error
     */
    public readonly code: string;

    /**
     * Defines a set of calls and their context
     */
    public readonly stack: string;

    /**
     * Human friendly error description
     */
    public readonly message: string;

    constructor(options?: ApplicationErrorOptions) {
        const { message = 'Application Error', code = ERROR_UNKNOWN, cause, ...meta } = options || {};

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

        const entries = Object.entries(meta);

        // Append more context to stack
        if (entries.length) {
            this.stack = `${this.stack}\n    by ${entries.map(([key, value]) => `${key} ${JSON.stringify(value)}`).join('\n    by ')}`;
        }

        this.stack = `${this.stack}\n    code ${this.code}`;

        if (cause) {
            this.stack = `${this.stack}\ncaused by ${cause.stack}`;
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
