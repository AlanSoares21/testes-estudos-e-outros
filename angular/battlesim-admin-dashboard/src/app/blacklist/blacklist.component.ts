import { Component } from '@angular/core';
import { Player } from '../player';
import { ApiCallsService } from '../api-calls.service';
import { finalize, forkJoin } from 'rxjs';

interface PlayerData extends Player {
  remove: boolean
}

function formatPlayer(value: Player): PlayerData {
  return {...value, remove: false}
}

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent {
  players: PlayerData[] = []

  constructor(private api: ApiCallsService) {}

  checkPlayer(id: string) {
    const index = this.players.findIndex(p => p.id === id)
    if (index !== -1)
      this.players[index].remove = !this.players[index].remove
  }

  removePlayersFromBlacklist() {
    const toRemove = this.players.filter(p => p.remove)
    const calls = toRemove.map(p => this.api.RemovePlayerFromBlacklist(p.id))
    forkJoin(calls)
    .pipe(finalize(() => this.listPlayers()))
    .subscribe(() => {
      alert(`Players ${toRemove.map(p => p.email).join(', ')} removed from blacklist`)
    })
  }

  ngOnInit() {
    this.listPlayers()
  }

  listPlayers() {
    this.api.GetBlacklistedPlayers().subscribe(value => this.players = value.map(formatPlayer))
  }
}
