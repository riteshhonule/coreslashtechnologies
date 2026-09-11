import PDFDocument = require('pdfkit');

export function generateAuditPdf(reportData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: 'A4',
        bufferPages: true,
      });
      const buffers: Buffer[] = [];

      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Colors
      const darkBg = '#0F172A';
      const brandCyan = '#0EA5E9';

      // Function to render header banner on current page
      const renderHeader = () => {
        doc.rect(0, 0, doc.page.width, 85).fill(darkBg);
        doc.rect(0, 85, doc.page.width, 3).fill(brandCyan);

        doc.fillColor('#FFFFFF').fontSize(18).font('Helvetica-Bold').text('CORESLASH TECHNOLOGIES', 40, 22);
        doc.fillColor(brandCyan).fontSize(10).font('Helvetica-Bold').text('AI WEBSITE AUDIT & PERFORMANCE REPORT', 40, 48);

        doc.fillColor('#94A3B8').fontSize(8.5).font('Helvetica').text(`Audit ID: ${reportData.auditId || 'N/A'}`, doc.page.width - 200, 26, { width: 160, align: 'right' });
        doc.text(`Date: ${new Date(reportData.timestamp || Date.now()).toLocaleDateString()}`, doc.page.width - 200, 42, { width: 160, align: 'right' });
      };

      // Initial Header
      renderHeader();
      doc.y = 105;

      // Helper for clean page break
      const checkPageBreak = (neededHeight: number) => {
        if (doc.y + neededHeight > doc.page.height - 60) {
          doc.addPage();
          renderHeader();
          doc.y = 105;
          return true;
        }
        return false;
      };

      // Summary Card
      doc.rect(40, doc.y, doc.page.width - 80, 75).fillAndStroke('#F8FAFC', '#E2E8F0');
      
      doc.fillColor('#64748B').fontSize(9).font('Helvetica-Bold').text('AUDITED WEBSITE', 55, doc.y + 14);
      doc.fillColor('#0F172A').fontSize(13).font('Helvetica-Bold').text(reportData.url || 'N/A', 55, doc.y + 28, { width: doc.page.width - 220 });

      if (reportData.competitorUrl) {
        doc.fillColor('#64748B').fontSize(8.5).font('Helvetica').text(`VS Competitor: ${reportData.competitorUrl}`, 55, doc.y + 48, { width: doc.page.width - 220 });
      }

      // Overall Score Badge
      const scoreX = doc.page.width - 145;
      const scoreY = doc.y + 10;
      doc.rect(scoreX, scoreY, 90, 55).fill(darkBg);
      const displayScore = reportData.overallScore !== null && reportData.overallScore !== undefined ? `${reportData.overallScore}` : 'N/A';
      doc.fillColor('#FFFFFF').fontSize(22).font('Helvetica-Bold').text(displayScore, scoreX, scoreY + 8, { width: 90, align: 'center' });
      doc.fillColor(brandCyan).fontSize(9.5).font('Helvetica-Bold').text(`Grade: ${reportData.grade || 'N/A'}`, scoreX, scoreY + 34, { width: 90, align: 'center' });

      doc.y += 90;

      // Section: Category Breakdown
      checkPageBreak(160);
      doc.fillColor('#0F172A').fontSize(13).font('Helvetica-Bold').text('Category Performance Breakdown', 40, doc.y);
      doc.y += 16;

      const categories = [
        { label: 'Performance', score: reportData.categories?.performance },
        { label: 'SEO Optimization', score: reportData.categories?.seo },
        { label: 'Mobile Readiness', score: reportData.categories?.mobile },
        { label: 'UX & CRO', score: reportData.categories?.ux },
        { label: 'Security & Trust', score: reportData.categories?.security },
        { label: 'Accessibility', score: reportData.categories?.accessibility },
        { label: 'AI Readiness', score: reportData.categories?.aiReadiness },
      ];

      const catY = doc.y;
      categories.forEach((cat, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const cardWidth = (doc.page.width - 95) / 2;
        const x = col === 0 ? 40 : 45 + cardWidth;
        const y = catY + (row * 30);

        doc.rect(x, y, cardWidth, 24).fillAndStroke('#F1F5F9', '#CBD5E1');
        doc.fillColor('#334155').fontSize(9).font('Helvetica-Bold').text(cat.label, x + 8, y + 7);
        const scoreText = cat.score !== null && cat.score !== undefined ? `${cat.score}/100` : 'N/A';
        const scoreColor = (cat.score ?? 0) >= 80 ? '#16A34A' : (cat.score ?? 0) >= 50 ? '#D97706' : '#DC2626';
        doc.fillColor(cat.score !== null && cat.score !== undefined ? scoreColor : '#64748B')
           .fontSize(10).font('Helvetica-Bold').text(scoreText, x + cardWidth - 55, y + 6, { width: 48, align: 'right' });
      });

      doc.y = catY + (Math.ceil(categories.length / 2) * 30) + 15;

      // Core Web Vitals
      if (reportData.performance) {
        checkPageBreak(170);
        doc.fillColor('#0F172A').fontSize(12.5).font('Helvetica-Bold').text('Core Web Vitals & Real Performance (CDP Browser)', 40, doc.y);
        doc.y += 14;

        const perfMobile = reportData.performance?.mobile;
        const perfDesktop = reportData.performance?.desktop;

        const renderPerfRow = (title: string, data: any) => {
          if (!data) return;
          const scoreDisplay = data.score !== null && data.score !== undefined ? `${data.score}/100` : 'Unavailable';
          doc.fillColor('#334155').fontSize(9).font('Helvetica-Bold').text(`${title} (Score: ${scoreDisplay})`, 40, doc.y);
          doc.y += 10;

          const metrics = [
            { name: 'FCP', val: data.fcp },
            { name: 'LCP', val: data.lcp },
            { name: 'TBT (Load)', val: data.tbt },
            { name: 'CLS', val: data.cls },
            { name: 'TTFB', val: data.ttfb },
            { name: 'Load Event', val: data.loadEvent },
          ];

          const mY = doc.y;
          const metricWidth = (doc.page.width - 80 - 25) / 6;
          metrics.forEach((m, i) => {
            const x = 40 + (i * (metricWidth + 5));
            doc.rect(x, mY, metricWidth, 34).fillAndStroke('#FFFFFF', '#CBD5E1');
            doc.fillColor('#64748B').fontSize(7).font('Helvetica').text(m.name, x + 3, mY + 4, { width: metricWidth - 6 });
            doc.fillColor('#0F172A').fontSize(9.5).font('Helvetica-Bold').text(m.val || 'N/A', x + 3, mY + 17, { width: metricWidth - 6 });
          });

          doc.y = mY + 40;
        };

        renderPerfRow('Mobile Strategy (Emulated)', perfMobile);
        renderPerfRow('Desktop Strategy', perfDesktop);
        doc.y += 5;
      }

      // Top Priority Fixes (Strict Card Alignment & Layout)
      if (reportData.recommendations && reportData.recommendations.length > 0) {
        checkPageBreak(120);
        doc.fillColor('#0F172A').fontSize(13).font('Helvetica-Bold').text('Top Priority Action Items', 40, doc.y);
        doc.y += 16;

        const topFixes = reportData.recommendations.slice(0, 5);
        topFixes.forEach((rec: any, index: number) => {
          const cardWidth = doc.page.width - 80;
          const textWidth = cardWidth - 24;

          // Compute exact required height for description text
          const titleLine = `[${rec.severity || 'WARNING'}] ${index + 1}. ${rec.title}`;
          const fixLine = `Recommended Fix: ${rec.fix}`;

          doc.font('Helvetica-Bold').fontSize(9);
          const titleHeight = doc.heightOfString(titleLine, { width: textWidth });

          doc.font('Helvetica').fontSize(8.5);
          const fixHeight = doc.heightOfString(fixLine, { width: textWidth });

          const totalCardHeight = titleHeight + fixHeight + 18;

          checkPageBreak(totalCardHeight + 10);

          const cardY = doc.y;
          doc.rect(40, cardY, cardWidth, totalCardHeight).fillAndStroke('#FFFBEB', '#FCD34D');

          // Render Title
          doc.fillColor('#B45309').fontSize(9).font('Helvetica-Bold').text(titleLine, 52, cardY + 8, { width: textWidth });

          // Render Recommended Fix
          doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(fixLine, 52, cardY + 10 + titleHeight, { width: textWidth });

          doc.y = cardY + totalCardHeight + 8;
        });
      }

      // Competitor Comparison (if applicable)
      if (reportData.competitorComparison) {
        checkPageBreak(80);
        doc.fillColor('#0F172A').fontSize(13).font('Helvetica-Bold').text('Competitor Benchmarking', 40, doc.y);
        doc.y += 14;

        const comp = reportData.competitorComparison;
        const compY = doc.y;
        doc.rect(40, compY, doc.page.width - 80, 48).fillAndStroke('#F8FAFC', '#CBD5E1');

        doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(`Your Overall Score: ${comp.targetScore ?? 'N/A'}`, 55, compY + 10);
        doc.text(`Competitor Score: ${comp.competitorScore ?? 'N/A'}`, 55, compY + 26);

        const delta = comp.delta;
        const deltaText = delta !== null && delta !== undefined ? (delta >= 0 ? `+${delta} pts ahead` : `${delta} pts behind`) : 'N/A';
        const deltaColor = (delta ?? 0) >= 0 ? '#16A34A' : '#DC2626';

        doc.fillColor(deltaColor).fontSize(13).font('Helvetica-Bold').text(deltaText, doc.page.width - 200, compY + 16, { width: 145, align: 'right' });
        doc.y = compY + 58;
      }


      // Global Header/Footer & Watermark Application Across All Pages
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);

        // Watermark (Subtle Diagonal Text)
        doc.save();
        doc.rotate(-30, { origin: [doc.page.width / 2, doc.page.height / 2] });
        doc.fillColor('#0F172A');
        doc.fillOpacity(0.03);
        doc.fontSize(70);
        doc.font('Helvetica-Bold');
        doc.text('CORESLASH', 0, doc.page.height / 2 - 35, {
          width: doc.page.width,
          align: 'center',
        });
        doc.restore();

        // Footer Line & Info
        const footerY = doc.page.height - 35;
        doc.rect(40, footerY - 8, doc.page.width - 80, 0.5).fill('#CBD5E1');

        doc.fillColor('#64748B').fontSize(7.5).font('Helvetica').text(
          'CoreSlash Technologies Pvt. Ltd. • https://coreslashtechnologies.com • Automated AI Website Audit Report',
          40,
          footerY,
          { width: doc.page.width - 160 }
        );

        doc.fillColor('#64748B').fontSize(7.5).font('Helvetica-Bold').text(
          `Page ${i + 1} of ${pageCount}`,
          doc.page.width - 120,
          footerY,
          { width: 80, align: 'right' }
        );
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
