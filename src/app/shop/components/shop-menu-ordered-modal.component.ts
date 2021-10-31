import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-shop-menu-ordered-modal',
  templateUrl: './shop-menu-ordered-modal.component.html',
  styleUrls: ['./shop-menu-ordered-modal.component.scss'],
})
export class ShopMenuOrderedModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public users: User[]) {}

  ngOnInit(): void {}
}
