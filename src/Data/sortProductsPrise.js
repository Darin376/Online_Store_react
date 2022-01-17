export const priceSortingLess = (obj)=> {
    let newObg = {
        ...obj,
    }
   newObg.products=newObg.products.concat().sort((a, b) => a.price.formatted > b.price.formatted ? 1 : -1);
    return newObg.products
}
export const priceSortingMore = (obj)=> {
    let newObg = {
        ...obj
    }
    newObg.products=newObg.products.concat().sort((a, b) => a.price.formatted < b.price.formatted ? 1 : -1);
       return newObg.products
}
 
export const pagesObgProducts = (arr)=> {
    let initinalState = {
        productQuantityPage:4,
        products:arr.concat(),
        productsNew:[],
        productsLength:arr.length,
        quantityPages:[]
    };
    let pageCount =  Math.ceil(initinalState.productsLength/initinalState.productQuantityPage);

    for (let i = 0; i <initinalState.productsLength; i+=initinalState.productQuantityPage) {
        initinalState.productsNew.push(initinalState.products.slice(i, i +initinalState.productQuantityPage));
    };
    for (let i=1;i<=pageCount;i++) {
        initinalState.quantityPages.push(i)
    };

return initinalState
}