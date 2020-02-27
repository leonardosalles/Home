import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  today = this.getDate();
  hour = this.getHour();
  intervalSecond: any;
  intervalMinute: any;

  constructor(private socket: Socket, private splashScreen: SplashScreen) {}

  ionViewWillEnter() {
    this.hour = this.getHour();
    this.startClock();
  }

  ionViewDidEnter() {
    this.splashScreen.hide();
  }

  startClock() {
    // a cada segundo atualiza a hora
    this.intervalSecond = setInterval(() => {
      this.hour = this.getHour();
    }, 1000);

    // a cada minuto atualiza a data
    this.intervalMinute = setInterval(() => {
      this.today = this.getDate();
    }, 1000 * 60);
  }

  ngOnInit() {
    this.socket.connect();
  }

  getHour() {
    const date = new Date();
    return `${this.lpad(date.getHours())}:${this.lpad(date.getMinutes())}:${this.lpad(date.getSeconds())}`;
  };

  getDate() {
    const date = new Date();
    return `${this.lpad(date.getDate())}/${this.lpad(date.getMonth() + 1)}/${date.getFullYear()}`
  };

  lpad(str) {
    str = str + '';

    if (str.length === 1) {
      return `0${str}`;
    }

    return str;
  };

  getMessage() {
    const stamp = new Date();
    const hours = stamp.getHours();
    
    let message = 'Bom dia';

    if (hours >= 18 && hours <24) {
      message = 'Boa noite';
    }
    if (hours >= 12 && hours <18) {
      message = 'Boa tarde';
    }
  
    return message;
  };

  ionViewDidLeave() {
    clearInterval(this.intervalSecond);
    clearInterval(this.intervalMinute);
  }
}
