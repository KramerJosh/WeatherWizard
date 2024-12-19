import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, type Request, type Response} from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('*', (_req: Request, res: Response) => {
    // Define the path to the index.html file relative to the current directory
    res.sendfile(path.join(__dirname, "../../../client/dist/index.html"))
    // Serve the index.html file
  });
export default router;
