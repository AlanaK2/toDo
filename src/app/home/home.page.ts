import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

tasks: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) {
    let taskJson = localStorage.getItem('taskdb');
    if(taskJson!= null){
      this.tasks = JSON.parse(taskJson);
    }
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs:[
        {
          name: 'taskToDo',
          type: 'text',
          placeholder: 'O que deseja fazer?',
        }
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      },
    {
      text: 'Adicionar',
      handler: (form)=> {
        this.add(form.taskToDo);
      }
    }],
    });

    await alert.present();
  }

  async add(newTask: string){
    if(newTask.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message: 'Informe o que deseja fazer!',
        duration: 2000,
        position: 'bottom'
      })
    toast.present();
    return;
    }
    let task = {name: newTask, done: false};
    this.tasks.push(task);
    this.updateLocalStorage();
  };
   updateLocalStorage(){
    localStorage.setItem('taskdb', JSON.stringify(this.tasks));
   };

   async openActions(task: any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [
        {
          text: task.done ? 'Desmarcar' : 'Marcar',
          icon: task.done ? 'radio-button-off' : 'checkmark-circle',
          handler: ()=> {
            task.done = !task.done;
            this.updateLocalStorage();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        },
      ],
    });

    await actionSheet.present();
   }
  }
