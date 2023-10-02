import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import weaponsRoutes from "./handlers/mythical_weapons";
import userRoutes from "./handlers/users"

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/test-cors', cors(corsOptions), function (req: Request, res: Response) {
     res.json({msg: 'This is CORS-enabled with a middel ware'})
})


app.get('/mythical_weapons', (_req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/mythical_weapons/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the SHOW route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})


app.delete('/mythical_weapons/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the DELETE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

weaponsRoutes(app)

// start the Express server
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

/*
app.post('/mythical_weapons', (req: Request, res: Response) => {
    const weapon: Weapon = {
      title: req.body.title,
      summary: req.body.summary
    }
    try {
       res.send('this is the CREATE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})


app.put('/mythical_weapons/:id', (req: Request, res: Response) => {
    const weapon: Weapon = {
      id: req.params.id,
      title: req.body.title,
      summary: req.body.summary
    }
    try {
       res.send('this is the EDIT route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
*/
