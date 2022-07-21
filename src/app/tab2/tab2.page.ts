import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tableData: any[];
  AllData: any[];
  constructor(private fb: FormBuilder, private sqlite: SQLite) {
    this.tableData = [{}];
    this.AllData = [{}];
  }

  personalDetails: FormGroup = this.fb.group(
    {
      fname: [''],
      sname: [''],
      age: [0],
      email: [''],
      password: [''],
    },
    { updateOn: 'submit' }
  );
  onSubmit() {
    console.log(this.personalDetails.value);
    this.sqlite
      .create({
        name: 'data.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        // try {
        //   this.executeCommand(
        //     db,
        //     'CREATE TABLE IF NOT EXISTS DemoTable(fname varchar(32), sname varchar(32), age number, email varchar(32), password varchar(32))',
        //     []
        //   );
        // } catch {
        //   console.log('Command Error');
        // }
        this.executeCommand(
          db,
          'INSERT INTO DemoTable(fname,sname,age,email,password) VALUES (?,?,?,?,?)',
          [
            this.personalDetails.value.fname,
            this.personalDetails.value.sname,
            this.personalDetails.value.age,
            this.personalDetails.value.email,
            this.personalDetails.value.password,
          ]
        );
        this.executeCommand(db, 'SELECT * FROM DemoTable', []);
      })
      .catch((e) => console.log(e));
  }
  executeCommand = (db: SQLiteObject, query: string, params: any) => {
    db.executeSql(query, params)
      .then((data) => {
        // let arr = [];
        console.log('Executed SQL', data);
        for (let i = 0; i < data.rows.length; i++) {
          this.tableData.push(data?.rows?.item(i));
        }
        // this.tableData.push(arr);
        console.log(this.tableData);
      })
      .catch((e) => console.error(e));
  };
  Show() {
    this.AllData = this.tableData;
    console.log(this.AllData);
  }
}
