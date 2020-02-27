import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LedStripeService } from '../service/LedStripeService';
import iro from '@jaames/iro';
import { Socket } from 'ng-socket-io';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';

@Component({
  selector: 'app-led-control',
  templateUrl: './led-control.page.html',
  styleUrls: ['./led-control.page.scss'],
})
export class LedControlPage implements OnInit {
  @Input() ledStripe: any;
  colorPicker: any;

  escape: boolean = false;
  ready: boolean = false;
  playPauseState: string = 'PAUSE';

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    public ledStripeService: LedStripeService,
    private socket: Socket,
    private taptic: TapticEngine
  ) {

  }

  onColorChange(color) {
    if (this.ready) {
      this.ledStripeService.colorByHex(this.ledStripe.area, this.ledStripe.id, color.hexString.replace('#', ''));
      
      /*this.socket.emit('LedStripe.changeColor', {
        area: this.ledStripe.area,
        id: this.ledStripe.id,
        hex: color.hexString.replace('#', '')
      });*/
    }
  }

  ngOnInit() {
    this.colorPicker = new iro.ColorPicker('#color-picker-container', {
      layout: [
        {
          component: iro.ui.Wheel,
          options: {}
        }
      ]
    });

    const iroWheel = document.querySelector('.iro__wheel__saturation');

    if (iroWheel) {
      iroWheel.setAttribute('fill', 'transparent');
    }

    this.colorPicker.on('color:change', this.onColorChange.bind(this));

    this.colorPicker.color.rgb = {
      r: this.ledStripe.r,
      g: this.ledStripe.g,
      b: this.ledStripe.b
    };

    setTimeout(() => {
      this.ready = true;
    }, 500);
  }

  ngOnDestroy() {
    this.colorPicker.off('color:change', this.onColorChange.bind(this));
  }

  async toggleLedStripe(ledStripe) {
    ledStripe.isLoading = true;

    let method = this.ledStripeService.on.bind(this.ledStripeService);

    if (ledStripe.isOn) {
      method = this.ledStripeService.off.bind(this.ledStripeService);
    }

    try {
      await method(ledStripe.area, ledStripe.id);
      ledStripe.isOn = !ledStripe.isOn;
    } catch(err) {
      console.log(err);
      this.presentError();
    }

    ledStripe.isLoading = false;

    this.taptic.impact({ style: 'heavy' });
  }

  close() {
    this.modalController.dismiss();
  }

  async presentError() {
    const toast = await this.toastController.create({
      message: 'Erro ao controlar o LED, tente reinicia-lo.',
      duration: 3000,
      color: 'danger'
    });

    toast.present();
  }

  async changeIntensity() {
    this.ledStripeService.intensity(this.ledStripe.area, this.ledStripe.id, this.ledStripe.intensity);
    
    /*this.socket.emit('LedStripe.changeIntensity', {
      area: this.ledStripe.area,
      id: this.ledStripe.id,
      intensity: this.ledStripe.intensity
    });*/
  }
}