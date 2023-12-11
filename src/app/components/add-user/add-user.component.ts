import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  public addUserForm: FormGroup;
  token: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.token = localStorage.getItem('token');
    console.log('this.token', this.token);
  }

  initForm(): void {
    this.addUserForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator.bind(this),
    });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      // Form is valid, handle the submission logic here
      const payload = this.transformToApiFormat(this.addUserForm.value);
      console.log('Form submitted:', payload);
      try {
        this.userService.addUser(payload, this.token).subscribe(
          response => {
            if (response.statusCode == 201
              && response.statusMessage == 'User created successfully!') {
              this.toastr.success(response.statusMessage, "");
              // location.reload();
              this.addUserForm.reset();
              this.router.navigate(['/userslist'], { replaceUrl: true });
            } else if (response.statusCode == 409
              && response.statusMessage == 'User exists with same username') {
              console.log();
              this.toastr.success(response.statusMessage, "");
            }
          },
          error => {
            console.error('Error adding user:', error);
          }
        );
      } catch (error) {
        console.log(error);

      }
    } else {
      // Form is invalid, display error messages or handle accordingly
      console.log('Form is invalid. Please check the fields.');
    }
  }
  transformToApiFormat(userData: any): any {
    return {
      username: userData.username,
      email: userData.email,
      enabled: true,
      firstName: userData.firstname,
      lastName: userData.lastname,
      credentials: [
        {
          type: 'password',
          value: userData.password,
          temporary: false,
        }
      ]
    };
  }
}