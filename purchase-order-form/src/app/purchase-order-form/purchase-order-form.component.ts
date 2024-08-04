import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.css']
})
export class PurchaseOrderFormComponent implements OnInit {
  poForm: FormGroup;
  clients = ['Collabera - Collabera Inc'];
  currencies = ['USD - Dollars ($)'];
  jobs = ['Application Development', 'Business Administrator'];
  talents = [
    { name: 'Monika Goyal Test', selected: false },
    { name: 'Shaili Khatri', selected: false },
    { name: 'Business Administrator', selected: false }
  ];

  constructor(private fb: FormBuilder) {
    this.poForm = this.fb.group({
      clientName: ['', Validators.required],
      poType: ['', Validators.required],
      poNumber: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\\s\\-]+')]],
      receivedOn: ['', Validators.required],
      receivedFromName: ['', Validators.required],
      receivedFromEmail: ['', [Validators.required, Validators.email]],
      poStartDate: ['', Validators.required],
      poEndDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.max(99999)]],
      currency: ['', Validators.required],
      jobTitleReqName: ['', Validators.required],
      reqId: [''],
      talents: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.poForm.get('jobTitleReqName')?.valueChanges.subscribe((value) => {
      this.poForm.get('reqId')?.setValue('REQ-' + value);
    });
  }

  get talentsArray() {
    return this.poForm.get('talents') as FormArray;
  }

  addTalent() {
    const talentGroup = this.fb.group({
      name: ['New Talent'],
      selected: [false],
      contractDuration: [''],
      billRate: [''],
      currency: [''],
      stdTimeBR: [''],
      overTimeBR: ['']
    });
    this.talentsArray.push(talentGroup);
  }

  submitForm() {
    if (this.poForm.valid) {
      console.log('Form Submitted!', this.poForm.value);
      alert('Form submitted successfully!');
    }
  }

  resetForm() {
    this.poForm.reset();
    this.talentsArray.clear();
    this.talentsArray.push(this.fb.group({
      name: 'Monika Goyal Test',
      selected: [false],
      contractDuration: [''],
      billRate: [''],
      currency: [''],
      stdTimeBR: [''],
      overTimeBR: ['']
    }));
    this.talentsArray.push(this.fb.group({
      name: 'Shaili Khatri',
      selected: [false],
      contractDuration: [''],
      billRate: [''],
      currency: [''],
      stdTimeBR: [''],
      overTimeBR: ['']
    }));
    this.talentsArray.push(this.fb.group({
      name: 'Business Administrator',
      selected: [false],
      contractDuration: [''],
      billRate: [''],
      currency: [''],
      stdTimeBR: [''],
      overTimeBR: ['']
    }));
  }
}
