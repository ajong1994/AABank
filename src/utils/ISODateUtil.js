
import {getLocalDate} from './LocalDateUtil'

export function getISOdate() {

    const today = new Date (Date.now());
    console.log(getLocalDate(today))
    return today.toISOString()

}


