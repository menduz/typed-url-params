export namespace ParseUrlParams {
  export type ParserError<T extends string> = { error: true } & T

  export type AddUrlSection<State extends string, Memo extends Record<string, any> = {}> = string extends State
    ? ParserError<"AddUrlSection got generic string type">
    : CleanKey<State> extends `${infer Key}/`
    ? AddKeyValue<Memo, Key, string>
    : CleanKey<State> extends `${infer Key}*${infer Rest}`
    ? ParseUrlParams<Rest, AddOptionalKeyValue<Memo, Key, string | string[]>>
    : CleanKey<State> extends `${infer Key}/${infer Rest}`
    ? ParseUrlParams<Rest, AddKeyValue<Memo, Key, string>>
    : CleanKey<State> extends `${infer Key}+${infer Rest}`
    ? ParseUrlParams<Rest, AddKeyValue<Memo, Key, string | string[]>>
    : CleanKey<State> extends `${infer Key}?${infer Rest}`
    ? ParseUrlParams<Rest, AddOptionalKeyValue<Memo, Key, string>>
    : CleanKey<State> extends `${infer Key}.${infer Rest}`
    ? ParseUrlParams<Rest, AddKeyValue<Memo, Key, string>>
    : CleanKey<State> extends `${infer Key}-${infer Rest}`
    ? ParseUrlParams<Rest, AddKeyValue<Memo, Key, string>>
    : CleanKey<State> extends `${infer Key}`
    ? AddKeyValue<Memo, Key, string>
    : ParseUrlParams<`AddUrlSection returned unexpected value for: ${State}`>

  // remove matcher groups
  export type CleanKey<State extends string> = string extends State
    ? ParserError<"CleanKey got generic string type">
    : State extends `${infer Key}(${infer _})${infer Rest}`
    ? `${Key}${Rest}`
    : State

  export type AddKeyValue<Memo extends Record<string, any>, Key extends string, Value extends any> = Memo &
    { [K in Key]: Value }
  export type AddOptionalKeyValue<Memo extends Record<string, any>, Key extends string, Value extends any> = Memo &
    { [K in Key]?: Value }
}

/**
 * Creates object types compliant with https://github.com/pillarjs/path-to-regexp and Express.js
 * @public
 */
export type ParseUrlParams<State extends string, Memo extends Record<string, any> = {}> = string extends State
  ? ParseUrlParams.ParserError<"ParseUrlParams got generic string type">
  : State extends `${infer _}:${infer Rest}`
  ? ParseUrlParams.AddUrlSection<Rest, Memo>
  : Memo
