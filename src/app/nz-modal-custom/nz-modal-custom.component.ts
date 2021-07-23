import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nz-modal-custom',
  templateUrl: './nz-modal-custom.component.html',
  styleUrls: ['./nz-modal-custom.component.scss']
})
export class NzModalCustomComponent implements OnInit {

  @Input() title?: string;
  @Input() subtitle?: string;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }

  ngOnInit(): void {
  }

}
