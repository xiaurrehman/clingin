import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');

    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST') || 'localhost',
      port: parseInt(this.configService.get('SMTP_PORT') || '587', 10),
      secure: false, // true for 465, STARTTLS for 587
      requireTLS: true,
      name: 'halodirect.io',
      // Hostinger outbound defaults to IPv6; Google only allowlisted 194.11.154.67
      family: 4,
      // Google SMTP relay trusts the Hostinger IP — omit AUTH when no credentials
      ...(user && pass ? { auth: { user, pass } } : {}),
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const from =
      this.configService.get('MAIL_FROM') ||
      this.configService.get('SMTP_USER') ||
      'info@halodirect.io';
    await this.transporter.sendMail({ from, to, subject, html });
  }

  async sendActivationCode(email: string, code: string): Promise<void> {
    const subject = 'Activate Your Account';
    const html = `
      <h2>Welcome!</h2>
      <p>Please activate your account by clicking the link below:</p>
      <p><a href="${this.getActivationLink(code)}">Activate Account</a></p>
      <p>Or enter this code manually: <strong>${code}</strong></p>
    `;
    await this.sendMail(email, subject, html);
  }

  async sendPasswordResetCode(email: string, code: string): Promise<void> {
    const subject = 'Reset Your Password';
    const html = `
      <h2>Password Reset Request</h2>
      <p>Use the code below to reset your password:</p>
      <h3>${code}</h3>
      <p>This code expires in 1 hour.</p>
    `;
    await this.sendMail(email, subject, html);
  }

  async sendAccountActivatedNotification(email: string): Promise<void> {
    const frontendUrl = this.getFrontendUrl();
    const subject = 'Account Activated';
    const html = `
      <h2>Your Account Has Been Activated</h2>
      <p>Your account has been successfully activated by an administrator.</p>
      <p>You can now log in to your account.</p>
      <p><a href="${frontendUrl}/signin">Log in to your account</a></p>
    `;
    await this.sendMail(email, subject, html);
  }

  async sendAdminNewAccountApplicationNotification(
    adminEmail: string,
    details: {
      applicantName: string;
      applicantEmail: string;
      phone?: string;
      companyName?: string;
      customerType?: string;
      userId: number;
      applicationId?: number;
    },
  ): Promise<void> {
    const frontendUrl = this.getFrontendUrl();

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const typeLabel =
      details.customerType === 'wholesale'
        ? 'Wholesale customer'
        : details.customerType === 'clinic'
          ? 'Doctor / pharmacy / dentist'
          : details.customerType || 'N/A';

    const company = details.companyName?.trim() || 'N/A';
    const reviewUrl = details.applicationId
      ? `${frontendUrl}/admin/account-applications?id=${details.applicationId}`
      : `${frontendUrl}/admin/account-applications`;

    const subject = `New account application — ${details.companyName || details.applicantEmail}`;
    const submittedAt = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F4F5F9;font-family:Arial,Helvetica,sans-serif;color:#1A1A3F;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5F9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E6E8F0;">
          <tr>
            <td style="background:#1A1A3F;padding:28px 32px;">
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#A8A9D9;font-weight:700;">Halo Direct Admin</p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">New account application</h1>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#D0D1F0;">A customer has submitted an account opening request and is awaiting your review.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3D4160;">
                Please review the application details below and approve or reject it from the admin applications list.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F9FC;border:1px solid #E6E8F0;border-radius:12px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 14px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#706FE4;font-weight:700;">Applicant details</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;color:#1A1A3F;">
                      <tr>
                        <td style="padding:8px 0;width:140px;color:#6B7088;vertical-align:top;">Company</td>
                        <td style="padding:8px 0;font-weight:700;">${escapeHtml(company)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#6B7088;vertical-align:top;">Account type</td>
                        <td style="padding:8px 0;font-weight:600;">${escapeHtml(typeLabel)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#6B7088;vertical-align:top;">Applicant</td>
                        <td style="padding:8px 0;font-weight:600;">${escapeHtml(details.applicantName || 'N/A')}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#6B7088;vertical-align:top;">Email</td>
                        <td style="padding:8px 0;">
                          <a href="mailto:${escapeHtml(details.applicantEmail)}" style="color:#706FE4;text-decoration:none;font-weight:600;">${escapeHtml(details.applicantEmail)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#6B7088;vertical-align:top;">Phone</td>
                        <td style="padding:8px 0;">${escapeHtml(details.phone || 'N/A')}</td>
                      </tr>
                      ${
                        details.applicationId
                          ? `<tr>
                        <td style="padding:8px 0;color:#6B7088;vertical-align:top;">Application ID</td>
                        <td style="padding:8px 0;font-weight:600;">#${details.applicationId}</td>
                      </tr>`
                          : ''
                      }
                      <tr>
                        <td style="padding:8px 0;color:#6B7088;vertical-align:top;">Submitted</td>
                        <td style="padding:8px 0;">${escapeHtml(submittedAt)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;" align="center">
              <a href="${reviewUrl}" style="display:inline-block;background:#706FE4;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 28px;border-radius:999px;">
                Review application
              </a>
              <p style="margin:16px 0 0;font-size:12px;line-height:1.5;color:#8A8FA8;">
                Or open the applications list:<br />
                <a href="${frontendUrl}/admin/account-applications" style="color:#706FE4;word-break:break-all;">${frontendUrl}/admin/account-applications</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#F8F9FC;border-top:1px solid #E6E8F0;padding:18px 32px;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#8A8FA8;text-align:center;">
                This is an automated notification from Halo Direct. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await this.sendMail(adminEmail, subject, html);
  }

  async sendAccountRejectedNotification(
    email: string,
    reason: string,
  ): Promise<void> {
    const subject = 'Your Halo Direct account application was rejected';
    const safeReason = reason
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\n/g, '<br />');
    const frontendUrl = this.getFrontendUrl();
    const html = `
      <h2>Your Account Application Was Rejected</h2>
      <p>Unfortunately, your Halo Direct account opening application was not approved.</p>
      <p><strong>Reason for rejection:</strong></p>
      <p style="padding:12px 16px;background:#f8f8fb;border-left:3px solid #d8503b;border-radius:4px;">
        ${safeReason}
      </p>
      <p>You may submit a new application by signing up again with the same email address.</p>
      <p><a href="${frontendUrl}/signup">Submit a new application</a></p>
      <p>If you need further information, please contact support.</p>
    `;
    await this.sendMail(email, subject, html);
  }

  async sendAdminOrderNotification(
    adminEmail: string,
    orderDetails: {
      id: number;
      customerFirstName: string;
      customerLastName: string;
      customerEmail: string;
      total: string;
      currency: string;
      status: string;
      createdAt: Date;
      itemCount: number;
    }
  ): Promise<void> {
    const subject = `New Order Placed - Order #${orderDetails.id}`;
    const html = `
      <h2>New Order Notification</h2>
      <p>A new order has been placed on your store.</p>

      <h3>Order Details:</h3>
      <p><strong>Order ID:</strong> #${orderDetails.id}</p>
      <p><strong>Customer:</strong> ${orderDetails.customerFirstName} ${orderDetails.customerLastName}</p>
      <p><strong>Customer Email:</strong> ${orderDetails.customerEmail}</p>
      <p><strong>Order Date:</strong> ${orderDetails.createdAt.toISOString()}</p>
      <p><strong>Status:</strong> ${orderDetails.status}</p>
      <p><strong>Total Amount:</strong> ${orderDetails.currency} ${Number(orderDetails.total).toFixed(2)}</p>
      <p><strong>Items Count:</strong> ${orderDetails.itemCount}</p>

      <p>Please process this order as soon as possible.</p>
    `;
    await this.sendMail(adminEmail, subject, html);
  }

  private getFrontendUrl(): string {
    return (
      this.configService.get<string>('USER_FRONTEND_URL') ||
      process.env.FRONTEND_URL ||
      'https://halodirect.io'
    ).replace(/\/$/, '');
  }

  private getActivationLink(code: string): string {
    return `${this.getFrontendUrl()}/activate?code=${code}`;
  }
}