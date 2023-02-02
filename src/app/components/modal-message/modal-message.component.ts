import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
})
export class ModalMessageComponent implements OnInit {
  @Input() title: string = "";
  @Input() text: string = "";
  @Input() confirmBtnText: string = "";
  @Input() cancelBtnText: string = "";
  @Input() type: string = "warning";
  @Output() confirm: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  iconClass: string = "";

  constructor() { }

  ngOnInit(): void {
    switch (this.type) {
      case "warning":
        this.iconClass = "bi-exclamation-triangle text-warning"
        break;
      case "error":
        this.iconClass = "bi-exclamation-circle text-danger"
        break;
      case "success":
        this.iconClass = "bi-check-circle text-success"
        break;
      case "info":
        this.iconClass = "bi-exclamation-circle text-primary"
        break;
      default:
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      switch (this.type) {
        case "warning":
          this.iconClass = "bi-exclamation-triangle text-warning"
          break;
        case "error":
          this.iconClass = "bi-exclamation-circle text-danger"
          break;
        case "success":
          this.iconClass = "bi-check-circle text-success"
          break;
        case "info":
          this.iconClass = "bi-exclamation-circle text-primary"
          break;
        default:
          break;
      }
    }
  }

  handleConfirm() {
    this.confirm.emit();
  }

  handleCancel() {
    this.cancel.emit();
  }

}
