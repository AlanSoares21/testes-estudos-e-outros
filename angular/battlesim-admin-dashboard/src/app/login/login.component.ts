import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  accessToken: string | null = null;
  oAuthUrl='http://localhost:4200?accessToken=test'

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
        this.accessToken = params.get('accessToken');
        if (this.accessToken)
          this.goToDashboard()
    })
  }

  goToDashboard() {
    this.router.navigate(['/dashboard'])
  }
}
