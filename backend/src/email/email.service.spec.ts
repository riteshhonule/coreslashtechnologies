import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EmailService, AuditLeadNotificationData } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'SMTP_HOST') return null; // Default to no SMTP for unit tests
              if (key === 'RESEND_API_KEY') return null;
              if (key === 'SALES_NOTIFICATION_EMAIL') return 'sales@coreslash.com';
              if (key === 'SMTP_FROM') return 'noreply@coreslash.com';
              if (key === 'APP_URL') return 'https://coreslashtechnologies.com';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should skip sending notification when email is missing or empty', async () => {
    const data: AuditLeadNotificationData = {
      auditId: 'audit_123',
      url: 'https://example.com',
      email: '',
      overallScore: 85,
      grade: 'A',
    };

    const result = await service.sendSalesAuditLeadNotification(data);
    expect(result.success).toBe(false);
    expect(result.skipped).toBe(true);
    expect(result.reason).toBe('NO_LEAD_EMAIL');
  });

  it('should format lead subject with hostname and generate HTML body with admin link', async () => {
    const sendMailSpy = jest.spyOn(service, 'sendMail').mockResolvedValue({
      success: true,
      messageId: 'mock-msg-123',
    });

    const data: AuditLeadNotificationData = {
      auditId: 'audit_test_abc',
      url: 'https://myshop.com/store',
      email: 'founder@myshop.com',
      overallScore: 92,
      grade: 'A',
      completedAt: new Date('2026-11-10T10:00:00Z'),
      categoryScores: {
        seo: 95,
        performance: 90,
      },
    };

    const result = await service.sendSalesAuditLeadNotification(data);

    expect(result.success).toBe(true);
    expect(result.messageId).toBe('mock-msg-123');
    expect(sendMailSpy).toHaveBeenCalledTimes(1);

    const callArgs = sendMailSpy.mock.calls[0][0];
    expect(callArgs.to).toBe('sales@coreslash.com');
    expect(callArgs.subject).toBe('New Website Audit Lead — myshop.com');
    expect(callArgs.html).toContain('founder@myshop.com');
    expect(callArgs.html).toContain('92 / 100');
    expect(callArgs.html).toContain('Grade A');
    expect(callArgs.html).toContain('https://coreslashtechnologies.com/admin/dashboard?tab=audit-leads');
    expect(callArgs.text).toContain('founder@myshop.com');
  });

  it('should gracefully handle simulated mode when no email provider is configured', async () => {
    const result = await service.sendMail({
      to: 'sales@coreslash.com',
      subject: 'Test Subject',
      html: '<p>Test</p>',
    });

    expect(result.success).toBe(true);
    expect(result.skipped).toBe(true);
    expect(result.reason).toBe('SIMULATED_NO_PROVIDER_CONFIGURED');
  });

  it('should handle mail dispatch errors gracefully without throwing', async () => {
    // Force transporter simulate error
    (service as any).transporter = {
      sendMail: jest.fn().mockRejectedValue(new Error('SMTP connection timeout')),
    };

    const result = await service.sendMail({
      to: 'sales@coreslash.com',
      subject: 'Test Subject',
      html: '<p>Test</p>',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('SMTP connection timeout');
  });
});

