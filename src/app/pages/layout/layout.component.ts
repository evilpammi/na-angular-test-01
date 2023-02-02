import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isOpened: boolean = true;
  desktopViewWidth: number = 1100;
  menu: any = [
    { title: "ลูกค้าที่มีโอกาสกลับมาใช้งาน MyMo", url: "/pre-mymo" },
    { title: "ลูกค้าที่มีโอกาสถือสินเชื่อ", url: "/reco-loan" },
    { title: "ลูกค้าที่มีโอกาสกลับมาใช้งาน MyMo และมีโอกาสถือสินเชื่อ", url: "/customer-all" }
  ]
  user: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.onResize(window.innerWidth);
    // this.user = this.authService.getUserInfo();
  }

  checkActive(url: string) {
    return this.router.url === url;
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    this.isOpened = width >= this.desktopViewWidth;
  }

  getMenuTitle() {
    let index = this.menu.findIndex((x: any) => x.url.includes(this.router.url))
    return this.menu[index].title;
  }

  goTo(url: any) {
    this.router.navigateByUrl(url);
  }

  logout() {
    // this.authService.logout();
  }
  
}
