
export function list_users() {

    //Get list of total customers to loop through from localStorage
    const customerList = JSON.parse(localStorage.getItem('customerList'));

    //For every customer, get their data from local storage and add it to array for mapping
    if (customerList !== null) {
        var populatedCustomerList = []
        for (let customer of customerList) {
        populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))
        }
        return populatedCustomerList;
    } else {
        return [];
    };
}

