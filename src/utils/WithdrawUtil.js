
export function withdraw(user, amount) {

    const userData = JSON.parse(localStorage.getItem(`user-${user}`));
    const new_balance = userData.balance - amount;
    
    return new_balance
}

