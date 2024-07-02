interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export class AccountEntity {
  public id: string;
  public userId: string;
  public type: string;
  public provider: string;
  public providerAccountId: string;
  public refresh_token?: string;
  public access_token?: string;
  public expires_at?: number;
  public token_type?: string;
  public scope?: string;
  public id_token?: string;
  public session_state?: string;

  constructor(user: Account) {
    const {
      id,
      userId,
      type,
      provider,
      providerAccountId,
      refresh_token,
      access_token,
      expires_at,
      token_type,
      id_token,
      scope,
      session_state,
    } = user;
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.provider = provider;
    this.providerAccountId = providerAccountId;
    this.refresh_token = refresh_token;
    this.access_token = access_token;
    this.expires_at = expires_at;
    this.token_type = token_type;
    this.scope = scope;
    this.id_token = id_token;
    this.session_state = session_state;
  }

  static fromObject(object: { [key: string]: any }) {
    const {
      id,
      userId,
      type,
      provider,
      providerAccountId,
      refresh_token,
      access_token,
      expires_at,
      token_type,
      id_token,
      scope,
      session_state,
    } = object;

    return new AccountEntity({
      id,
      userId,
      type,
      provider,
      providerAccountId,
      refresh_token,
      access_token,
      expires_at,
      token_type,
      id_token,
      scope,
      session_state,
    });
  }
}
