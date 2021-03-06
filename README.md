# typed-url-params

Types your URL parameters in compliance with Express.js router and https://github.com/pillarjs/path-to-regexp

## Install

```
npm install typed-url-params
```

## Usage

```ts
type Params = ParseUrlParams<"/test"> // { }
type Params = ParseUrlParams<"/:abc"> // { abc: string }
type Params = ParseUrlParams<"/:abc+"> // { abc: string | string[] }
type Params = ParseUrlParams<"/:abc*"> // { abc?: string | string[] }
type Params = ParseUrlParams<"/users/:userId"> // { userId: string }
type Params = ParseUrlParams<"/flights/:from-:to"> // { from: string, to: string }
```

## Usage with Express

This library only offers typings. You must write your own wrapper for Express. You can do it like this:

```typescript
function handleGet<TypedUrl extends string>(
  app: Express.Application,
  url: TypedUrl,
  handler: (req: Express.Request & { params: ParseUrlParams<TypedUrl> }, res: Express.Response, next) => void
) {
  // noop
}
```

## More examples

```ts

import { ParseUrlParams } from "typed-url-params"

function assert<T extends string = string>(r: ParseUrlParams<T>): asserts r is ParseUrlParams<T> {}

assert<"/:asd/b">({ asd: "" })
assert<"/xxx/:asd/bbb:dsa">({ asd: "", dsa: "" })
assert<"/xxx/:asd/bbb/:dsa">({ asd: "", dsa: "" })
assert<"/xxx/:asd/bbb/:dsa">({ asd: "", dsa: "" })
assert<"/:test*-bar">({ test: [] })
assert<"/:test*-bar">({})
assert<"/:test*-bar">({ test: "asd" })
assert<"/:test*-bar">({ test: ["asd"] })
assert<"/:test+-bar">({ test: [""] })
assert<"/:test*">({ test: [] })
assert<"/:test+">({ test: "" })
assert<"/:test+">({ test: [""] })
assert<"/:test?-bar">({ test: "" })
assert<"/:test?">({ test: "" })
assert<"/:test(\\d+)">({ test: "" })
assert<"/:test(\\d+)+">({ test: "" })
assert<"/:test(\\d+)+">({ test: [""] })
assert<"/route.:ext(json|xml)?">({})
assert<"/route.:ext(json|xml)?">({ ext: "" })
assert<"/route.:ext(json|xml)">({ ext: "" })
assert<"/route.:ext(json|xml)+">({ ext: "" })
assert<"/route.:ext(json|xml)+">({ ext: [""] })
assert<"/route.:ext([a-z]+)*/:asd">({ ext: [""], asd: "" })
assert<"/route.:ext([a-z]+)*/:asd">({ asd: "" })
assert<"/route.:ext([a-z]+)*">({ ext: [""] })
assert<"/route.:ext([a-z]+)/:asd">({ ext: "", asd: "" })
assert<"/:test(.*)">({ test: "" })
assert<"/route\\(\\\\(\\d+\\\\)\\)">({})
assert<"/{apple-}?icon-:res(\\d+).png">({ res: "" })
assert<"/:foo/:bar">({ foo: "", bar: "" })
assert<"/users/:user_id/:asd+">({ user_id: "", asd: [] })
assert<"/flights/:from-:to">({ from: "", to: "" })
```