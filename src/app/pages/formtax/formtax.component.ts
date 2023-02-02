import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-formtax',
  templateUrl: './formtax.component.html',
  styleUrls: ['./formtax.component.scss'],
})
export class FormTaxComponent implements OnInit {
  filingType: string = "0";
  monthList: any = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" }
  ]
  yearList: any = [];

  taxAmountCal: number = 0;
  isNext: boolean = false;
  taxData: any = {
    filingType: "0",
    month: "",
    year: "",
    saleAmount: 0,
    taxAmount: 0,
    surcharge: 0,
    penalty: 0,
    totalAmount: 0
  }
  modal: any;
  modalTitle: string = "";
  modalText: string = "";
  confirmBtnText: string = "";
  cancelBtnText: string = "";
  modalType: string = "";
  currentMonth: any;
  currentYear: any;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    const d = new Date();
    this.currentMonth = d.getMonth()+1;
    this.currentYear = d.getFullYear();
    for(let i = 2020; i <= this.currentYear; i++) {
      this.yearList.push(i.toString())
    }
    console.log(this.yearList)
  }

  onfilingTypeChange() {
    if(this.taxData.filingType === "1") {
      this.taxData.penalty = 200;
      this.calTotal();
    } else {
      this.taxData.surcharge = 0;
      this.taxData.penalty = 0;
      this.calTotal();
    }
    this.cdRef.detectChanges();
  }

  onSaleAmountChange() {
    this.taxAmountCal = Number((this.taxData.saleAmount * 0.07).toFixed(2));
    this.taxData.taxAmount = this.taxAmountCal;
    this.cdRef.detectChanges();
    this.calTotal();
  }

  onTaxAmountChange() {
    if((this.taxData.saleAmount && this.taxData.saleAmount > 0) && (!this.taxData.taxAmount || this.taxData.taxAmount === 0)) {
      this.taxData.taxAmount = this.taxAmountCal;
    }
    this.cdRef.detectChanges();
    this.calTotal();
  }

  calTotal() {
    this.taxData.surcharge = this.taxData.filingType === "1" ? Number((this.taxData.taxAmount * 0.1).toFixed(2)): 0;
    this.taxData.totalAmount = Number((this.taxData.taxAmount + this.taxData.surcharge + this.taxData.penalty).toFixed(2));
    this.cdRef.detectChanges();
  }

  isInvalidTaxAmount() {
    return this.taxData.saleAmount && this.taxData.saleAmount !== 0 && this.taxData.taxAmount && this.taxData.taxAmount !== 0 && Math.abs(this.taxData.taxAmount - this.taxAmountCal) > 20;
  }
  
  validate() {
    if(this.taxData.month === "" || this.taxData.year === "" || this.taxData.saleAmount === 0 || this.taxData.taxAmount === 0 || this.invalidMonth() || this.isInvalidTaxAmount()) {
      return false;
    } else {
      return true;
    }
  }

  invalidMonth() {
    if(Number(this.taxData.month) > this.currentMonth && Number(this.taxData.year) >= this.currentYear) {
      return true;
    } else {
      return false;
    }
  }

  goBack(stepper: MatStepper){
    this.isNext = false;
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    this.isNext = true;
    if(this.validate()) {
      stepper.next();
    }
  }

  getFilingType() {
    switch (this.taxData.filingType) {
      case "0":
        return "Ordinary Filing";
      case "1":
        return "Additional Filing";
      default:
        return "";
    }
  }

  getSelectedMonth() {
    return this.monthList.find((x: any) => x.value === this.taxData.month)?.name || "";
  }

  submit() {
    this.modalTitle = "Submitted";
    this.modalText = JSON.stringify(this.taxData, null, 2);
    this.confirmBtnText = "Close";
    this.cancelBtnText = "";
    this.modalType = "complete";
    this.cdRef.detectChanges();
    this.openModal("modal_message");
  }

  
  openModal(id: string = "") {
    this.modal = new bootstrap.Modal(document.getElementById(id) as HTMLElement);
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

}
