export function format_idNumber(accNum) {
    const userId =  String(accNum).padStart(5, '0')
    
    return userId
}