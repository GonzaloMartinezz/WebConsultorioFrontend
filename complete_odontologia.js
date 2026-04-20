import fs from 'fs';

const filePath = './src/pages/OdontologiaDigital.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

const startMarker = '<section className="bg-[#0e0e0e] rounded-2xl overflow-hidden border border-[#584235]/20">';
const endMarker = '</main>';

const newContent = fs.readFileSync('ui_components.txt', 'utf-8');

const startIdx = content.indexOf(startMarker);
const endIdx = content.lastIndexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
    const updatedContent = content.substring(0, startIdx) + newContent + content.substring(endIdx);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log('Successfully completed the page with the UI from the image.');
} else {
    console.error('Could not find markers', startIdx, endIdx);
}
