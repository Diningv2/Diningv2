import express from 'express';
import getMenuIdInfo from './getMenuIdInfo';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
    if (!('menuitemid' in req.query)) {
        console.warn("menuitemid is an essential parameter");
        res.sendStatus(500);
    }
    else {
        try{
            const menu = await getMenuIdInfo(req.query.menuitemid);
            res.send(menu);
        } 
        catch (e) {
            console.warn(e);
            res.sendStatus(500);
        }
    }
});