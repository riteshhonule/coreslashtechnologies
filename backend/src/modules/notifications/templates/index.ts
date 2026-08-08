import { escapeHtml, renderEmailWrapper } from './template.helper';

export interface ITemplateResult {
  subject: string;
  html: string;
  text: string;
}

export function renderNotificationTemplate(
  templateName: string,
  data: Record<string, any> = {},
): ITemplateResult {
  switch (templateName) {
    case 'auth/login-notification': {
      const subject = 'Security Alert: New Login to Your Account';
      const name = escapeHtml(data.name || 'User');
      const time = escapeHtml(data.loginTime || new Date().toISOString());
      const ip = escapeHtml(data.ipAddress || 'Unknown');
      const userAgent = escapeHtml(data.userAgent || 'Unknown Device');

      const body = `
        <h2 style="margin-top:0;">Hello ${name},</h2>
        <p>A new login was detected on your CoreSlash Technologies account.</p>
        <div style="background:#f1f5f9; padding:16px; border-radius:6px; margin:20px 0;">
          <p style="margin:4px 0;"><strong>Time:</strong> ${time}</p>
          <p style="margin:4px 0;"><strong>IP Address:</strong> ${ip}</p>
          <p style="margin:4px 0;"><strong>Device/Browser:</strong> ${userAgent}</p>
        </div>
        <p>If this was you, no action is needed. If you did not perform this login, please change your password immediately.</p>
      `;

      return {
        subject,
        html: renderEmailWrapper(subject, body),
        text: `Hello ${name},\nNew login detected at ${time} from IP ${ip} (${userAgent}).`,
      };
    }

    case 'auth/password-changed': {
      const subject = 'Your Password Was Changed';
      const name = escapeHtml(data.name || 'User');
      const time = escapeHtml(data.changedAt || new Date().toISOString());

      const body = `
        <h2 style="margin-top:0;">Hello ${name},</h2>
        <p>Your CoreSlash account password was successfully changed on <strong>${time}</strong>.</p>
        <p>If you made this change, you can safely ignore this email.</p>
        <p style="color:#e11d48;">If you did NOT change your password, please contact system administration immediately.</p>
      `;

      return {
        subject,
        html: renderEmailWrapper(subject, body),
        text: `Hello ${name},\nYour password was changed on ${time}. If you did not request this change, contact support immediately.`,
      };
    }

    case 'auth/refresh-token-reuse': {
      const subject = 'CRITICAL SECURITY ALERT: Suspicious Activity Detected';
      const name = escapeHtml(data.name || 'User');
      const time = escapeHtml(data.detectedAt || new Date().toISOString());

      const body = `
        <h2 style="margin-top:0; color:#dc2626;">Security Warning</h2>
        <p>Hello ${name},</p>
        <p>An invalid or revoked session token was used to access your account on <strong>${time}</strong>.</p>
        <div style="background:#fef2f2; border-left:4px solid #ef4444; padding:16px; margin:20px 0;">
          <p style="margin:0; font-weight:bold; color:#991b1b;">For your protection, all active sessions on your account have been revoked.</p>
        </div>
        <p>Please log in again and update your password immediately.</p>
      `;

      return {
        subject,
        html: renderEmailWrapper(subject, body),
        text: `SECURITY WARNING: Revoked session token reuse detected at ${time}. All active sessions have been revoked for your safety.`,
      };
    }

    case 'users/user-created': {
      const subject = 'Welcome to CoreSlash Technologies';
      const name = escapeHtml(data.name || 'User');
      const role = escapeHtml(data.role || 'AUTHOR');

      const body = `
        <h2 style="margin-top:0;">Welcome ${name}!</h2>
        <p>Your CoreSlash CMS user account has been successfully created with the role: <strong>${role}</strong>.</p>
        <p>You may now log in to the CMS dashboard using your email address.</p>
      `;

      return {
        subject,
        html: renderEmailWrapper(subject, body),
        text: `Welcome ${name}! Your CoreSlash account has been created with role ${role}.`,
      };
    }

    case 'system/security-alert': {
      const subject = escapeHtml(data.subject || 'System Security Alert');
      const message = escapeHtml(data.message || 'A system event requiring attention has occurred.');

      const body = `
        <h2 style="margin-top:0;">System Alert</h2>
        <p>${message}</p>
      `;

      return {
        subject,
        html: renderEmailWrapper(subject, body),
        text: `System Alert: ${message}`,
      };
    }

    default: {
      const subject = escapeHtml(data.subject || 'CoreSlash System Notification');
      const body = `<p>${escapeHtml(data.message || 'Notification from CoreSlash Technologies')}</p>`;
      return {
        subject,
        html: renderEmailWrapper(subject, body),
        text: data.message || 'Notification from CoreSlash Technologies',
      };
    }
  }
}
