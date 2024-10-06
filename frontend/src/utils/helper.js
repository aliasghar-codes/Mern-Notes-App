
export const sliceName = (name) => {
    if(!name){
        return "";
    }

    const nameArray = name.split(" ");
    let chars = "";

    for(let i of nameArray){
        chars += i[0];
    }

    return chars;
}