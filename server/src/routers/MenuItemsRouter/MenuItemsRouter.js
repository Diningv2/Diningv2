import express from 'express';
import axios from 'axios';

import locations from '../../config/locations';
import mealNames from '../../config/mealNames';
import monthName from '../../config/monthName';

const MENU_ITEMS_URI = 'http://www.yaledining.org/fasttrack/menus.cfm?version=3';

const router = express.Router();
export default router;