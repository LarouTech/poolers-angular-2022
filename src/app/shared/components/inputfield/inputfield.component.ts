import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormGroup, NgControl } from '@angular/forms';
import { InputAutoCompleteTypes, InputTypes } from './input-emun';

@Component({
  selector: 'inputfield',
  templateUrl: './inputfield.component.html',
  styleUrls: ['./inputfield.component.scss'],
})
export class InputfieldComponent implements OnInit, ControlValueAccessor {
  @Input() name!: string;
  @Input() type!: InputTypes | string;
  @Input() label!: string;
  @Input() value?: number | string;
  @Input() icon?: string;
  @Input() disabled?: boolean = false;
  @Input() form!: FormGroup;
  @Input() message!: string;
  @Input() autocomplete!: InputAutoCompleteTypes;
  public errorMessages = new Map();

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
    this.errorMessages.set('required', () => 'error test');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.autocomplete ? this.autocomplete : InputAutoCompleteTypes.OFF;
  }

  //CONTROL VALUE ACCESSOR SETUP
  get inputValue(): any {
    return this.value;
  }

  set inputValue(value: any) {
    if (value !== this.inputValue) {
      this.value = value;
      this.onChangeFn(value);
    }
  }

  public onChangeFn = (_: any) => {};
  public onTouchedFn = () => {};

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {}

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public onChange() {
    this.onChangeFn(this.value);
  }

  //VALIDATION
  public get invalid(): boolean {
    return this.control ? this.control.invalid! : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched)! : false;
  }

  public get errors(): Array<string> {
    if (!this.control) {
      return [];
    }

    const { errors } = this.control;
    return Object.keys(errors!).map((key) =>
      this.errorMessages.has(key)
        ? this.errorMessages.get(key)()
        : <string>errors![key] || key
    );
  }
}
