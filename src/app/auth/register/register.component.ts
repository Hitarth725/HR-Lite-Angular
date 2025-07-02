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
  admins: any[] = [];
  isSubmitting = false;

  roles = ['Admin', 'HR'];
  hobbiesList = ['Reading', 'Gaming', 'Traveling', 'Cooking'];
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

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
    }, { validators: this.passwordMatchValidator });

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

    // Password strength indicator
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      // This will trigger the UI updates for password strength
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

    this.isSubmitting = true;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const formData = { ...this.registerForm.value };
    formData.email = formData.email.trim().toLowerCase();

    const isEmailTaken = users.some((u: any) => u.email === formData.email);
    if (isEmailTaken) {
      this.showToast('Email already exists!', 'error');
      this.isSubmitting = false;
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      formData.status = formData.role === 'HR' ? 'Inactive' : 'Active';
      formData.createdAt = new Date();

      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      this.showToast('Registration Successful!', 'success');
      this.registerForm.reset({
        gender: 'Male'
      });
      this.isSubmitting = false;
    }, 1500);
  }

  // Password strength indicator methods
  getPasswordStrength(): number {
    const password = this.registerForm.get('password')?.value || '';
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    strength += Math.min(password.length / 6 * 25, 25);
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains number
    if (/\d/.test(password)) strength += 25;
    
    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return Math.min(strength, 100);
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'bg-danger';
    if (strength < 70) return 'bg-warning';
    return 'bg-success';
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

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3000);
  }
}