
export function getLocalDate(ISOdate) {
    const d = new Date(ISOdate);
    return d.toLocaleString('en-US')
}
