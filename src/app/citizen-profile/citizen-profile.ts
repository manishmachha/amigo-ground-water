import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitizenProfileService } from '../services/citizen-portal-service';
import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { CommonModule } from '@angular/common';

type Tab = 'personal' | 'contact' | 'documents' | 'security' | 'notifications';


@Component({
  selector: 'app-citizen-profile',
  standalone:true,
  imports: [AmigoFormComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './citizen-profile.html',
  styleUrl: './citizen-profile.css',
})
export class CitizenProfile implements OnInit {

   formIdMap: Record<Tab, string> = {
    personal: 'b245b347-60b6-4798-9cb7-04860d9b7393',
    contact: '58d14e21-ab6d-462c-be52-7e3fb1fc8d59',
    documents: '800aeaef-1870-4c92-b0d7-ee1ab12da2d7',
    security: '2e4c0744-4a7c-4a33-b1ad-ee2dffb23b97 ',
    notifications: '614593df-46c1-40ca-94c2-9f38be704319',
  };


   get currentFormId(): string {
    return this.formIdMap[this.activeTab];
  }
  onFormSubmitted(event: any) {
    
    console.log('submitted event:', event);
  }

  onFormSubmitFailed(err: any) {
    console.error('submit failed:', err);
  }


  activeTab: 'personal' | 'contact' | 'documents' | 'security' | 'notifications' = 'personal';
  editMode = {
    personal: false,
    contact: false,
    documents: false,
    security: false,
    notifications: false
  };

  personalForm!: FormGroup;
  contactForm!: FormGroup;
  passwordForm!: FormGroup;
  notificationForm!: FormGroup;



  fb = inject(FormBuilder);
  profileService = inject(CitizenProfileService);

   ngOnInit(): void {
    this.loadProfileDetails();
  }

  loadProfileDetails() {
    this.profileService.personalInfo().subscribe({
      next: (res: any) => {
        console.log('Profile data:', res);

        // 🔹 Patch PERSONAL form
        this.personalForm.patchValue({
          fullName: res.data.user.fullName,
          dob: res.data.user.dob,
          gender: res.data.user.gender,
          aadhaar: res.data.user.idProofNumber,
          pan: res.data.user.pan,
        });

        this.contactForm.patchValue({
          email: res.data.user.email,
          mobileNumber:res.data.user.mobileNumber,
        address1: res.data.user.mandal,   
        address2: res.data.user.street,    
        city: res.data.user.village,
        district: res.data.user.district,
        pinCode: res.data.user.pinCode,
        });
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }


  private initForms() {
    this.personalForm = this.fb.group({
      fullName: [''],
      dob: [''],
      gender: [''],
      aadhaar: [''],
      pan: [''],
    });

    this.contactForm = this.fb.group({
      email: [''],
      mobileNumber: [''],
      altMobile: [''],
      whatsapp: [' '],
      address1: ['H.No. 12-34/A, Street No. 5'],
      address2: ['Kukatpally'],
      city: [''],
      district: [''],
      state: ['Telangana'],
      pinCode: [''],
    });

    this.passwordForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });

    this.notificationForm = this.fb.group({
      appEmail: [true],
      appSMS: [true],
      appWhatsapp: [true],
      payEmail: [true],
      paySMS: [true],
      compEmail: [true],
      compWhatsapp: [true],
      compPortal: [true],
    });
  }

  switchTab(tab: Tab) {
    this.activeTab = tab;
    this.loadProfileDetails();
  }

  enableEdit(tab: keyof typeof this.editMode) {
    this.editMode[tab] = true;
  }
  cancelEdit(tab: keyof typeof this.editMode) {
    this.editMode[tab] = false;
  }

  saveChanges(tab: keyof typeof this.editMode) {
    // API / amigo-form submit already handled
    this.editMode[tab] = false;
  }

}
