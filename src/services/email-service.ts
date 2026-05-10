import type { Order } from "@/types/order";
import type { PublicUser } from "@/types/user";

export type EmailAddress = {
  name?: string;
  email: string;
};

export type EmailAttachment = {
  filename: string;
  contentType: string;
  content?: string;
  url?: string;
};

export type EmailMessage = {
  to: EmailAddress | EmailAddress[];
  subject: string;
  text?: string;
  html?: string;
  cc?: EmailAddress | EmailAddress[];
  bcc?: EmailAddress | EmailAddress[];
  attachments?: EmailAttachment[];
};

export type EmailSendResult = {
  ok: true;
  messageId: string;
  provider: "mock";
  deliveredAt: string;
};

function toRecipientList(value: EmailAddress | EmailAddress[]) {
  return Array.isArray(value) ? value : [value];
}

function getPrimaryRecipient(value: EmailAddress | EmailAddress[]) {
  return toRecipientList(value)[0];
}

function createMessageId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function sendEmail(message: EmailMessage): Promise<EmailSendResult> {
  const recipient = getPrimaryRecipient(message.to);

  console.info("[email-service]", {
    to: recipient.email,
    subject: message.subject,
  });

  return {
    ok: true,
    messageId: createMessageId(),
    provider: "mock",
    deliveredAt: new Date().toISOString(),
  };
}

export async function sendWelcomeEmail(user: PublicUser) {
  return sendEmail({
    to: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    },
    subject: "Welcome to WOODMART Style Ecommerce",
    text: `Welcome, ${user.firstName}! Your account is ready.`,
  });
}

export async function sendOrderConfirmationEmail(order: Order) {
  return sendEmail({
    to: {
      name: order.customerName,
      email: order.customerEmail,
    },
    subject: `Order confirmation - ${order.orderNumber}`,
    text: `Your order ${order.orderNumber} has been received. Total: ${order.total}.`,
  });
}

export async function sendPasswordResetEmail(user: PublicUser, resetLink: string) {
  return sendEmail({
    to: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    },
    subject: "Reset your password",
    text: `Reset your password here: ${resetLink}`,
  });
}

