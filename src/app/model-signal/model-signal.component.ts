import { Component, model } from '@angular/core';

@Component({
  selector: 'app-model-signal',
  standalone: true,
  imports: [],
  templateUrl: './model-signal.component.html',
  styleUrl: './model-signal.component.scss'
})
export class ModelSignalComponent {
  checked = model(false);  // false as default value

  toggle() {
    this.checked.set(!this.checked());  // Toggles the checked state
  }
}
