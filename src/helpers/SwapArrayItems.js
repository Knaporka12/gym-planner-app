const swapArrayItems = (array, start, end, direction = 'right') => {

    let temp;

    if (direction === 'right'){

        for (let i = start; i < end; i++) {
            
            temp = {...array[i]};
            array[i] = {...array[i + 1]};
            array[i + 1] = {...temp};
        
        }

    } else {

        for (let i = start; i > end; i--) {
            
            temp = {...array[i]};
            array[i] = {...array[i - 1]};
            array[i - 1] = {...temp};
        
        }
    }

    return array;

}

export default swapArrayItems;