import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { from } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mergeMap,
  scan,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { ShopStats } from '../models/shop-stats.model';
import { ShopApiService } from '../services/shop-api.service';
import { ShopMenuOrderedModalComponent } from './shop-menu-ordered-modal.component';

dayjs.extend(duration);

interface ShopInfoUI extends ShopStats {
  name: string;
  thumb: string;
  hero: string;
  eta: string;
}

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  constructor(
    private apiService: ShopApiService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  viewOrdered(data: ShopStats['ordered_users']) {
    this.dialog.open(ShopMenuOrderedModalComponent, { data });
  }

  list$ = this.apiService.getShops().pipe(
    mergeMap((list) => from(list)),
    distinctUntilChanged(),
    mergeMap((shopData) =>
      this.apiService.getInfo(shopData.id).pipe(
        // map((res) => ({
        //   id: res.id,
        //   name: res.name,
        //   thumb: res.logo_url,
        //   hero: res.background_url,
        //   eta: res.estimated_delivery_time,
        // })),
        map((res) => {
          const info = {
            id: res.id,
            name: res.name,
            thumb: res.logo_url,
            hero: res.background_url,
            eta: res.estimated_delivery_time,
            remaining: shopData.due
              ? dayjs(shopData.due).diff(undefined, 'minutes') + 1
              : null,
          };
          return { ...info, ...shopData };
        })
      )
    ),
    tap((x) => console.log(x)),
    scan((acc, cur) => acc.concat(cur), [] as ShopInfoUI[]),
    shareReplay(1)
  );

  length$ = this.list$.pipe(map((list) => list?.length ?? 0));

  username$ = this.authService.getUsername();

  ngOnInit(): void {}
}
