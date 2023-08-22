import ex from 'express'
import cors from 'cors'

const e = ex();

e.use(cors())

const authkeys: string[] = [];

interface ApiError {
    message: string;
}

interface Log {
    id: number;
    message: string;
    type: string;
    checked: boolean;
}

const logs: Log[] = [];
const logsTypes = [ 'Error' , 'Warning' , 'Info' ];
for (let index = 0; index < 145; index++) {
    logs.push({
        id: index,
        message: `creating message for index ${index} `,
        type: logsTypes[index%logsTypes.length],
        checked: index%10 !== 0
    })
}

interface Player {
    id: string;
    entityName: string;
    email: string;
    lastLogin: string;
    ip: string;
}

const players: Player[] = [];

const blacklist: Player[] = [];

for (let index = 0; index < 64; index++) {
    players.push(
        { 
            id: `${index}`,
            email: `jogador${index}@email.com`, 
            entityName: `entity${index}`, 
            ip: `198.168.200.${index}`, 
            lastLogin: Date.UTC.toString() 
        }
    );
}

for (let index = 0; index < players.length; index += 10) {
    blacklist.push(
        { ...players[index] }
    );
}

const routes = ex.Router();

e.get('/Auth/Login', (req, res) => {
    const keys = Date.now().toString()
    authkeys.push(keys)
    res.redirect(`http://localhost:4200?accessToken=${keys}`)
})

routes.get('/DashboardMetrics', (req, res) => {
    res.json({
        UsersConnected: 31,
        BattleHappening: 5,
        MemoryUsage: 0.5,
        ErrorsUnhandled: 6
    })
})

// listar players -> entityName, email, last login, 
routes.get('/Players', (req, res) => {
    res.json(players)
})

// adicionar player na blacklist
routes.post('/Blacklist', (req, res) => {
    const player: Player | undefined = req.body.player;
    if (player === undefined)
        return res.status(400).json({message: 'you should provide the user data'} as ApiError)
    const index = players.findIndex(p => p.id === player.id)
    if (index === -1)
        return res.status(404).json({message: `Player with id ${player.id} not found`} as ApiError)
    blacklist.push(players[index])
    res.status(201).json(players[index])
})

// listar blacklist
routes.get('/Blacklist', (req, res) => {
    res.json(blacklist)
})

// remover da blacklist
routes.delete('/Blacklist/:id', (req, res) => {
    const id = req.params.id
    const index = blacklist.findIndex(b => b.id === id)
    if (index === -1)
        return res.status(404).json({message: `User ${id} not found in the blacklist`} as ApiError)
    blacklist.splice(index, 1)
    res.status(204).send()
})

// listar logs
routes.get('/Logs', (req, res) => {
    res.json(logs)
})

// marcar log como handled
routes.put('/Logs/:id', (req, res) => {
    const id: number = Number(req.params.id);
    const index = logs.findIndex(l => l.id === id);
    if (index === -1)
        return res.status(404).json({ message: `Log with id ${id} Not Found` } as ApiError)
    logs[index].checked = true;
    res.json(logs[index] as Log)
})

e.use('/', (req, res, next) => {
    const auth = req.headers['authorization']
    if (auth === undefined || auth.length === 0)
        return res.status(401).json({message: 'auth token not provided'} as ApiError)
    if (!auth.startsWith('Bearer '))
        return res.status(401).json({message: 'token shoul start with Bearer'} as ApiError)
    if (authkeys.find(k => k === auth) !== undefined)
        return res.status(401).json({message: 'Token not found in auth keys'} as ApiError)
    return next();
}, routes)

e.listen(3000, () => {
    console.log('server running in localhost:3000')
});