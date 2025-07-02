import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  memberForm!: FormGroup;
  roles = ['Team Leader', 'Machine Operator', 'HR Executive'];
  hobbiesList = ['Reading', 'Gaming', 'Traveling'];
  currentUser: any;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.initForm();
  }

  initForm() {
    this.memberForm = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['Male', Validators.required],
      role: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      hobbies: this.fb.array([])
    });
  }

  get hobbiesFormArray(): FormArray {
    return this.memberForm.get('hobbies') as FormArray;
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

  onSubmit() {
    if (this.memberForm.invalid || this.isSubmitting) {
      this.memberForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call delay
    setTimeout(() => {
      const employees = JSON.parse(localStorage.getItem('employees') || '[]');
      employees.push({
        ...this.memberForm.value,
        addedBy: this.currentUser.email,
        createdAt: new Date()
      });

      localStorage.setItem('employees', JSON.stringify(employees));
      this.isSubmitting = false;
      this.router.navigate(['/user-dashboard']);
    }, 1000);
  }
}