export type Address = {
  id: number;
  userId?: number | null;
  label: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddressFormValues = {
  label: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

export type AddressInput = {
  label: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

export type OrderAddress = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
};
