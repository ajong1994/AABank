
export function formatMoney(amount) {

    const formatter = new Intl.NumberFormat('en-ES', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    })
    
    return formatter.format(amount)

}

