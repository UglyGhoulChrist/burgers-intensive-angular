type TCurrency = '$' | '₽' | 'BIN' | '€' | '¥'

interface IBurgerData {
    id: number,
    image: string,
    title: string,
    text: string,
    price: number,
    basePrice: number,
    currency: TCurrency,
    weight: number,
}

export type { TCurrency, IBurgerData }