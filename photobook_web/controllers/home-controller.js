import path from 'path';
import { fileURLToPath } from 'url';

const __filenmae = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenmae);

export const goHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
}