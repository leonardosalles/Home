import { Component, OnInit, Input } from '@angular/core';
import { TvService } from '../service/TvService';
import { ModalController, ToastController } from '@ionic/angular';
import { SendTextComponent } from '../send-text/send-text.component';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';

@Component({
  selector: 'app-remote-control',
  templateUrl: './remote-control.page.html',
  styleUrls: ['./remote-control.page.scss'],
})
export class RemoteControlPage implements OnInit {
  @Input() tv: any;

  escape: boolean = false;
  playPauseState: string = 'PAUSE';

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public tvService: TvService,
    private taptic: TapticEngine
  ) {

  }

  ngOnInit() {
    //console.log(this.tv);
  }

  async toggleTvPower() {
    if (this.escape) {
      return;
    }

    this.escape = true;
    this.tv.isLoading = true;

    try {
      await this.tvService.onOff(this.tv.area, this.tv.ip);
      this.tv.isOn = !this.tv.isOn;
    } catch(err) {
      console.log(err);
      this.presentError();
    }

    this.tv.isLoading = false;

    this.taptic.impact({ style: 'heavy' });

    setTimeout(() => {
      this.escape = false;
    }, 3000);
  }

  async sendKey(key: string) {
    try {
      this.taptic.impact({ style: 'heavy' });
      await this.tvService.sendKey(this.tv.area, this.tv.ip, key);
    } catch(err) {
      console.log(err);
      this.presentError();
    }
  }

  close() {
    this.modalController.dismiss();
  }

  async presentError() {
    const toast = await this.toastController.create({
      message: 'Erro ao controlar a TV, tente reinicia-la.',
      duration: 3000,
      color: 'danger'
    });

    toast.present();
  }

  togglePlayPause() {
    this.taptic.impact({ style: 'heavy' });
    this.sendKey(this.playPauseState);

    if (this.playPauseState === 'PLAY') {
      return this.playPauseState = 'PAUSE';
    }

    if (this.playPauseState === 'PAUSE') {
      this.playPauseState = 'PLAY';
    }
  }

  async openModalText() {
    this.taptic.impact({ style: 'heavy' });
    const modal = await this.modalController.create({
      component: SendTextComponent,
      cssClass: 'send-text-dialog',
      componentProps: {
        tv: this.tv
      }
    });

    return await modal.present();
  }
}