export default function formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";  // toFixed --> how many decimal points u want
}