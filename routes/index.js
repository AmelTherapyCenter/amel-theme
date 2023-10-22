import { Router } from 'express';
import 'dotenv/config';

const router = Router();

const getCanonUrl = (host, path) => {
	host = host.includes('www.') ? host : `www.${host}`;
	path = path.split('?');
	return `https://${host}${path[0]}`;
};

router.get('/', async (req, res, next) => {
	res.render('index', {
		page: {
			path: '/'
		}
	});
});

export default router;
