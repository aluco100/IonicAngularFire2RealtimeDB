import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: any;
  public messages: Array<any>;

  @Input() public newMessage:string;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase) {
    this.db.list("chat").valueChanges().subscribe(data => {
      console.log(data);
      this.messages = data;
    });
    // this.db.list("chat").push({
    //   message : "message1"
    // });
  }

  addMessage(){
    this.db.list("chat").push({
      message : this.newMessage
    });
    this.newMessage = "";
  }

}
