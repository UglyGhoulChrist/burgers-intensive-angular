import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import burgersList from 'data/burgersList'
import { IBurgerData, TCurrency } from 'interfaces/interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    form = this.fb.group({
        order: ['', Validators.required],
        name: ['', Validators.required],
        phone: ['', Validators.required],
    })

    productsData: IBurgerData[] = structuredClone(burgersList)

    currentCurrency = '$'

    constructor(private fb: FormBuilder) { }

    scrollTo(target: HTMLElement, burger?: any): void {
        target.scrollIntoView({ behavior: 'smooth' })
        if (burger) {
            this.form.patchValue({ order: `${burger.title} ( ${burger.price} ${this.currentCurrency} )` });
        }
    }

    confirmOrder() {

        if (this.form.valid) {
            alert('Спасибо за заказ! Скоро мы свяжемся с Вами по телефону.')
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

        this.productsData.forEach((product) => product.price = product.basePrice * coefficient)
    }
}
