
export function deposit(user, amount) {

    const userData = JSON.parse(localStorage.getItem(`user-${user}`));
    const new_balance = userData.balance + amount;
    
    return new_balance
}


