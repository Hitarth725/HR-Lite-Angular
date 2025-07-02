import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showAdminDropdown = false;
  admins: any[] = []; // fetched from localStorage

  roles = ['Admin', 'HR'];
  hobbiesList = ['Reading', 'Gaming', 'Traveling', 'Cooking'];
  toastMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],
      gender: ['Male', Validators.required],
      hobbies: this.fb.array([]),
      role: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      designation: ['', [Validators.required, this.noWhitespaceValidator]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      assignedAdmin: ['']
    },{ validators: this.passwordMatchValidator });

    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.showAdminDropdown = role === 'HR';
      const control = this.registerForm.get('assignedAdmin');
      if (this.showAdminDropdown) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
        control?.setValue('');
      }
      control?.updateValueAndValidity();
    });
  }

  get hobbiesFormArray(): FormArray {
    return this.registerForm.get('hobbies') as FormArray;
  }

  onCheckboxChange(e: any) {
    const array: FormArray = this.hobbiesFormArray;
    if (e.target.checked) {
      array.push(this.fb.control(e.target.value));
    } else {
      const index = array.controls.findIndex(x => x.value === e.target.value);
      if (index !== -1) array.removeAt(index);
    }
  }

  loadAdmins() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.admins = users.filter((u: any) => u.role === 'Admin');
  }

  onSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const formData = { ...this.registerForm.value };
  formData.email = formData.email.trim().toLowerCase(); // normalize

  const isEmailTaken = users.some((u: any) => u.email === formData.email);
  if (isEmailTaken) {
    this.showToast('Email already exists!');
    return;
  }
  formData.status = formData.role === 'HR' ? 'Inactive' : 'Active';
  formData.createdAt = new Date();

  users.push(formData);
  localStorage.setItem('users', JSON.stringify(users));
  this.showToast('Registration Successful!');
  this.registerForm.reset();
}


  noWhitespaceValidator(control: any) {
    const isWhitespace = (control.value || '').trim().length === 0;
    return !isWhitespace ? null : { whitespace: true };
  }

  passwordStrengthValidator(control: any) {
    const value = control.value || '';
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
    return valid ? null : { weakPassword: true };
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = '', 3000);
  }
}