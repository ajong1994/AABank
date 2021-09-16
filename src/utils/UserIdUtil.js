export function format_idNumber(accNum) {
    const userId =  String(accNum).padStart(16, '0')
    
    return userId
}