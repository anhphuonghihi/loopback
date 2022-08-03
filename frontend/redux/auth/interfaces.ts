export interface ErrorResponse {
  [x: string]: ToastContent<unknown>;
  error: []
}

export interface SignUpInput {
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface Viewer {
  id: string;
  email: string;
}
