export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newOnjProps: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newOnjProps}
        }
        return u
    })
}
