import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import burgersList from 'data/burgersList'
import { IBurgerData, IBurgerDataBackend, TCurrency } from 'interfaces/interfaces';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    // Валидация формы
    form = this.fb.group({
        order: ['', Validators.required],
        name: ['', Validators.required],
        phone: ['', Validators.required],
    })

    productsData: any
    // productsData: IBurgerData[] = structuredClone(burgersList)

    currentCurrency = '$'

    constructor(private fb: FormBuilder, private appService: AppService) { }

    ngOnInit() {
        this.appService.getData().subscribe(data => {
            this.productsData = data
        })
    }

    scrollTo(target: HTMLElement, burger?: any): void {
        target.scrollIntoView({ behavior: 'smooth' })
        if (burger) {
            this.form.patchValue({ order: `${burger.title} ( ${burger.price} ${this.currentCurrency} )` });
        }
    }

    confirmOrder() {

        if (this.form.valid) {

            console.log(this.form.value);

            this.appService.sendOrder(this.form.value).subscribe(
                {
                    next: (responce: any) => {
                        alert(responce.message)
                        console.log(responce.message);

                    },
                    error: (responce: any) => {
                        alert(responce.error.message)
                    },
                }
            )
            this.form.reset()
        }
    }

    changeCurrency() {
        console.log('click');

        let newCurrency: TCurrency
        let coefficient: number

        // Проверяю валюту и задаю новую
        switch (this.currentCurrency) {
            case '$':
                newCurrency = '₽'
                coefficient = 90
                break
            case '₽':
                newCurrency = 'BIN'
                coefficient = 3
                break
            case 'BIN':
                newCurrency = '€'
                coefficient = .9
                break
            case '€':
                newCurrency = '¥'
                coefficient = 7
                break
            case '¥':
                newCurrency = '$'
                coefficient = 1
                break
            default:
                newCurrency = '$'
                coefficient = 1
                break
        }
        this.currentCurrency = newCurrency

        this.productsData.forEach((product: { price: number; basePrice: number; }) => product.price = product.basePrice * coefficient)
    }
}
