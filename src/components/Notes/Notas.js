const notaArray = [
    {
        id:1,
        products: [ "2cost,2pan","2mac,2sur","1con,2mid"]
    },
    {
        id:2,
        products: [ "1con,2mid"]
    },
    {
        id:3,
        products: [ "1con,2mid"]
    },
    {
        id:4,
        products: [ "1con,2mid"]
    },
    {
        id:3,
        products: [ "1con,2mid"]
    },
    {
        id:4,
        products: [ "1con,2mid"]
    },
    {
        id:3,
        products: [ "1con,2mid"]
    },
    {
        id:4,
        products: [ "1con,2mid"]
    },
    {
        id:3,
        products: [ "1con,2mid"]
    },
    {
        id:4,
        products: [ "1con,2mid"]
    },
    
    
]

let cuenta = notaArray.map((product) => {
    return product.id
})

export { notaArray,cuenta };

