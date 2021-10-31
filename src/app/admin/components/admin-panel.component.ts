import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order.model';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private apiService: AdminApiService, private fb: FormBuilder) {}

  private formGroup = this.fb.group({
    id: ['', Validators.required],
    due: ['', Validators.required],
  });

  private formArray = this.fb.array([]);

  updateShops() {
    const data = this.formArray.value;
    this.apiService.updateShopList(data).subscribe();
  }

  cartData$ = this.apiService.getAllOrders().pipe(
    map((res) =>
      res.reduce((acc, cur) => {
        const id = cur.restaurant_id!.toString();
        const prev: Order[] = acc[id] ?? [];
        acc[id] = [...prev, cur];
        return acc;
      }, {} as { [rid: string]: Order[] })
    )
  );

  ngOnInit(): void {}
}
