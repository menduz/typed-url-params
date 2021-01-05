
import { ParseUrlParams } from "./index"

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

function handleRequest<T extends string>(url: T, handler: (req: { params: ParseUrlParams<T> }) => void) {
  // noop
}

handleRequest("/users/:user_id/:asd+", (req) => {
  req.params.asd
})
