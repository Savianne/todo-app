const list = [
    'apple', 'grapes', 'banana', 'orange','pneapple'
]

const handleMoveUp = (list, currentPos) => {
    const cut = list.splice(currentPos, 1)[0];
    list.splice(currentPos- 1, 0, cut);
    return list;
}

console.log(handleMoveUp(list, 2));