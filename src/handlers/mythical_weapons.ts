import { Weapon, WeaponStore } from '../models/mythical_weapons';
import express, {Request, Response} from "express";

const store = new WeaponStore()

// handler functions here
const index = async (_req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons)
}

const show = async (req: Request, res: Response) => {
  const weapon = await store.show(req.params.id);
  res.json(weapon)
}

const weaponsRoutes = (app: express.Application) => {
  // Express routes here
  app.get('/mythical_weapons', index)
  app.get('/mythical_weapons/{:id}', show)
  //app.post('/mythical_weapons', create)
  //app.delete('/mythical_weapons', create)
}

export default weaponsRoutes
