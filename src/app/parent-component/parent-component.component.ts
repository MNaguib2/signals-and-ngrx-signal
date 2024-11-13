import { Component, model, signal, WritableSignal } from '@angular/core';
import { ChildComponentComponent } from "../child-component/child-component.component";
import { ModelSignalComponent } from "../model-signal/model-signal.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-component',
  standalone: true,
  imports: [ChildComponentComponent, ModelSignalComponent, FormsModule],
  templateUrl: './parent-component.component.html',
  styleUrl: './parent-component.component.scss'
})
export class ParentComponentComponent {
  // Define signals for first and last names
  firstName: WritableSignal<string> = signal('John');
  lastName: WritableSignal<string> = signal('Doe')
  message: string = 'any thing to say';

  setValueFirstName(event: any){
    this.firstName.set(event.target['value'])
  }
  setValueLastName(event: any){
    this.lastName.set(event.target['value'])
  }
  isChecked = false;  // Initialize the checkbox state

  toggle() {
    this.isChecked = !this.isChecked;
  }
}
