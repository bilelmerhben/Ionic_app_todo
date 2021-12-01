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
s;

  stytxt='';

  /* public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ]; */
  public form= new Observable<any[]>();
  style='opacity:0;';
  d = new Date(); // for now
  task={
    taskName: '',
    taskTime: `${this.d.getHours()}:${this.d.getMinutes()}`,
    taskIsChecked:false
  };

  dt=`${this.d.getDay()}/${this.d.getMonth()}/${this.d.getFullYear()}`;
  variable=true;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,

  ) { }

  ngOnInit() {
   this.form=this.authService.getallTasks();

    console.log( this.form);

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });

  }

ss(){
  this.s=true;
  if(this.s){
    this.stytxt='text-decoration:line-through;';
    this.s=false;
  }

}
  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      });
  }
  submit(){
    this.authService.addTask(this.task.taskName,this.task.taskTime);
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
}
