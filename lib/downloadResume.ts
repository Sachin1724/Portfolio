import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { ResumeDocument } from '@/components/Resume';

export const downloadResume = async () => {
    try {
        // Generate the PDF
        const blob = await pdf(React.createElement(ResumeDocument)).toBlob();

        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sachidananda_Mallick_Resume.pdf';

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
};
