
export function send(from_user, to_user, amount) {
    const from_userData = JSON.parse(localStorage.getItem(`user-${from_user}`));
    const from_newBalance = from_userData.balance - amount;
    const to_userData = JSON.parse(localStorage.getItem(`user-${to_user}`));
    const to_newBalance = to_userData.balance + amount;
    
    return {
        from_newBalance: from_newBalance,
        to_newBalance: to_newBalance
    }
}

