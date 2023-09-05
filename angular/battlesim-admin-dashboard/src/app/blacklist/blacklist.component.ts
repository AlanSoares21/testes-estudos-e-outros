import { Component } from '@angular/core';
import { Player } from '../player';
import { ApiCallsService } from '../api-calls.service';
import { finalize, forkJoin } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { TableHeader } from '../table-header';

interface PlayerData extends Player {
  remove: boolean
}

function formatPlayer(value: Player): PlayerData {
  return {...value, remove: false}
}

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css'],
  providers: [TableComponent]
})
export class BlacklistComponent {
  players: PlayerData[] = []
  headers: TableHeader[] = [
    {id: 'email', displayText: 'Email', fieldName: 'email'},
    {id: 'lastLogin', width: '20%', displayText: 'Last Login', fieldName: 'lastLogin'},
    {id: 'ip', width: '20%', displayText: 'Ip Address', fieldName: 'ip'},
    {id: 'select', width: '10%', displayText: 'Select',
      input: {
        type: 'checkbox',
        change: (_, index) => this.checkPlayer(index)
      }
    }
  ]

  constructor(private api: ApiCallsService) {}

  checkPlayer(index: number) {
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
