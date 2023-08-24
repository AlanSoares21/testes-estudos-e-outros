import { Component } from '@angular/core';
import { Player } from '../player';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent {
  players: Player[] = []

  constructor(private api: ApiCallsService) {}

  ngOnInit() {
    this.api.GetPlayers().subscribe(value => {
      this.players = value
    })
  }
}
