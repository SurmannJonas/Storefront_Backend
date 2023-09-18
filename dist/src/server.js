"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var mythical_weapons_1 = __importDefault(require("./handlers/mythical_weapons"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/test-cors', (0, cors_1.default)(corsOptions), function (req, res) {
    res.json({ msg: 'This is CORS-enabled with a middel ware' });
});
/*
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
*/
app.delete('/mythical_weapons/:id', function (_req, res) {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, mythical_weapons_1.default)(app);
// start the Express server
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
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
