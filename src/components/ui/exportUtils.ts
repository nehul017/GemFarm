import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Product, PricingData, formatCurrency } from '../utils/utils';


export const exportToPDF = (
    products: Product[], 
    pricingData: PricingData[], 
    month: string,
    monthDisplayName: string
  ): void => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text(`Smart Farming PNL - ${monthDisplayName}`, 14, 20);
    
    // Subtitle
    doc.setFontSize(12);
    doc.text('Pricing Data (per kg)', 14, 30);
    
    // Table data
    const tableData = products.map(product => {
      const pricing = pricingData.find(p => p.productId === product.id && p.month === month);
      return [
        `${product.name} (${product.unit})`,
        pricing ? formatCurrency(pricing.wholesaleDistributor) : '-',
        pricing ? formatCurrency(pricing.wholesaleRetail) : '-',
        pricing ? formatCurrency(pricing.directConsumer) : '-',
      ];
    });
    
    // Create table
    autoTable(doc, {
      head: [['Product', 'Wholesale to Distributors', 'Wholesale to Retail', 'Direct to Consumer']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [47, 133, 90], // Green color
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 248, 240], // Light green for alternate rows
      },
    });
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }
    
    // Save PDF
    doc.save(`smart-farming-pnl-${month}.pdf`);
  };
  
  export const exportToExcel = (
    products: Product[], 
    pricingData: PricingData[],
    month: string,
    monthDisplayName: string
  ): void => {
    // Create worksheet data
    const worksheetData = [
      ['Smart Farming PNL - ' + monthDisplayName],
      ['Pricing Data (per kg)'],
      [''],
      ['Product', 'Wholesale to Distributors', 'Wholesale to Retail', 'Direct to Consumer'],
    ];
    
    // Add product data
    products.forEach(product => {
      const pricing = pricingData.find(p => p.productId === product.id && p.month === month);
      worksheetData.push([
        `${product.name} (${product.unit})`,
        pricing ? String(pricing.wholesaleDistributor) : '-',
        pricing ? String(pricing.wholesaleRetail) : '-',
        pricing ? String(pricing.directConsumer) : '-',
      ]);
    });
    
    // Create workbook
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PNL Data');
    
    // Set column widths
    const colWidths = [
      { wch: 20 }, // Product
      { wch: 25 }, // Wholesale to Distributors
      { wch: 20 }, // Wholesale to Retail
      { wch: 20 }, // Direct to Consumer
    ];
    ws['!cols'] = colWidths;
    
    // Save Excel file
    XLSX.writeFile(wb, `smart-farming-pnl-${month}.xlsx`);
  };