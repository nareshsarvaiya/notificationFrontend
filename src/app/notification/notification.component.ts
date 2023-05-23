import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  title = 'FirstProject1';
  formdata: any;
  myForm: any;
  sortedList: any = [];
  public data: any = [];
  constructor(private http: HttpClient, private formBuilder: FormBuilder,) { }
  ngOnInit() {
    this.formdata = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      supervisor: new FormControl(null),
      email: new FormControl(null),
      phoneNumber: new FormControl(null),
    });
    // API Call
    this.getSuperVisor();
  }

  getSuperVisor() {
    let objectNameList;
    let url = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';
    this.http.get<any>(url).subscribe(data => {
      objectNameList = data;
      this.sortedList = objectNameList.sort((a: any, b: any) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
    });
  }

  onClickSubmit() {
    if (this.formdata.valid) {
      let json: any = {};
      json.firstName = this.formdata.value.firstName;
      json.lastName = this.formdata.value.lastName;
      json.supervisor = this.formdata.value.supervisor;
      json.email = this.formdata.value.email;
      json.phoneNumber = this.formdata.value.phoneNumber;
      let notifications = [];
      notifications.push(json);
      console.log(notifications);
      let url = 'http://localhost:9091/api/submit';
      this.http.post<any>(url, notifications)
        .subscribe(
          (response: any) => {                           //Next callback
            console.log('Sucess')
            this.data = response;
            window.location.reload();
          },
          (error: any) => {                              //Error callback
            console.error('error caught in component ' + error)
          }
        )
    }
  }
}
