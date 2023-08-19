import ex from 'express'
import cors from 'cors'

const e = ex();

e.use(cors())

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


e.get('/Auth/Login', (req, res) => {
    res.redirect('http://localhost:4200?accessToken=test')
})

e.get('/DashboardMetrics', (req, res) => {
    res.json({
        UsersConnected: 31,
        BattleHappening: 5,
        MemoryUsage: 0.5,
        ErrorsUnhandled: 6
    })
})

// listar players -> entityName, email, last login, 
e.get('/Players', (req, res) => {
    res.json(players)
})

// adicionar player na blacklist
e.post('/Blacklist', (req, res) => {
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
e.get('/Blacklist', (req, res) => {
    res.json(blacklist)
})

// remover da blacklist
e.delete('/Blacklist/:id', (req, res) => {
    const id = req.params.id
    const index = blacklist.findIndex(b => b.id === id)
    if (index === -1)
        return res.status(404).json({message: `User ${id} not found in the blacklist`} as ApiError)
    blacklist.splice(index, 1)
    res.status(204).send()
})

// listar logs
e.get('/Logs', (req, res) => {
    res.json(logs)
})

// marcar log como handled
e.put('/Logs/:id', (req, res) => {
    const id: number = Number(req.params.id);
    const index = logs.findIndex(l => l.id === id);
    if (index === -1)
        return res.status(404).json({ message: `Log with id ${id} Not Found` } as ApiError)
    logs[index].checked = true;
    res.json(logs[index] as Log)
})


e.listen(3000, () => {
    console.log('server running in localhost:3000')
});