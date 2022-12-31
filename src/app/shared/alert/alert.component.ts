import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() color!: string;
  // c: string = '';
  
  constructor() { }

  ngOnInit(): void {
    // this.c = `bg-${this.color}-400`
    console.log(`bg-${this.color}-400`);
  }

  get alertBgColor() {
    return `bg-${this.color}-400`
  }

}
