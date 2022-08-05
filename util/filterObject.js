exports.filterObject = (obj, ...allowField) =>{
    const newObject = {}
    Object.keys(obj).forEach(el => {
        if(allowField.includes(el))
        newObject[el] = obj[el]
    })
    return newObject
}