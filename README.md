# @salesduck/errors

Extended errors for your app

## Setup

Add to your project

```
yarn add @salesduck/errors
```

## Usage

Just import and create instance

```ts
import { ApplicationError } from '@salesduck/errors';

throw new ApplicationError();
```

Or with parameters

```ts
throw new ApplicationError({
    message: "User with email exists",
    code: 'USER_WITH_EMAIL_EXISTS',
    email: 'some@gmail.com' // Meta information, will be passed to stack trace
});
```

## Safety

Secure shipment to the customer

```ts
res.json(new ApplicationError({ message: 'Some error', code: 'USER_NOT_FOUND' }));
```

user will see this response

```json
{
    "message": "Some error",
    "code": "USER_NOT_FOUND"
}
```

## Logging

The error is easy to log

```ts
const error = new ApplicationError({
    cause: new ApplicationError({
        id: 'users'
    })
});

logger.error(error.toString());
```
In logs you see

```
 ApplicationError: Application Error
          at Object.<anonymous> (.../ApplicationError/spec.ts:35:30)
          at Object.asyncJestTest (.../node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:106:37)
          at .../node_modules/jest-jasmine2/build/queueRunner.js:45:12
          at new Promise (<anonymous>)
          at mapper (.../node_modules/jest-jasmine2/build/queueRunner.js:28:19)
          at .../node_modules/jest-jasmine2/build/queueRunner.js:75:41
          code UNKNOWN
      caused by ApplicationError: Application Error
          at Object.<anonymous> (.../ApplicationError/spec.ts:36:24)
          at Object.asyncJestTest (.../node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:106:37)
          at .../node_modules/jest-jasmine2/build/queueRunner.js:45:12
          at new Promise (<anonymous>)
          at mapper (.../node_modules/jest-jasmine2/build/queueRunner.js:28:19)
          at .../node_modules/jest-jasmine2/build/queueRunner.js:75:41
          by id "users"
          code UNKNOWN
```
