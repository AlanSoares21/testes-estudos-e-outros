import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  accessToken: string | null = null;
  oAuthUrl='http://localhost:3000/Auth/Login'

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: ApiCallsService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
        this.accessToken = params.get('accessToken');
        if (this.accessToken) {
          this.http.SetAccessToken(this.accessToken)
          this.goToDashboard()
        }
    })
  }

  goToDashboard() {
    this.router.navigate(['/dashboard'])
  }
}
