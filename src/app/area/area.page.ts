import { Component, OnInit } from '@angular/core';
import { LampService } from '../service/LampService';
import { TvService } from '../service/TvService';
import { ToastController, ModalController } from '@ionic/angular';
import { Lamp } from '../model/lamp.model';
import { Socket } from 'ng-socket-io';
import { ActivatedRoute } from '@angular/router';
import { RemoteControlPage } from '../remote-control/remote-control.page';
import { LedControlPage } from '../led-control/led-control.page';
import { LedStripeService } from '../service/LedStripeService';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage implements OnInit {
  isLoading: Boolean = false;
  on: Boolean = false;
  lamps: Lamp[];
  ledStripes: any[];
  tvs: any[];
  area: string;

  constructor(
    public modalController: ModalController,
    public lampService: LampService,
    public ledStripeService: LedStripeService,
    public tvService: TvService,
    public toastController: ToastController,
    private socket: Socket,
    private route: ActivatedRoute
  ) { }

  initCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async ngOnInit() {
    const area = this.route.snapshot.paramMap.get('id');
    this.area = this.initCap(area);

    const lamps: any = await this.lampService.list(area);
    this.lamps = lamps;

    const ledStripes: any = await this.ledStripeService.list(area);
    this.ledStripes = ledStripes;

    const tvs: any = await this.tvService.list(area);
    this.tvs = tvs;

    if (tvs && tvs.length) {
      this.getTvsStatus();
    }

    this.socket.on('updateLampByIp', async (data) => {
      const ip = data.ip;
      const isOn = data.isOn;

      if (ip && isOn !== undefined) {
        const response: any = await this.getLampByIp(ip);
        const index = response.index;

        this.lamps[index].isOn = isOn;
      }
    });
  }

  async toggleLamp(lamp) {
    lamp.isLoading = true;

    let method = this.lampService.on.bind(this.lampService);

    if (lamp.isOn) {
      method = this.lampService.off.bind(this.lampService);
    }

    try {
      await method(lamp.area, lamp.ip);
      lamp.isOn = !lamp.isOn;
    } catch(err) {
      console.log(err);
      this.presentError();
    }

    lamp.isLoading = false;
  }

  async presentRemoteControl(tv) {
    const modal = await this.modalController.create({
      component: RemoteControlPage,
      componentProps: { tv }
    });

    return await modal.present();
  }

  async presentError() {
    const toast = await this.toastController.create({
      message: 'Erro ao controlar a lâmpada, tente segurar o interruptor da mesma por 2 segundos.',
      duration: 3000,
      color: 'danger'
    });

    toast.present();
    this.isLoading = false;
  }

  async openLedDialog(ledStripe) {
    const modal = await this.modalController.create({
      component: LedControlPage,
      componentProps: { ledStripe }
    });

    return await modal.present();
  }

  getLampByIp(ip: string) {
    return new Promise(resolve => {
      this.lamps.filter((item, index) => {
        if (item.ip === ip) {
          resolve({
            index,
            item
          });
        }
      });
    });
  }

  getTvsStatus() {
    for (let index in this.tvs) {
      const tv = this.tvs[index];

      this.tvService.status(tv.area, tv.ip).then(status => {
        this.tvs[index].isOn = status.isOn;
      });
    }
  }
}
