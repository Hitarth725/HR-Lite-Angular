import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

export interface Employee {
  name: string;
  gender: string;
  role: string;
  salary: number;
  contact: string;
  hobbies: string[];
  addedBy: string; // HR email
  createdAt: Date;
}

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
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
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    employees.push({
      ...this.memberForm.value,
      addedBy: this.currentUser.email,
      createdAt: new Date()
    });

    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Employee added!');
    this.memberForm.reset();
  }
}
