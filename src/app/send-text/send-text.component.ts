import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TvService } from '../service/TvService';

@Component({
  selector: 'app-send-text',
  templateUrl: './send-text.component.html',
  styleUrls: ['./send-text.component.scss'],
})
export class SendTextComponent implements OnInit {
  @Input() tv: any;
  filter: any = {};

  constructor(
    private modalController: ModalController,
    private tvService: TvService
  ) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  async sendText() {
    const response = await this.tvService.send(this.tv.area, this.tv.ip, this.filter.text);

    if (response && response.success) {
      this.filter.text = null;
    }
  }

  async clearText() {
    const response = await this.tvService.send(this.tv.area, this.tv.ip, '');

    if (response && response.success) {
      this.filter.text = null;
    }
  }
}
