import { Component } from '@angular/core';
import { Player } from '../player';
import { ApiCallsService } from '../api-calls.service';
import { Observable, finalize, forkJoin } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { TableHeader } from '../table-header';

interface PlayerData extends Player {
  toBlacklist: boolean
}

function formatPlayer(player: Player): PlayerData {
    return {...player, toBlacklist: false} as PlayerData
}

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
  providers: [TableComponent]
})
export class PlayersListComponent {
  players: PlayerData[] = []
  sendingPlayersToBlacklist: boolean = false

  tableHeaders: TableHeader[] = [
    {id: 'name', displayText: 'Name', fieldName: 'entityName'},
    {id: 'email', displayText: 'Email', fieldName: 'email', width: '20%'},
    {id: 'lastLogin', displayText: 'Last Login', fieldName: 'lastLogin', width: '20%'},
    {id: 'ip', displayText: 'Ip', fieldName: 'ip', width: '20%'},
    {id: 'select', displayText: 'Select', width: '10%', input: {
      type: 'checkbox',
      change: (data, index) => {
        this.check(index)
      },
      disabled: (player: PlayerData) => player.blacklist,
      checked: (player: PlayerData) => player.toBlacklist
    }}
  ]

  constructor(private api: ApiCallsService) {}

  check(index: number) {  
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
