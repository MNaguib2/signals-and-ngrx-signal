import { AfterContentInit, Component, contentChild, contentChildren, ElementRef, Input, input, model, Signal, viewChild, viewChildren } from '@angular/core';

@Component({
  selector: 'app-child-component',
  standalone: true,
  imports: [],
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.scss'
})
export class ChildComponentComponent implements AfterContentInit {
  // Accept signals as inputs
  @Input() firstName!: Signal<string>;
  @Input() lastName!: Signal<string>;
  message = input.required<string>();

  // Access a single projected element with the class `.single-item`
  // @ContentChild('singleItem', { static: true }) singleItem!: ElementRef;
  singleItem = contentChild('singleItem', {read: ElementRef});

  // Access multiple projected elements with the class `.multiple-items`
  // @ContentChildren('multipleItems', { descendants: true }) multipleItems!: QueryList<ElementRef>;
  multipleItems = contentChildren('multipleItems', {read: ElementRef, descendants: true});

  ngAfterContentInit() {
    // Log or manipulate the single item
    const singleChild = this.singleItem();
    const MultiChild = this.multipleItems();

    if (singleChild) {
      console.log('Single Item Content:', singleChild.nativeElement.textContent);
    }
    if(MultiChild){
    // Log or manipulate the multiple items
    this.multipleItems().forEach((item, index) => {
      console.log(`Multiple Item ${index + 1} Content:`, item.nativeElement.textContent);
    });
  }
  }
}
