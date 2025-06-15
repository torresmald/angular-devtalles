import {
  Product,
  Gender,
} from '@/products/interfaces/product-response.interface';
import { ProductSliderComponent } from '@/store-front/components/product-slider/product-slider.component';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FormUtils } from '@/admin/helpers/form-helper';
import { ProductsService } from '@/products/services/products.service';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductSliderComponent,
    ReactiveFormsModule,
    AlertComponent,
    TitleCasePipe,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.productForm.reset(this.product());
    const tags = this.product().tags.join(',');
    this.productForm.patchValue({ tags });
  }
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private productsService = inject(ProductsService);
  public alertMessage = signal('');
  public filesPreview = signal<string[]>([]);
  public fileList = signal<FileList | null>(null);

  public productImages = computed(() => {
    if (this.filesPreview().length === 0) return this.product().images;
    return [
      ...this.product().images,
      ...this.filesPreview(),
    ];
  });

  public product = input.required<Product>();
  public isUpdatedProduct = signal(false);

  public sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  public genders = ['men', 'kid', 'women', 'unisex'];
  public formUtils = FormUtils;

  public productForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [[''], [Validators.required]],
    images: [''],
    tags: ['', [Validators.required, Validators.minLength(3)]],
    gender: [
      '',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  public updateFormField(field: 'gender' | 'sizes', value: string) {
    const control = this.productForm.get(field);
    if (!control) return;
    if (field === 'gender') {
      control.setValue(value);
      return;
    }
    if (field === 'sizes') {
      const sizes = control.value as string[];
      if (sizes.includes(value)) {
        control.setValue(sizes.filter((s) => s !== value));
      } else {
        control.setValue([...sizes, value]);
      }
    }
  }

  public getGenderClass(gender: string): string {
    const selected = this.productForm.value.gender === gender;

    if (!selected) return '';

    switch (gender) {
      case Gender.Men:
        return 'btn-accent';
      case Gender.Women:
        return 'btn-primary';
      case Gender.Kid:
        return 'btn-warning';
      case Gender.Unisex:
        return 'btn-secondary';
      default:
        return '';
    }
  }

  public onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const formValue = this.productForm.value;
    const tags = formValue.tags.split(',').map((tag: string) => tag.trim());
    const productLike: Partial<Product> = {
      ...formValue,
      tags,
    };
    this.productsService
      .updateCreateProduct(this.product().id, productLike, this.fileList())
      .subscribe((response) => {
        if (response) {
          this.showAlert(response);
        }
      });
  }

  private showAlert(response: string) {
    this.isUpdatedProduct.set(true);
    this.alertMessage.set(response);
    setTimeout(() => {
      this.isUpdatedProduct.set(false);
      this.router.navigate(['/admin/products']);
    }, 2000);
  }

  public onFilesChanged(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.fileList.set(fileList ?? null);

    const files = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );
    this.filesPreview.set(files);
  }
}
