/// <reference types="vite/client" />

// Omise.js type declarations
interface OmiseCard {
  number?: string;
  name?: string;
  expiration_month?: string | number;
  expiration_year?: string | number;
  security_code?: string;
  city?: string;
  postal_code?: string;
  [key: string]: any;
}

interface OmiseTokenResponse {
  id: string;
  object: string;
  livemode: boolean;
  location: string;
  used: boolean;
  card: {
    object: string;
    id: string;
    livemode: boolean;
    location: string;
    country: string;
    city: string | null;
    postal_code: string | null;
    financing: string;
    bank: string;
    last_digits: string;
    brand: string;
    expiration_month: number;
    expiration_year: number;
    fingerprint: string;
    name: string;
    security_code_check: boolean;
    created: string;
  };
  created: string;
  [key: string]: any;
}

interface OmiseErrorResponse {
  object: string;
  location: string;
  code: string;
  message: string;
  [key: string]: any;
}

interface Omise {
  setPublicKey(publicKey: string): void;
  createToken(
    type: string,
    card: OmiseCard,
    callback: (statusCode: number, response: OmiseTokenResponse | OmiseErrorResponse) => void
  ): void;
}

declare global {
  interface Window {
    Omise?: Omise;
  }
}

export {};
