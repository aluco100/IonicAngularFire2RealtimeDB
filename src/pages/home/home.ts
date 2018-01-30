import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: any;
  public messages: Array<any>;
  public user:any;

  @Input() public newMessage:string;

  constructor(public navCtrl: NavController,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth) {
    this.db.list("chat").valueChanges().subscribe(data => {
      console.log(data);
      this.messages = data;
    });

    this.auth.authState.subscribe(user => {
      console.log(user);
      if(user){
        this.user = user;
        console.log("user signed in: "+user.uid);
      }else{
        this.auth.auth.signInAnonymously()
                      .catch(error => console.log("Error in log in: "+error));
      }
    });
    // this.db.list("chat").push({
    //   message : "message1"
    // });
  }

  addMessage(){
    this.db.list("chat").push({
      message : this.newMessage,
      uid: this.user.uid
    });
    this.newMessage = "";
  }

}
