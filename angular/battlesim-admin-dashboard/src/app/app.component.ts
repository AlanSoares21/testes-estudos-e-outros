import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'battlesim-admin-dashboard';
  accessToken: Observable<string> | undefined;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // accessToken = this.route.snapshot.paramMap.get('accessToken');
    console.log("init rodou", this.route.snapshot.paramMap)
  }
  
}
