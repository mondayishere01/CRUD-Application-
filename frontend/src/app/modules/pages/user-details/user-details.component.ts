import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  dataSource: any;
  constructor(private requestService: RequestService) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.requestService.getAllDetails().subscribe((x) => {
      console.log(x);
      this.dataSource = x;
    });
  }
}
