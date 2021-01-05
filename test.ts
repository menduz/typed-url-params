import { ParseUrlParams } from "./index"
import expect from "expect"
import { match } from "path-to-regexp"

function assert<T extends string = string>(
  path: T,
  test: string,
  r: ParseUrlParams<T> | undefined
): asserts r is ParseUrlParams<T> {
  const res: any = match(path, { decode: decodeURIComponent })(test)

  expect(res.params).toEqual(r)
}

assert("/:asd/b", "/hola/b", { asd: "hola" })
assert("/xxx/:asd/bbb:dsa", "/xxx/a/bbbtest", { asd: "a", dsa: "test" })
assert("/xxx/:a/bbb/:b", "/xxx/a/bbb/test", { a: "a", b: "test" })
assert("/:test*-bar", "/hola-bar", { test: ["hola"] })
assert("/:test*-bar", "/", undefined)
assert("/:test*-bar", "/asd-bar", { test: ["asd"] })
assert("/:test*-bar", "/x/y/z-bar", { test: ["x", "y", "z"] })
// assert("/:test*-bar", "/-bar", undefined)
assert("/:test+-bar", "/a/b-bar", { test: ["a", "b"] })
assert("/:test+-bar", "/:test-bar", { test: [":test"] })
assert("/:test*", "/", {})
assert("/:test+", "/a", { test: ["a"] })
// assert("/:test?-bar", "/-bar", { })
assert("/:test?-bar", "/e-bar", { test: "e" })
assert("/:test?", "/", {})
assert("/:test(\\d+)", "/123", { test: "123" })
assert("/:test(\\d+)", "/aaa", undefined)
assert("/:test(\\d+)+", "/123/123", { test: ["123", "123"] })
assert("/route.:ext(json|xml)?", "/route.json", { ext: "json" })
assert("/route.:ext(json|xml)?", "/route.NOOP", undefined)
assert("/route.:ext(json|xml)", "/route.xml", { ext: "xml" })
assert("/route.:ext(json|xml)+", "/route.xml.json", { ext: ["xml", "json"] })
assert("/route.:ext([a-z]+)*/:asd", "/route.xml/meta", { ext: ["xml"], asd: "meta" })
assert("/route.:ext([a-z]+)*", "/route.asdaksdasdkajsdhkajhsdkj", { ext: ["asdaksdasdkajsdhkajhsdkj"] })
assert("/route.:ext([a-z]+)*", "/route.123", undefined)
assert("/route.:ext([a-z]+)/:asd", "/route.asdaksdasdkajsdhkajhsdkj/meta", {
  ext: "asdaksdasdkajsdhkajhsdkj",
  asd: "meta",
})
assert("/:test(.*)", "/pp", { test: "pp" })
// assert("/route\\(\\\\(\\d+\\\\)\\)", "/route(\\123\\)", {})
assert("/{apple-}?icon-:res(\\d+).png", "/apple-icon-240.png", { res: "240" })
assert("/:foo/:bar", "/x/y", { foo: "x", bar: "y" })
assert("/users/:user_id/:asd+", "/users/1/test/test2", { user_id: "1", asd: ["test", "test2"] })
assert("/flights/:from-:to", "/flights/EZE-SFO", { from: "EZE", to: "SFO" })

function handleRequest<T extends string>(url: T, handler: (req: { params: ParseUrlParams<T> }) => void) {
  // noop
}

handleRequest("/users/:user_id/:asd+", (req) => {
  req.params.asd
})
