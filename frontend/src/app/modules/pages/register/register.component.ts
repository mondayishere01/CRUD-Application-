import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // Form
  registerFrom!: FormGroup;
  wrongInput: boolean = false;
  invalidFormdata: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.registerFrom = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  formSubmit() {
    this.requestService
      .createUser(this.registerFrom?.value)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success == true) {
          alert(res.message);
          this.router.navigate(['/get-details']);
        } else if (res.success == false) {
          alert(res.message);
          this.invalidFormdata = false;
        }
      });
  }

  checkExist() {
    let value = this.registerFrom.value.username;
    if (value) {
      this.requestService.checkExist(value).subscribe((res: any) => {
        console.log(res);
        if (res.user_exist == true) {
          this.wrongInput = true;
        } else {
          this.wrongInput = false;
          this.invalidFormdata = false;
        }
      });
    }
  }
}
