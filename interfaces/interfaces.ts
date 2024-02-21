type TCurrency = '$' | '₽' | 'BIN' | '€' | '¥'

interface IBurgerData {
    image: string,
    title: string,
    text: string,
    price: number,
    basePrice: number,
    grams: number,
}

interface IBurgerDataBackend {
    image: string,
    title: string,
    text: string,
    price: number,
    basePrice: number,
    grams: number,
}

export type { TCurrency, IBurgerData, IBurgerDataBackend }