import express from 'express';
import push from './push';
import cron from 'node-cron';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
    if (!('pushtoken' in req.query)) {
        console.warn("pushtoken is an essential parameter");
        res.sendStatus(400);
    }
    else {
        try{
            await push(req.query.pushtoken);
            // cron.schedule("30 8 * * *", function() {
            //   console.log("running a task every minute");
            // });
            res.send("Pushing");
        } 
        catch (e) {
            console.warn(e);
            res.sendStatus(500);
        }
    }
});
