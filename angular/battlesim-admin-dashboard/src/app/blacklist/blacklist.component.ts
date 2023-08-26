import { Component } from '@angular/core';
import { Player } from '../player';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent {
  players: Player[] = []

  constructor(private api: ApiCallsService) {}

  ngOnInit() {
    this.api.GetBlacklistedPlayers().subscribe(value => this.players = value)
  }
}
