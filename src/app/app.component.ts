import { Component, computed, effect, ElementRef, Inject, inject, OnInit, PLATFORM_ID, Signal, signal, TemplateRef, viewChild, viewChildren, ViewContainerRef } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TranslateService]
})
export class AppComponent implements OnInit {
  title = 'signals-and-ngrx-signal';

  /**
   * By default, toSignal automatically unsubscribes from the Observable when the component or service that creates it is destroyed.

   * To override this behavior, you can pass the manualCleanup option. You can use this setting for Observables that complete themselves naturally.
   */
  count = signal(0);
  constructor(private vcrf: ViewContainerRef, private _TranslateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this._TranslateService.addLangs(['ar', 'en']);
      this._TranslateService.setDefaultLang('en');
      this.count.set(3);
      console.log(environment.type);

      /**
       * Signals are useful because they notify interested consumers when they change.
       * An effect is an operation that runs whenever one or more signal values change.
       * You can create an effect with the effect function
       * Effects always run at least once. When an effect runs, it tracks any signal value reads.
       *  Whenever any of these signal values change, the effect runs again.
       * Similar to computed signals, effects keep track of their dependencies dynamically, and only track signals which were read in the most recent execution.
       */
      effect(() => {
        const double = this.count() * 2
        console.log(double);
      });
    }
  }
  doubleCount: Signal<number> = computed(() => {
    const double = this.count() * 2
    return double;
  });
  changeLang(lang: string) {
    this._TranslateService.use(lang);
  }
  increment() {
    this.count.update((prev) => prev + 1);
  }
  decrement() {
    this.count.update((prev) => prev - 1);
  }

  showCount = signal(false);
  count_overlap_signal = signal(0);
  conditionalCount = computed(() => {
    if (this.showCount()) {
      return `The count is ${this.count_overlap_signal()}.`;
    } else {
      return 'Nothing to see here!';
    }
  });
  incrementInterrupted() {
    this.count_overlap_signal.update((prev) => prev + 1);
  }
  decrementInterrupted() {
    this.count_overlap_signal.update((prev) => prev - 1);
  }
  toggleInterrupted() {
    this.showCount.update((prev) => !prev)
  }

  counterObservable: any;
  // Get a `Signal` representing the `counterObservable`'s value.
  counter: any;
  viewChild = viewChild('interrupted_viewChild', { read: ElementRef })
  viewChildren = viewChildren('interrupted_viewChildren', { read: ElementRef })

  element = viewChild('viewChild', { read: TemplateRef })

  viewContainer = viewChild('container', { read: ViewContainerRef })

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('viewChild', this.viewChild());
      console.log('element', this.element());
      console.log('viewChildren', this.viewChildren());
    }
    this.initializeDynamicView();
  }
  initializeDynamicView() {
    const templateRef = this.element();
    const viewContainer = this.viewContainer();
    if (templateRef && viewContainer) {
        viewContainer.clear();
        viewContainer.createEmbeddedView(templateRef);
        this.vcrf.createEmbeddedView(templateRef);
    }
}
}

