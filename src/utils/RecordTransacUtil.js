import {getISOdate} from './ISODateUtil'
import {format_idNumber} from './UserIdUtil'


export function record_transaction(customerData, amount, transac_type, transac_count, user) {
    
    const transactions = customerData.transactions;
    const transacId = format_idNumber(transac_count + 1); 
    const today = getISOdate();
    let transaction_details = {}

    if (transac_type === 'sent') {
        transaction_details = {
            date: today,
            amount: amount,
            transaction: transac_type, //can be deposit, withdrawal, send, receive
            transactionId: transacId,
            notes: `To: #${user}`
        }
    } else if (transac_type === 'received'){
        transaction_details = {
            date: today,
            amount: amount,
            transaction: transac_type, //can be deposit, withdrawal, send, receive
            transactionId: transacId,
            notes: `From: #${user}`
        }
    } else {
        transaction_details = {
            date: today,
            amount: amount,
            transaction: transac_type, //can be deposit, withdrawal, send, receive
            transactionId: transacId
        }
    }
    transactions.push(transaction_details);
    return {
        new_transactions: transactions,
        latest_transaction: {
            ...transaction_details,
            user: customerData.accNum
        }
    }

}

