// user-list.component.ts
import { Component, computed, effect, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { UserService } from '../UserList.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  private userService = inject(UserService);

  // Convert the Observable from the service into a Signal
  usersSignal: any;

  // Optional: Adding error handling with a separate error signal
  errorSignal = computed(() => {
    if (this.usersSignal && !this.usersSignal().status && this.usersSignal().message) {
      return this.usersSignal().message[0]
    }
  });
  errorSignalToObservable = toObservable(this.errorSignal);
  _signal = signal<number | null>(null);
  signal_to_observable = toObservable(this._signal);
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this._signal.set(0);
      // Subscribe to errors if needed
      // this.userService.getUsers().subscribe({
      //   error: (err) => this.errorSignal.set('Failed to fetch users'),
      // });
      this.usersSignal = toSignal(this.userService.getUsers(), { initialValue: [], manualCleanup: false });
      this.userService.getInterval().pipe(take(5)).subscribe(data => {
        // console.log(data);
      });
      this.errorSignalToObservable.subscribe(data => {
        console.log(data);
      })
      effect(() => {
        // console.log('console from effect' , this.usersSignal());
      })
      this.signal_to_observable.subscribe(data => {
        console.log(data);
      });


      let count = 0;
      const maxCount = 5; // Number of times you want the interval to run

      const intervalId = setInterval(() => {
        console.log("This is interval number:", count + 1);

        count++;
        this._signal.update((prev: number | null) => (prev || 0) + 1);
        if (count >= maxCount) {
          clearInterval(intervalId);
          console.log("Interval stopped.");
        }
      }, 2000); // Interval time in milliseconds (2000ms = 2s)
    }
  }
}
