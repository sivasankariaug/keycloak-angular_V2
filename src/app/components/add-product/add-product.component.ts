import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  // Define an EventEmitter
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      material: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      numberOfComponents: ['', [Validators.required]],
    });
    // console.log();

  }
  onSubmit() {
    if (this.addProductForm.invalid) {
      return;
    }
    console.log(this.addProductForm.value);
    try {
      this.productService.addProduct(localStorage.getItem('token'), this.addProductForm.value).subscribe(res => {
        if (res.statusCode == 201
          && res.statusMessage == 'product created successfully') {
          this.toastr.success(res.statusMessage, "");
          // location.reload();
          this.addProductForm.reset();
          this.productService.updateProductList();
          this.closePopup.emit();
        } else if (res.statusCode == 409
          && res.statusMessage == 'failed') {
          console.log();
          this.toastr.success(res.statusMessage, "");
        }
      });
    } catch (error) {
      console.log('error adding product', error);
    }
  }
}
