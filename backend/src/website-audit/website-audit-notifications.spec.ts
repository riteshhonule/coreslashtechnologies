jest.mock('chrome-launcher', () => ({
  launch: jest.fn(),
  kill: jest.fn(),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { WebsiteAuditService } from './website-audit.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { AuditStatus } from '@prisma/client';

describe('WebsiteAuditService — Sales Notifications & Lead Reliability', () => {
  let service: WebsiteAuditService;
  let prisma: PrismaService;
  let emailService: EmailService;

  const mockRecords: Record<string, any> = {};

  beforeEach(async () => {
    // Reset mock storage
    Object.keys(mockRecords).forEach((k) => delete mockRecords[k]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsiteAuditService,
        {
          provide: PrismaService,
          useValue: {
            websiteAudit: {
              create: jest.fn().mockImplementation(({ data }) => {
                mockRecords[data.auditId] = {
                  id: 1,
                  ...data,
                  status: data.status || AuditStatus.PENDING,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  completedAt: null,
                  reportJson: null,
                };
                return Promise.resolve(mockRecords[data.auditId]);
              }),
              findUnique: jest.fn().mockImplementation(({ where }) => {
                return Promise.resolve(mockRecords[where.auditId] || null);
              }),
              update: jest.fn().mockImplementation(({ where, data }) => {
                if (!mockRecords[where.auditId]) {
                  throw new Error(`Record ${where.auditId} not found`);
                }
                mockRecords[where.auditId] = {
                  ...mockRecords[where.auditId],
                  ...data,
                  updatedAt: new Date(),
                };
                return Promise.resolve(mockRecords[where.auditId]);
              }),
            },
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendSalesAuditLeadNotification: jest.fn().mockResolvedValue({
              success: true,
              messageId: 'mock-notif-msg-001',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WebsiteAuditService>(WebsiteAuditService);
    prisma = module.get<PrismaService>(PrismaService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should trigger sales notification when an audit with an email completes', async () => {
    const auditId = 'audit_comp_email_1';
    mockRecords[auditId] = {
      auditId,
      url: 'https://example.com',
      email: 'lead@example.com',
      status: AuditStatus.COMPLETED,
      overallScore: 84,
      grade: 'A',
      completedAt: new Date(),
      reportJson: {
        categories: { seo: 88, performance: 80 },
      },
    };

    await service.handleSalesLeadNotification(
      mockRecords[auditId],
      mockRecords[auditId].reportJson,
      { score: 84, grade: 'A' },
    );

    expect(emailService.sendSalesAuditLeadNotification).toHaveBeenCalledTimes(1);
    expect(emailService.sendSalesAuditLeadNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        auditId,
        url: 'https://example.com',
        email: 'lead@example.com',
        overallScore: 84,
        grade: 'A',
      }),
    );

    // Verify notification state was recorded in reportJson
    expect(mockRecords[auditId].reportJson.salesNotification).toBeDefined();
    expect(mockRecords[auditId].reportJson.salesNotification.status).toBe('SENT');
    expect(mockRecords[auditId].reportJson.salesNotification.messageId).toBe('mock-notif-msg-001');
  });

  it('should not send notification when email is missing / null', async () => {
    const auditId = 'audit_no_email_1';
    mockRecords[auditId] = {
      auditId,
      url: 'https://anonymous.example.com',
      email: null,
      status: AuditStatus.COMPLETED,
      overallScore: 75,
      grade: 'B',
      completedAt: new Date(),
      reportJson: {},
    };

    await service.handleSalesLeadNotification(
      mockRecords[auditId],
      mockRecords[auditId].reportJson,
      { score: 75, grade: 'B' },
    );

    expect(emailService.sendSalesAuditLeadNotification).not.toHaveBeenCalled();
  });

  it('should prevent duplicate notifications when handler runs multiple times for the same audit', async () => {
    const auditId = 'audit_dedup_test';
    mockRecords[auditId] = {
      auditId,
      url: 'https://dedup.example.com',
      email: 'repeat@dedup.com',
      status: AuditStatus.COMPLETED,
      overallScore: 90,
      grade: 'A',
      completedAt: new Date(),
      reportJson: { categories: {} },
    };

    // First call
    await service.handleSalesLeadNotification(
      mockRecords[auditId],
      mockRecords[auditId].reportJson,
      { score: 90, grade: 'A' },
    );
    expect(emailService.sendSalesAuditLeadNotification).toHaveBeenCalledTimes(1);

    // Second call with same auditId and updated reportJson containing status: SENT
    await service.handleSalesLeadNotification(
      mockRecords[auditId],
      mockRecords[auditId].reportJson,
      { score: 90, grade: 'A' },
    );
    // Should still only have been called once!
    expect(emailService.sendSalesAuditLeadNotification).toHaveBeenCalledTimes(1);
  });

  it('should ensure email failure does not invalidate an otherwise successful audit', async () => {
    jest
      .spyOn(emailService, 'sendSalesAuditLeadNotification')
      .mockResolvedValueOnce({
        success: false,
        error: 'SMTP Gateway Timeout 504',
      });

    const auditId = 'audit_fail_email_1';
    mockRecords[auditId] = {
      auditId,
      url: 'https://resilient.example.com',
      email: 'client@resilient.com',
      status: AuditStatus.COMPLETED,
      overallScore: 78,
      grade: 'B',
      completedAt: new Date(),
      reportJson: {},
    };

    // Calling notification handler should not throw
    await expect(
      service.handleSalesLeadNotification(
        mockRecords[auditId],
        mockRecords[auditId].reportJson,
        { score: 78, grade: 'B' },
      ),
    ).resolves.not.toThrow();

    // Audit status MUST remain COMPLETED
    expect(mockRecords[auditId].status).toBe(AuditStatus.COMPLETED);
    // Notification failure recorded accurately
    expect(mockRecords[auditId].reportJson.salesNotification.status).toBe('FAILED');
    expect(mockRecords[auditId].reportJson.salesNotification.error).toBe('SMTP Gateway Timeout 504');
  });

  it('should never expose lead email or private salesNotification metadata via getAuditStatus', async () => {
    const auditId = 'audit_public_privacy_check';
    mockRecords[auditId] = {
      auditId,
      url: 'https://privatecorp.com',
      email: 'ceo@privatecorp.com',
      status: AuditStatus.COMPLETED,
      overallScore: 95,
      grade: 'A',
      reportJson: {
        seo: { score: 95 },
        salesNotification: {
          status: 'SENT',
          sentAt: '2026-11-10T12:00:00Z',
          recipient: 'sales@coreslash.com',
        },
      },
      errorMessage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: new Date(),
    };

    const publicResponse = await service.getAuditStatus(auditId);

    // Private email MUST NOT be present in public response
    expect((publicResponse as any).email).toBeUndefined();
    // salesNotification metadata MUST NOT be leaked in public report
    expect(publicResponse.report.salesNotification).toBeUndefined();
    // Public audit results remain intact
    expect(publicResponse.report.seo.score).toBe(95);
    expect(publicResponse.overallScore).toBe(95);
  });
});

