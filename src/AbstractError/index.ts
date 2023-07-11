export const ERROR_UNKNOWN = 'UNKNOWN';

export type ErrorMetadata = Record<string, unknown>;

export type ErrorOptions = ErrorMetadata & {
    message?: string;
    code?: string;
    cause?: Error;
};

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

    /**
     * Caused error instance
     */
    public readonly cause: Error;

    constructor(options?: ErrorOptions) {
        const { message = 'Unknown error', code = ERROR_UNKNOWN, cause, ...meta } = options || {};

        super(message);

        this.code = code;
        this.cause = cause;

        Object.setPrototypeOf(this, new.target.prototype);

        // Make name not enumerable
        Object.defineProperty(this, 'name', {
            value: new.target.name,
            enumerable: false
        });

        // Make message enumerable
        Object.defineProperty(this, 'message', {
            value: message,
            enumerable: true
        });

        // Try remove constructor from stack
        if ('captureStackTrace' in Error) {
            Error.captureStackTrace(this, this.constructor);
        }

        AbstractError.captureMetadata(this, meta);

        // Polyfill
        if (cause && !this.stack.includes('cause')) {
            this.stack = `${this.stack}\n  cause: ${cause.stack}`;
        }
    }

    /**
     * Add metadata to .stack property on a target object
     */
    protected static captureMetadata(target: Error, meta: ErrorMetadata): void {
        const entries = Object.entries(meta || {});

        if (entries.length) {
            target.stack = `${target.stack || ''}\n    by ${entries.map(([key, value]) => `${key} = ${JSON.stringify(value)}`).join('\n    by ')}`;
        }
    }

    public toString(): string {
        return this.stack;
    }
}
