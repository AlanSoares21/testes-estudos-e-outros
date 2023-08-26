import { Component } from '@angular/core';
import { Player } from '../player';
import { ApiCallsService } from '../api-calls.service';
import { Observable, finalize, forkJoin } from 'rxjs';

interface PlayerData extends Player {
  toBlacklist: boolean
}

function formatPlayer(player: Player): PlayerData {
    return {...player, toBlacklist: false} as PlayerData
}

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent {
  players: PlayerData[] = []
  sendingPlayersToBlacklist: boolean = false

  constructor(private api: ApiCallsService) {}

  check(id: string) {
    const index = this.players.findIndex(p => p.id === id)
    if (index === -1)
      return console.error(`Player with id ${id} not found`)
    
    this.players[index].toBlacklist = !this.players[index].toBlacklist
  }

  sendPlayersToBlacklist() {
    this.sendingPlayersToBlacklist = true
    const toBlacklist = this.players.filter(p => p.toBlacklist)
    const requests: Observable<Player>[] = toBlacklist
      .map(p => this.api.SendPlayerToBlacklist(p))
    forkJoin(requests)
    .pipe(finalize(() => {
      this.sendingPlayersToBlacklist = false
      this.listPlayers()
    }))
    .subscribe({
      next(players) {
        console.log(`players ${players.map(p => p.entityName).join(', ')} added to blacklist`)
      },
      error(err) {
        console.error(`Error sending players to blacklist`, err)
      },
      complete() {
        alert(`Players added to blacklist ${toBlacklist.map(p => p.entityName).join(', ')}`)
      },
    })
  }

  ngOnInit() {
    this.listPlayers()
  }

  listPlayers() {
    this.api.GetPlayers().subscribe(value => {
      this.players = value.map(formatPlayer)
    })
  }
}
