import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-admin-panel-result',
  templateUrl: './admin-panel-result.component.html',
  styleUrls: ['./admin-panel-result.component.scss'],
})
export class AdminPanelResultComponent implements OnInit {
  constructor() {}

  @Input() key!: string;
  @Input() data!: CartItem[];

  resultCode = '';

  ngOnInit(): void {
    const ssKey = 'ngStorage-cart';
    console.log(this.data);
    this.resultCode = `
    (function(){
      const prev = JSON.parse(sessionStorage.getItem('${ssKey}') || '{}');
      const next = { ...prev, items: ${JSON.stringify(this.data)}}
      sessionStorage.setItem('${ssKey}', JSON.stringify(next));
    })()
    `;
  }

  copied(e: any) {
    alert(
      '클립보드 복사에 성공했어요.\n자바스크립트 호환성을 위해 크롬 브라우저를 사용해주세요.'
    );
  }
}
