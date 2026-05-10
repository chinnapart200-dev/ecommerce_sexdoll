import type { AddressFormValues } from "@/types/address";
import type { CheckoutFormValues } from "@/types/order";
import type { LoginFormValues, ProfileFormValues, RegisterFormValues } from "@/types/user";

type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhoneNumber(value: string) {
  return /^[0-9+\-\s()]{7,20}$/.test(value);
}

function required(value: unknown, label: string) {
  const normalized = normalize(value);
  return normalized ? null : `${label} is required.`;
}

function minLength(value: unknown, label: string, length: number) {
  const normalized = normalize(value);
  return normalized.length >= length ? null : `${label} must be at least ${length} characters.`;
}

function validateEmail(value: unknown, label = "Email") {
  const normalized = normalize(value);
  if (!normalized) return `${label} is required.`;
  if (!isEmail(normalized)) return `${label} is invalid.`;
  return null;
}

function validatePhone(value: unknown, label = "Phone") {
  const normalized = normalize(value);
  if (!normalized) return `${label} is required.`;
  if (!isPhoneNumber(normalized)) return `${label} is invalid.`;
  return null;
}

function buildResult(errors: Record<string, string>): ValidationResult {
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLogin(values: Partial<LoginFormValues>): ValidationResult {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = required(values.password, "Password");
  if (passwordError) errors.password = passwordError;

  return buildResult(errors);
}

export function validateRegister(values: Partial<RegisterFormValues>): ValidationResult {
  const errors: Record<string, string> = {};

  const firstNameError = required(values.firstName, "First name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = required(values.lastName, "Last name");
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = minLength(values.password, "Password", 8);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = required(values.confirmPassword, "Confirm password");
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  } else if (normalize(values.password) !== normalize(values.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (values.phone) {
    const phoneError = validatePhone(values.phone, "Phone");
    if (phoneError) errors.phone = phoneError;
  }

  return buildResult(errors);
}

export function validateProfile(values: Partial<ProfileFormValues>): ValidationResult {
  const errors: Record<string, string> = {};

  const firstNameError = required(values.firstName, "First name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = required(values.lastName, "Last name");
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  if (values.phone) {
    const phoneError = validatePhone(values.phone, "Phone");
    if (phoneError) errors.phone = phoneError;
  }

  return buildResult(errors);
}

export function validateAddress(values: Partial<AddressFormValues>): ValidationResult {
  const errors: Record<string, string> = {};

  const requiredFields: Array<[unknown, string, string]> = [
    [values.label, "label", "Label"],
    [values.firstName, "firstName", "First name"],
    [values.lastName, "lastName", "Last name"],
    [values.phone, "phone", "Phone"],
    [values.addressLine1, "addressLine1", "Address line 1"],
    [values.city, "city", "City"],
    [values.postalCode, "postalCode", "Postal code"],
    [values.country, "country", "Country"],
  ];

  for (const [value, key, label] of requiredFields) {
    const error = required(value, label);
    if (error) errors[key] = error;
  }

  if (values.email) {
    const emailError = validateEmail(values.email, "Email");
    if (emailError) errors.email = emailError;
  }

  const phoneError = validatePhone(values.phone, "Phone");
  if (phoneError) errors.phone = phoneError;

  return buildResult(errors);
}

export function validateCheckout(values: Partial<CheckoutFormValues>): ValidationResult {
  const errors: Record<string, string> = {};

  const customerNameError = required(values.customerName, "Customer name");
  if (customerNameError) errors.customerName = customerNameError;

  const customerEmailError = validateEmail(values.customerEmail, "Customer email");
  if (customerEmailError) errors.customerEmail = customerEmailError;

  const customerPhoneError = validatePhone(values.customerPhone, "Customer phone");
  if (customerPhoneError) errors.customerPhone = customerPhoneError;

  const shippingAddress = values.shippingAddress;
  if (!shippingAddress) {
    errors.shippingAddress = "Shipping address is required.";
  } else {
    const addressResult = validateAddress({
      label: "Shipping address",
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
      email: shippingAddress.email,
      phone: shippingAddress.phone,
      addressLine1: shippingAddress.addressLine1,
      addressLine2: shippingAddress.addressLine2 ?? undefined,
      city: shippingAddress.city,
      state: shippingAddress.state ?? undefined,
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country,
      isDefault: false,
    });

    for (const [key, value] of Object.entries(addressResult.errors)) {
      errors[`shippingAddress.${key}`] = value;
    }
  }

  if (!values.paymentMethod) {
    errors.paymentMethod = "Payment method is required.";
  }

  return buildResult(errors);
}

