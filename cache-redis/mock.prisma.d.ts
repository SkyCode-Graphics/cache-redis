export interface _PrismaPromise<T> extends Promise<T> {
  [Symbol.toStringTag]: "PrismaPromise";
}

// declare namespace Symbol {
//   export const toStringTag: unique symbol;
// }

export namespace Utils {
  export type Cast<A, W> = A extends W ? A : W;
  export type LegacyExact<A, W = unknown> = W extends unknown
    ? A extends LegacyNarrowable ? Cast<A, W> : Cast<
      {
        [K in keyof A]: K extends keyof W ? LegacyExact<A[K], W[K]> : never;
      },
      {
        [K in keyof W]: K extends keyof A ? LegacyExact<A[K], W[K]> : W[K];
      }
    >
    : never;

  export type LegacyNarrowable = string | number | boolean | bigint;
}

type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P;
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}`
    ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X
    : UnwrapPromise<Tuple[K]>
    : UnwrapPromise<Tuple[K]>;
};

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more s
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class MockPrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof T
    ? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T["log"]>
    : never
    : never,
> {
  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more s
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | "beforeExit")>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent
        : V extends "beforeExit" ? () => Promise<void>
        : Prisma.LogEvent,
    ) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE  SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM  WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): Promise<UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<
        this,
        "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
      >,
    ) => Promise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<R>;

  "model": Prisma.Delegate;
}

export namespace Prisma {
  export type PrismaPromise<T> = _PrismaPromise<T>;

  /**
   * Prisma Errors
   */
  export {
    _PrismaClientInitializationError,
    _PrismaClientKnownRequestError,
    _PrismaClientRustPanicError,
    _PrismaClientUnknownRequestError,
    _PrismaClientValidationError,
  };

  /**
   * Prisma Client JS version: 4.15.0
   * Query Engine version: b20ead4d3ab9e78ac112966e242ded703f4a052c
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export type JsonObject = { [Key in string]?: JsonValue };
  export interface JsonArray extends Array<JsonValue> {}
  export type JsonValue =
    | string
    | number
    | boolean
    | JsonObject
    | JsonArray
    | null;

  export type InputJsonObject = {
    readonly [Key in string]?: InputJsonValue | null;
  };
  export interface InputJsonArray
    extends ReadonlyArray<InputJsonValue | null> {}
  export type InputJsonValue =
    | string
    | number
    | boolean
    | InputJsonObject
    | InputJsonArray;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends
    PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> =
    PromiseType<ReturnType<T>>;

  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  type SelectSubset<T, U> =
    & {
      [key in keyof T]: key extends keyof U ? T[key] : never;
    }
    & (T extends SelectAndInclude
      ? "Please either choose `select` or `include`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  type SubsetIntersection<T, U, K> =
    & {
      [key in keyof T]: key extends keyof U ? T[key] : never;
    }
    & K;

  type Union = any;

  /** Helper Types for "Merge" **/
  type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void ? I
    : never;

  type Overwrite<O extends object, O1 extends object> =
    & {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
    }
    & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> =
    {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
    }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A
    :
      & {
        [K in keyof A]: A[K];
      }
      & {};

  export type OptionalFlat<O> =
    & {
      [K in keyof O]?: O[K];
    }
    & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 // anything `never` is false
    : A1 extends A2 ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  /**
   * Used by group by
   */

  type GetScalarType<T, O> = O extends object ? {
      [P in keyof T]: P extends keyof O ? O[P]
        : never;
    }
    : never;

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<
    T,
    TupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */

  export const ModelName: {
    [x: string]: string;
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  export type DefaultPrismaClient = MockPrismaClient;
  export type RejectOnNotFound = boolean | ((error: Error) => Error);
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound };
  export type RejectPerOperation = {
    [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound;
  };
  type ErrorFormat = "pretty" | "colorless" | "minimal";

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {: (err) => new Error(" not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>;
  }

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends
    LogDefinition ? T["emit"] extends "event" ? T["level"] : never : never;
  export type GetEvents<T extends any> = T extends
    Array<LogLevel | LogDefinition>
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findMany"
    | "findFirst"
    | "create"
    | "createMany"
    | "update"
    | "updateMany"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
  >;

  export type Datasource = {
    url?: string;
  };

  export const TransactionIsolationLevel: {
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  /**
   * Model
   */

  type Aggregate = {
    _count: CountAggregateOutputType | null;
    _avg: NumAggregateOutputType | null;
    _sum: NumAggregateOutputType | null;
    _min: NumAggregateOutputType | null;
    _max: NumAggregateOutputType | null;
  };

  type NumAggregateOutputType = {
    [x: string]: number | null;
  };

  type CountAggregateOutputType = {
    [x: string]: number;
  };

  type NumAggregateInputType = {
    [x: string]: true;
  };

  type CountAggregateInputType = {
    [x: string]: true;
  };

  type WhereInput = { [x: number]: AnyFilter } & {
    AND?: Enumerable<WhereInput>;
    OR?: Enumerable<WhereInput>;
    NOT?: Enumerable<WhereInput>;
  };

  type OrderBy = Enumerable<{ [x: string]: SortOrder }>;

  type AggregateArgs = {
    /**
     * Filter which  to aggregate.
     */
    where?: WhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of s to fetch.
     */
    orderBy?: OrderBy;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` s from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` s.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned s
     */
    _count?: true | CountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     */
    _avg?: NumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     */
    _sum?: NumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     */
    _min?: NumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     */
    _max?: NumAggregateInputType;
  };

  export type GetAggregateType<T extends AggregateArgs> = {
    [P in keyof T & keyof Aggregate]: P extends "_count" | "count"
      ? T[P] extends true ? number
      : GetScalarType<T[P], Aggregate[P]>
      : GetScalarType<T[P], Aggregate[P]>;
  };

  export type GroupByArgs = {
    where?: WhereInput;
    orderBy?: OrderBy;
    by: ScalarFieldEnum[];
    take?: number;
    skip?: number;
    _count?: CountAggregateInputType | true;
    _avg?: NumAggregateInputType;
    _sum?: NumAggregateInputType;
    _min?: NumAggregateInputType;
    _max?: NumAggregateInputType;
  };

  export type GroupByOutputType = {
    id: number;
    email: string;
    name: string | null;
    _count: CountAggregateOutputType | null;
    _avg: NumAggregateInputType | null;
    _sum: NumAggregateInputType | null;
    _min: NumAggregateInputType | null;
    _max: NumAggregateInputType | null;
  };

  type GetGroupByPayload<T extends GroupByArgs> = Prisma.PrismaPromise<
    Array<
      & PickArray<GroupByOutputType, T["by"]>
      & {
        [P in ((keyof T) & (keyof GroupByOutputType))]: P extends "_count"
          ? T[P] extends boolean ? number
          : GetScalarType<T[P], GroupByOutputType[P]>
          : GetScalarType<T[P], GroupByOutputType[P]>;
      }
    >
  >;

  export type Select = {
    [x: string]: boolean;
  };

  export type Include = {
    [x: string]: Record<string, boolean> | boolean;
  };

  export type GetPayload<S extends boolean | null | undefined | Args> =
    S extends { select: any; include: any }
      ? "Please either choose `select` or `include`"
      : S extends true ? {}
      : S extends undefined ? never
      : S extends { include: any } & (Args | FindManyArgs) ? {}
      : S extends { select: any } & (Args | FindManyArgs) ? {}
      : {};

  type CountArgs = Omit<FindManyArgs, "select" | "include"> & {
    select?: CountAggregateInputType | true;
  };

  export interface Delegate {
    /**
     * Find zero or one  that matches the filter.
     * @param {FindUniqueArgs} args - Arguments to find a
     * @example
     * // Get one
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FindUniqueArgs>(
      args: SelectSubset<T, FindUniqueArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Find one  that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {FindUniqueOrThrowArgs} args - Arguments to find a
     * @example
     * // Get one
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FindUniqueOrThrowArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Find the first  that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindFirstArgs} args - Arguments to find a
     * @example
     * // Get one
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FindFirstArgs>(
      args?: SelectSubset<T, FindFirstArgs>,
    ): Prisma__Client<GetPayload<T> | null>;

    /**
     * Find the first  that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindFirstOrThrowArgs} args - Arguments to find a
     * @example
     * // Get one
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FindFirstOrThrowArgs>(
      args?: SelectSubset<T, FindFirstOrThrowArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Find zero or more s that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all s
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 s
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     */
    findMany(
      args?: FindManyArgs,
    ): Prisma.PrismaPromise<Array<unknown>>;

    /**
     * Create a .
     * @param {CreateArgs} args - Arguments to create a .
     * @example
     * // Create one
     * const  = await prisma.user.create({
     *   data: {
     *     // ... data to create a
     *   }
     * })
     */
    create<T extends CreateArgs>(
      args: SelectSubset<T, CreateArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Delete a .
     * @param {DeleteArgs} args - Arguments to delete one .
     * @example
     * // Delete one
     * const  = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one
     *   }
     * })
     */
    delete<T extends DeleteArgs>(
      args: SelectSubset<T, DeleteArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Update one .
     * @param {UpdateArgs} args - Arguments to update one .
     * @example
     * // Update one
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     */
    update<T extends UpdateArgs>(
      args: SelectSubset<T, UpdateArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Delete zero or more s.
     * @param {DeleteManyArgs} args - Arguments to filter s to delete.
     * @example
     * // Delete a few s
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    deleteMany<T extends DeleteManyArgs>(
      args?: SelectSubset<T, DeleteManyArgs>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many s
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     */
    updateMany<T extends UpdateManyArgs>(
      args: SelectSubset<T, UpdateManyArgs>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one .
     * @param {UpsertArgs} args - Arguments to update or create a .
     * @example
     * // Update or create a
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the  we want to update
     *   }
     * })
     */
    upsert<T extends UpsertArgs>(
      args: SelectSubset<T, UpsertArgs>,
    ): Prisma__Client<GetPayload<T>>;

    /**
     * Count the number of s.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountArgs} args - Arguments to filter s to count.
     * @example
     * // Count the number of s
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the s we want to count
     *   }
     * })
     */
    count<T extends CountArgs>(
      args?: Subset<T, CountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<"select", any> ? T["select"] extends true ? number
        : GetScalarType<T["select"], CountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a .
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     */
    aggregate<T extends AggregateArgs>(
      args: Subset<T, AggregateArgs>,
    ): Prisma.PrismaPromise<GetAggregateType<T>>;

    /**
     * Group by .
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     */
    groupBy<
      T extends GroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake ? { orderBy: OrderBy }
        : { orderBy?: OrderBy },
    >(
      args: SubsetIntersection<T, GroupByArgs, OrderByArg>,
    ): GetGroupByPayload<T> | Prisma.PrismaPromise<Error>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for .
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__Client<T> implements Prisma.PrismaPromise<T> {
    [Symbol.toStringTag]: "PrismaPromise";
    constructor();

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   *  base type for findUnique actions
   */
  type FindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * Filter, which  to fetch.
     */
    where: WhereUniqueInput;
  };

  /**
   *  findUnique
   */
  interface FindUniqueArgs extends FindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   *  findUniqueOrThrow
   */
  type FindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * Filter, which  to fetch.
     */
    where: WhereUniqueInput;
  };

  /**
   *  base type for findFirst actions
   */
  type FindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * Filter, which  to fetch.
     */
    where?: WhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of s to fetch.
     */
    orderBy?: OrderBy;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for s.
     */
    cursor?: WhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` s from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` s.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of s.
     */
    distinct?: Enumerable<ScalarFieldEnum>;
  };

  /**
   *  findFirst
   */
  interface FindFirstArgs extends FindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   *  findFirstOrThrow
   */
  type FindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * Filter, which  to fetch.
     */
    where?: WhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of s to fetch.
     */
    orderBy?: OrderBy;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for s.
     */
    cursor?: WhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` s from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` s.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of s.
     */
    distinct?: Enumerable<ScalarFieldEnum>;
  };

  /**
   *  findMany
   */
  type FindManyArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * Filter, which s to fetch.
     */
    where?: WhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of s to fetch.
     */
    orderBy?: OrderBy;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing s.
     */
    cursor?: WhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` s from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` s.
     */
    skip?: number;
    distinct?: Enumerable<ScalarFieldEnum>;
  };

  /**
   *  create
   */
  type CreateArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * The data needed to create a .
     */
    data: {};
  };

  /**
   *  update
   */
  type UpdateArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * The data needed to update a .
     */
    data: {};
    /**
     * Choose, which  to update.
     */
    where: WhereUniqueInput;
  };

  /**
   *  updateMany
   */
  type UpdateManyArgs = {
    /**
     * The data used to update s.
     */
    data: {};
    /**
     * Filter which s to update
     */
    where?: WhereInput;
  };

  /**
   *  upsert
   */
  type UpsertArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * The filter to search for the  to update in case it exists.
     */
    where: WhereUniqueInput;
    /**
     * In case the  found by the `where` argument doesn't exist, create a new  with this data.
     */
    create: {};
    /**
     * In case the  was found with the provided `where` argument, update it with this data.
     */
    update: {};
  };

  /**
   *  delete
   */
  type DeleteArgs = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
    /**
     * Filter which  to delete.
     */
    where: WhereUniqueInput;
  };

  /**
   *  deleteMany
   */
  type DeleteManyArgs = {
    /**
     * Filter which s to delete
     */
    where?: WhereInput;
  };

  /**
   *  without action
   */
  type Args = {
    /**
     * Select specific fields to fetch from the
     */
    select?: Select | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: Include | null;
  };

  /**
   * Enums
   */

  const ScalarFieldEnum: {
    id: "id";
    email: "email";
    name: "name";
  };

  type ScalarFieldEnum = (typeof ScalarFieldEnum)[keyof typeof ScalarFieldEnum];

  const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  type WhereUniqueInput = {
    [x: string]: unknown;
  };

  type AnyFilter = {
    equals?: unknown;
    in?: Enumerable<unknown> | string;
    notIn?: Enumerable<unknown> | string;
    lt?: unknown;
    lte?: unknown;
    gt?: unknown;
    gte?: unknown;
    contains?: unknown;
    startsWith?: unknown;
    endsWith?: unknown;
    not?: AnyFilter | unknown;
  };

  export type BatchPayload = {
    count: number;
  };
}

declare class _PrismaClientRustPanicError extends Error {
  clientVersion: string;
  constructor(message: string, clientVersion: string);
  get [Symbol.toStringTag](): string;
}

declare class _PrismaClientUnknownRequestError extends Error {
  clientVersion: string;
  constructor();
  get [Symbol.toStringTag](): string;
}

declare class _PrismaClientValidationError extends Error {
  get [Symbol.toStringTag](): string;
}

declare class _PrismaClientInitializationError extends Error {
  clientVersion: string;
  errorCode?: string;
  retryable?: boolean;
  constructor();
  get [Symbol.toStringTag](): string;
}

declare class _PrismaClientKnownRequestError extends Error {
  code: string;
  meta?: Record<string, unknown>;
  clientVersion: string;
  constructor();
  get [Symbol.toStringTag](): string;
}
