import PDFDocument = require('pdfkit');

export function generateAuditPdf(reportData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Colors
      const darkBg = '#0F172A';
      const textPrimary = '#334155';
      const brandCyan = '#0EA5E9';
      const brandPurple = '#8B5CF6';

      // Header Banner
      doc.rect(0, 0, doc.page.width, 90).fill(darkBg);

      doc.fillColor('#FFFFFF').fontSize(20).font('Helvetica-Bold').text('CORESLASH TECHNOLOGIES', 40, 25);
      doc.fillColor(brandCyan).fontSize(12).font('Helvetica').text('AI WEBSITE AUDIT & PERFORMANCE REPORT', 40, 52);

      doc.fillColor('#94A3B8').fontSize(9).text(`Audit ID: ${reportData.auditId || 'N/A'}`, doc.page.width - 200, 30, { align: 'right' });
      doc.text(`Date: ${new Date(reportData.timestamp || Date.now()).toLocaleDateString()}`, doc.page.width - 200, 48, { align: 'right' });

      doc.y = 110;

      // Summary Card
      doc.rect(40, doc.y, doc.page.width - 80, 75).fillAndStroke('#F8FAFC', '#E2E8F0');
      
      doc.fillColor('#64748B').fontSize(10).font('Helvetica-Bold').text('AUDITED WEBSITE', 55, 122);
      doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text(reportData.url || 'N/A', 55, 137);

      if (reportData.competitorUrl) {
        doc.fillColor('#64748B').fontSize(9).font('Helvetica').text(`VS Competitor: ${reportData.competitorUrl}`, 55, 157);
      }

      // Overall Score Badge
      const scoreX = doc.page.width - 150;
      doc.rect(scoreX, 118, 90, 58).fill(darkBg);
      const displayScore = reportData.overallScore !== null && reportData.overallScore !== undefined ? `${reportData.overallScore}` : 'N/A';
      doc.fillColor('#FFFFFF').fontSize(24).font('Helvetica-Bold').text(displayScore, scoreX, 125, { width: 90, align: 'center' });
      doc.fillColor(brandCyan).fontSize(10).font('Helvetica-Bold').text(`Grade: ${reportData.grade || 'N/A'}`, scoreX, 154, { width: 90, align: 'center' });

      doc.y = 205;

      // Section: Category Breakdown
      doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text('Category Performance Breakdown', 40, doc.y);
      doc.y += 18;

      const categories = [
        { label: 'Performance', score: reportData.categories?.performance },
        { label: 'SEO Optimization', score: reportData.categories?.seo },
        { label: 'Mobile Readiness', score: reportData.categories?.mobile },
        { label: 'UX & CRO', score: reportData.categories?.ux },
        { label: 'Security & Trust', score: reportData.categories?.security },
        { label: 'Accessibility', score: reportData.categories?.accessibility },
        { label: 'AI Readiness', score: reportData.categories?.aiReadiness },
      ];

      let catY = doc.y;
      categories.forEach((cat, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = col === 0 ? 40 : doc.page.width / 2 + 10;
        const y = catY + (row * 32);

        doc.rect(x, y, (doc.page.width - 100) / 2, 26).fillAndStroke('#F1F5F9', '#CBD5E1');
        doc.fillColor('#334155').fontSize(10).font('Helvetica-Bold').text(cat.label, x + 10, y + 8);
        const scoreText = cat.score !== null && cat.score !== undefined ? `${cat.score}/100` : 'N/A';
        const scoreColor = (cat.score ?? 0) >= 80 ? '#16A34A' : (cat.score ?? 0) >= 50 ? '#D97706' : '#DC2626';
        doc.fillColor(cat.score !== null && cat.score !== undefined ? scoreColor : '#64748B')
           .fontSize(11).font('Helvetica-Bold').text(scoreText, x + (doc.page.width - 100) / 2 - 50, y + 7, { width: 45, align: 'right' });
      });

      doc.y = catY + (Math.ceil(categories.length / 2) * 32) + 15;

      // Core Web Vitals
      if (reportData.performance) {
        doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text('Core Web Vitals & Real Performance', 40, doc.y);
        doc.y += 18;

        const perfMobile = reportData.performance?.mobile;
        const metrics = [
          { name: 'First Contentful Paint (FCP)', val: perfMobile?.fcp },
          { name: 'Largest Contentful Paint (LCP)', val: perfMobile?.lcp },
          { name: 'Total Blocking Time (TBT)', val: perfMobile?.tbt },
          { name: 'Cumulative Layout Shift (CLS)', val: perfMobile?.cls },
        ];

        let mY = doc.y;
        metrics.forEach((m, i) => {
          const x = 40 + (i * 125);
          doc.rect(x, mY, 120, 45).fillAndStroke('#FFFFFF', '#E2E8F0');
          doc.fillColor('#64748B').fontSize(8).font('Helvetica').text(m.name, x + 5, mY + 6, { width: 110 });
          doc.fillColor('#0F172A').fontSize(12).font('Helvetica-Bold').text(m.val || 'N/A', x + 5, mY + 26);
        });

        doc.y = mY + 60;
      }

      // Top Priority Fixes
      if (reportData.recommendations && reportData.recommendations.length > 0) {
        doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text('Top Priority Action Items', 40, doc.y);
        doc.y += 18;

        const topFixes = reportData.recommendations.slice(0, 5);
        topFixes.forEach((rec: any, index: number) => {
          if (doc.y > doc.page.height - 80) {
            doc.addPage();
            doc.y = 40;
          }

          doc.rect(40, doc.y, doc.page.width - 80, 45).fillAndStroke('#FFFBEB', '#FCD34D');
          doc.fillColor('#B45309').fontSize(9).font('Helvetica-Bold').text(`[${rec.severity || 'WARNING'}] ${index + 1}. ${rec.title}`, 50, doc.y + 6);
          doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(`Fix: ${rec.fix}`, 50, doc.y + 20, { width: doc.page.width - 100 });

          doc.y += 52;
        });
      }

      // Competitor Comparison (if applicable)
      if (reportData.competitorComparison) {
        if (doc.y > doc.page.height - 140) {
          doc.addPage();
          doc.y = 40;
        }

        doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text('Competitor Benchmarking', 40, doc.y);
        doc.y += 18;

        const comp = reportData.competitorComparison;
        doc.rect(40, doc.y, doc.page.width - 80, 50).fillAndStroke('#F8FAFC', '#CBD5E1');

        doc.fillColor('#334155').fontSize(10).font('Helvetica').text(`Your Overall Score: ${comp.targetScore ?? 'N/A'}`, 55, doc.y + 12);
        doc.text(`Competitor Score: ${comp.competitorScore ?? 'N/A'}`, 55, doc.y + 28);

        const delta = comp.delta;
        const deltaText = delta !== null && delta !== undefined ? (delta >= 0 ? `+${delta} pts ahead` : `${delta} pts behind`) : 'N/A';
        const deltaColor = (delta ?? 0) >= 0 ? '#16A34A' : '#DC2626';

        doc.fillColor(deltaColor).fontSize(14).font('Helvetica-Bold').text(deltaText, doc.page.width - 200, doc.y + 18, { align: 'right' });
        doc.y += 65;
      }

      // Footer
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc.fillColor('#94A3B8').fontSize(8).text(
          'Generated automatically by CoreSlash Technologies AI Website Audit System - https://coreslashtechnologies.com',
          40,
          doc.page.height - 30,
          { align: 'center', width: doc.page.width - 80 }
        );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
