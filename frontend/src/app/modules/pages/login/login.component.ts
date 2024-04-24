import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Form
  loginFrom!: FormGroup;
  wrongInput: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.loginFrom = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  formSubmit() {
    this.requestService
      .checkUser(this.loginFrom?.value)
      .subscribe((res: any) => {
        if (res.user_exist == true) {
          localStorage.setItem('userInfo', JSON.stringify(res[0]));
          this.router.navigate(['/get-details']);
        } else if (res.user_exist == false) {
          this.wrongInput = true;
          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 2000);
        }
      });
  }
}
