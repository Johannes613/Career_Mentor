import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

/**
 * @param {File} file
 * @returns {Promise<string>}
 */
export const extractTextFromPDF = async (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n\n'; 
        }
        resolve(fullText.trim());
      } catch (error) {
        reject('Error extracting text from PDF: ' + error.message);
      }
    };

    fileReader.onerror = (error) => {
      reject('Error reading file: ' + error);
    };

    fileReader.readAsArrayBuffer(file);
  });
};