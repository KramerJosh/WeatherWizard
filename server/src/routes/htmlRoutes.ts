import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response} from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (req: Request, res: Response) => {
    // Define the path to the index.html file relative to the current directory
    console.log(req.json) //adding this log to get rid of error for not using req
    const indexPath = path.join(__dirname, 'public', 'index.html');
    
    // Serve the index.html file
    res.sendFile(indexPath);
  });
export default router;
