import { Component, OnInit } from '@angular/core';
import { combineLatest, from } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mergeMap,
  scan,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { ShopStats } from '../models/shop-stats.model';
import { ShopApiService } from '../services/shop-api.service';

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
  constructor(private apiService: ShopApiService) {}

  // getRemainingTime(): Observable<string> {
  //   return this.list$.pipe(
  //     pluck('due'),
  //     switchMap((due: string) =>
  //       interval(30 * 1000).pipe(
  //         startWith(0),
  //         map(() => {
  //           const minutes =
  //             (new Date().valueOf() - new Date(due).valueOf()) / 1000 / 60;
  //           return `${minutes}분 남음`;
  //         })
  //       )
  //     )
  //   );
  // }

  list$ = this.apiService.getList().pipe(
    mergeMap((list) => from(list)),
    distinctUntilChanged(),
    mergeMap((shopId) =>
      combineLatest([
        this.apiService.getInfo(shopId).pipe(
          map((res) => ({
            name: res.name,
            thumb: res.logo_url,
            hero: res.background_url,
            eta: res.estimated_delivery_time,
          })),
          shareReplay(1)
        ),
        this.apiService.getStats(shopId),
      ]).pipe(map(([info, stats]) => ({ ...info, ...stats })))
    ),
    tap((x) => console.log(x)),
    scan((acc, cur) => acc.concat(cur), [] as ShopInfoUI[]),
    shareReplay(1)
  );

  ngOnInit(): void {}
}
