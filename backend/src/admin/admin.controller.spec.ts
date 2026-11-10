import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminAuthService } from './admin-auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

describe('AdminController — Lead Management', () => {
  let controller: AdminController;
  let prisma: PrismaService;

  const mockWebsiteAudits = [
    {
      id: 101,
      auditId: 'audit_aaa111',
      url: 'https://alpha.example.com',
      competitorUrl: null,
      email: 'lead1@alpha.com',
      status: 'COMPLETED',
      overallScore: 88,
      grade: 'A',
      errorMessage: null,
      createdAt: new Date('2026-11-01T10:00:00Z'),
      completedAt: new Date('2026-11-01T10:02:00Z'),
      reportJson: {
        categories: { seo: 90, performance: 85 },
        salesNotification: {
          status: 'SENT',
          sentAt: '2026-11-01T10:02:05Z',
          messageId: 'msg-1',
        },
      },
    },
    {
      id: 102,
      auditId: 'audit_bbb222',
      url: 'https://beta.example.com',
      competitorUrl: 'https://comp.example.com',
      email: 'founder@beta.com',
      status: 'FAILED',
      overallScore: null,
      grade: null,
      errorMessage: 'Network timeout during navigation',
      createdAt: new Date('2026-11-05T14:00:00Z'),
      completedAt: null,
      reportJson: null,
    },
    {
      id: 103,
      auditId: 'audit_ccc333',
      url: 'https://gamma.example.com',
      competitorUrl: null,
      email: 'cto@gamma.com',
      status: 'PENDING',
      overallScore: null,
      grade: null,
      errorMessage: null,
      createdAt: new Date('2026-11-08T09:00:00Z'),
      completedAt: null,
      reportJson: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminAuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValue({ sub: 1, email: 'admin@coreslash.com' }),
          },
        },
        JwtAuthGuard,
        {
          provide: PrismaService,
          useValue: {
            jobApplication: {
              count: jest.fn().mockResolvedValue(10),
              findMany: jest.fn().mockResolvedValue([]),
            },
            projectEnquiry: {
              count: jest.fn().mockResolvedValue(5),
              findMany: jest.fn().mockResolvedValue([]),
            },
            partnershipEnquiry: {
              count: jest.fn().mockResolvedValue(3),
              findMany: jest.fn().mockResolvedValue([]),
            },
            websiteAudit: {
              count: jest.fn().mockImplementation((args) => {
                if (!args?.where) return Promise.resolve(mockWebsiteAudits.length);
                let filtered = [...mockWebsiteAudits];
                if (args.where.status) {
                  filtered = filtered.filter((a) => a.status === args.where.status);
                }
                if (args.where.email) {
                  filtered = filtered.filter((a) => a.email !== null && a.email !== '');
                }
                return Promise.resolve(filtered.length);
              }),
              findMany: jest.fn().mockImplementation((args) => {
                let filtered = [...mockWebsiteAudits];
                if (args?.where?.status) {
                  filtered = filtered.filter((a) => a.status === args.where.status);
                }
                if (args?.where?.OR) {
                  const term = args.where.OR[0]?.email?.contains?.toLowerCase();
                  if (term) {
                    filtered = filtered.filter(
                      (a) =>
                        a.email?.toLowerCase().includes(term) ||
                        a.url?.toLowerCase().includes(term) ||
                        a.auditId?.toLowerCase().includes(term),
                    );
                  }
                }
                const skip = args?.skip || 0;
                const take = args?.take || 10;
                return Promise.resolve(filtered.slice(skip, skip + take));
              }),
              findUnique: jest.fn().mockImplementation((args) => {
                const found = mockWebsiteAudits.find(
                  (a) => a.id === args.where.id || a.auditId === args.where.auditId,
                );
                return Promise.resolve(found || null);
              }),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Admin Authorization Guard', () => {
    it('should have JwtAuthGuard applied on audit-leads and stats endpoints', () => {
      const getAuditLeadsGuards = Reflect.getMetadata('__guards__', controller.getAuditLeads);
      const getAuditLeadDetailGuards = Reflect.getMetadata('__guards__', controller.getAuditLeadDetail);
      const getStatsGuards = Reflect.getMetadata('__guards__', controller.getStats);

      expect(getAuditLeadsGuards).toBeDefined();
      expect(getAuditLeadsGuards[0]).toBe(JwtAuthGuard);

      expect(getAuditLeadDetailGuards).toBeDefined();
      expect(getAuditLeadDetailGuards[0]).toBe(JwtAuthGuard);

      expect(getStatsGuards).toBeDefined();
      expect(getStatsGuards[0]).toBe(JwtAuthGuard);
    });
  });

  describe('getStats', () => {
    it('should include audit lead metrics in stats response', async () => {
      const stats = await controller.getStats();

      expect(stats).toHaveProperty('totalAuditLeads');
      expect(stats).toHaveProperty('completedAuditLeads');
      expect(stats).toHaveProperty('failedAuditLeads');
      expect(stats).toHaveProperty('totalAudits');

      expect(stats.totalAuditLeads).toBe(3);
      expect(stats.completedAuditLeads).toBe(1);
      expect(stats.failedAuditLeads).toBe(1);
    });
  });

  describe('getAuditLeads — Listing and Pagination', () => {
    it('should list leads with pagination and extracted notification status', async () => {
      const res = await controller.getAuditLeads('1', '2', '', '', '', '', 'true');

      expect(res.page).toBe(1);
      expect(res.items.length).toBe(2);
      expect(res.total).toBe(3);
      expect(res.totalPages).toBe(2);

      const firstLead = res.items[0];
      expect(firstLead.auditId).toBe('audit_aaa111');
      expect(firstLead.email).toBe('lead1@alpha.com');
      expect(firstLead.notificationStatus).toBe('SENT');
      expect(firstLead.notificationSentAt).toBe('2026-11-01T10:02:05Z');
      expect(firstLead.overallScore).toBe(88);
      expect(firstLead.grade).toBe('A');

      // Crucial: ensure heavy full report tree is not returned in listing items
      expect((firstLead as any).reportJson).toBeUndefined();
    });

    it('should filter leads by search term matching email or url', async () => {
      const res = await controller.getAuditLeads('1', '10', 'founder@beta.com', '', '', '', 'true');

      expect(res.items.length).toBe(1);
      expect(res.items[0].email).toBe('founder@beta.com');
      expect(res.items[0].auditId).toBe('audit_bbb222');
    });

    it('should filter leads by status', async () => {
      const res = await controller.getAuditLeads('1', '10', '', 'COMPLETED', '', '', 'true');

      expect(res.items.length).toBe(1);
      expect(res.items[0].status).toBe('COMPLETED');
    });
  });

  describe('getAuditLeadDetail', () => {
    it('should return complete lead details by numeric id or auditId', async () => {
      const detail = await controller.getAuditLeadDetail('audit_aaa111');

      expect(detail.auditId).toBe('audit_aaa111');
      expect(detail.email).toBe('lead1@alpha.com');
      expect(detail.overallScore).toBe(88);
      expect(detail.grade).toBe('A');
      expect(detail.notificationStatus).toBe('SENT');
      expect(detail.categories).toEqual({ seo: 90, performance: 85 });
      expect(detail.reportSummary).toBeDefined();
    });

    it('should throw NotFoundException for non-existent lead', async () => {
      await expect(controller.getAuditLeadDetail('audit_nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
