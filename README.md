# SignalsAndNgrxSignal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# what are signals ?
  A signal is a wrapper around a value that notifies interested consumers when that value changes. Signals can contain any value, from primitives to complex data structures.

  You read a signal's value by calling its getter function, which allows Angular to track where the signal is used.

  Signals may be either writable or read-only.


# dependency translate
  npm install @ngx-translate/core --save
  npm install @ngx-translate/http-loader --save

# type signal
  WritableSignal
  ModelSignal
  InputSignal
--- Differences between model() and input()
Both input() and model() functions are ways to define signal-based inputs in Angular, but they differ in a few ways:

model() defines both an input and an output. The output's name is always the name of the input suffixed with Change to support two-way bindings. It will be up to the consumer of your directive to decide if they want to use just the input, just the output, or both.
ModelSignal is a WritableSignal which means that its value can be changed from anywhere using the set and update methods. When a new value is assigned, the ModelSignal will emit to its output. This is different from InputSignal which is read-only and can only be changed through the template.
Model inputs do not support input transforms while signal inputs do.


-----------------------


In Angular, model() inputs allow two-way binding directly in component properties. This enables synchronized updates between the component and its parent. In contrast, standard @Input() properties in Angular only support one-way binding, sending data from the parent to the child but not back. This makes model() ideal for form controls and dynamic components where state needs to be shared bidirectionally. For more details, check the
