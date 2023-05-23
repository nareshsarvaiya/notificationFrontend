import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAdd = false;
  isUpdate = false;
  isView = true;
  empId: any = null;
  editData: any;
	title = 'api-angular';
  public data:any = [];
  variableName: Map<string, string> = new Map();
  
  constructor(private http: HttpClient) {
     this.getSuperVisor();
  }
  
  async ngOnInit() {
		// API Call
		await this.getData();
	}

  getSuperVisor() {
    let lists = [];
    // this.superviserMap = {};
    let url = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';
    this.http.get<any>(url).subscribe(data => {
      // console.log(data);
      lists = data;
      for (let i = 0; i < lists.length; i++) {
        this.variableName.set(lists[i].identificationNumber, lists[i].firstName);
      }
    });
  }


  getData() {

    this.http
			.get<any>('http://localhost:9091/api/get', {
			}) .subscribe(data => {
				this.data = data;
			});
  }

  addEmployee() {
    this.isView = false;
    this.isUpdate = false;
    this.isAdd = true;

  }

}
