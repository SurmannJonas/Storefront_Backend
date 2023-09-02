
import express, {Request, Response} from "express";
import bodyParser from "body-parser";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

// Localhost connected
app.use(bodyParser.json());

// start the Express server
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World');
});


// start the Express server
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
