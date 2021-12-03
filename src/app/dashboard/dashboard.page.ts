// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  stytxt='text-decoration:line-through;';
form2;
  public form= new Observable<any[]>();
  style='opacity:0;';
  d = new Date(); // for now
  task={
    taskName: '',
    taskTime: `${this.d.getHours()}:${this.d.getMinutes()}`,
    taskIsChecked:false
  };

  dt=`${this.d.getDate()}/${this.d.getMonth()+1}/${this.d.getFullYear()}`;
  variable=true;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,

  ) { }

  ngOnInit() {
    console.log(this.dt);
    this.form2=this.authService.getallTasksArechecked();

   this.form=this.authService.getallTasks();

    this.authService.userDetails().subscribe(res => {
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });
  }


  logout() {
    this.authService.logoutUser()
      .then(res => {
       // console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
       // console.log(error);
      });
  }
  submit(){
    this.authService.addTask(this.task.taskName,this.task.taskTime,false);
    this.task.taskName='';
  }
  submitTask(){
    this.variable=false;
   this.style='opacity:1;';
  }
  submitTaskAnnuler(){
    this.variable=true;
    this.style='opacity:0;';
  }
update(id: any,bo: any){
  this.authService.updateTask(id,bo);
}
doneClick(){
this.form=this.form2;
}
todoClick(){
  this.form=this.authService.getallTasks();;
}
}
