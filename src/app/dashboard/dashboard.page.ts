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
  d = new Date(); //date for now
  //une tache sous form d'objet
  task={
    taskName: '',
    taskTime: `${this.d.getHours()}:${this.d.getMinutes()}`,
    taskIsChecked:false
  };
//variable date pour afficher la date d'aujourd'hui
  dt=`${this.d.getDate()}/${this.d.getMonth()+1}/${this.d.getFullYear()}`;
  variable=true;
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,

  ) { }

  ngOnInit() {
   //liste des taches checkés
    this.form2=this.authService.getallTasksArechecked();
  //liste de tous les taches
   this.form=this.authService.getallTasks();
// details du user
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

//pour logout
  logout() {
    this.authService.logoutUser()
      .then(res => {
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
       // console.log(error);
      });
  }
  //ajouter une tache
  submit(){
    this.authService.addTask(this.task.taskName,this.task.taskTime,false);
    this.task.taskName='';
  }
  //affichage du button Annuler
  submitTask(){
    this.variable=false;
   this.style='opacity:1;';
  }
  //cacher le button Annuler
  submitTaskAnnuler(){
    this.variable=true;
    this.style='opacity:0;';
  }
//pour modifier la tache dans la base donnée si elle est checked ou pas
update(id: any,checked: any){
  this.authService.updateTask(id,checked);
}
//pour tabs done
doneClick(){
this.form=this.form2;
}
//pour tabs todod
todoClick(){
  this.form=this.authService.getallTasks();;
}
}
