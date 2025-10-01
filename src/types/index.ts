export interface RouteContext {
  params: {
    id: string;
  };
}

export interface UserPayload {
  id: string;
  email: string;
  name?: string;
}
