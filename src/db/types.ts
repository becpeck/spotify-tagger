import type { ColumnType, GeneratedAlways } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string | null;
  session_state: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type Session = {
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type User = {
  id: GeneratedAlways<string>;
  spotifyId: string;
  name: string;
  email: string;
  emailVerified: Timestamp | null;
  /**
   * @kyselyType({ url: string, height: number, width: number })
   */
  images: { url: string; height: number; width: number }[];
  followers: number;
  country: string;
  /**
   * @kyselyType("premium" | "free" | "open")
   */
  product: "premium" | "free" | "open";
  explicitFiltered: boolean;
  explicitLocked: boolean;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
};
