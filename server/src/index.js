import express from 'express';
const server = express();

import LocationsRouter from './routers/LocationsRouter/LocationsRouter';
import MenusRouter from './routers/MenusRouter/MenusRouter';
import MenuItemsRouter from './routers/MenuItemsRouter/MenuItemsRouter';

const PORT = process.env.PORT || 5000;

server.use('/api/locations', LocationsRouter);
server.use('/api/menus', MenusRouter);
server.use('/api/menuItems', MenuItemsRouter);

server.listen(PORT, (error) => {
    if (error) { console.log(error) };
});