const displayVNDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-VN',{
        style : "currency",
        currency : 'VND',
        minimumFractionDigits : 3
    })

    return formatter.format(num)

}

export default displayVNDCurrency