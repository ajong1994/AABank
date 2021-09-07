
export function get_balance(userData) {

    const formatter = new Intl.NumberFormat('en-ES', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    })

    return formatter.format(userData.balance)

}

