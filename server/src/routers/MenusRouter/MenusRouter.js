import express from 'express';

import getOneMenu from './getOneMenu';
import getAllMenus from './getAllMenus';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!('location' in req.query) || req.query.location == 'all') {
        try {
            const menus = await getAllMenus(req.query);
            res.send(menus);
        }
        catch (e) {
            console.warn(e);
            res.sendStatus(500);
        }
    }
    else {
        try {
            const menu = await getOneMenu(req.query);
            res.send(menu);
        }
        catch (e) {
            console.warn(e);
            res.sendStatus(500);
        }
    }
});

export default router;