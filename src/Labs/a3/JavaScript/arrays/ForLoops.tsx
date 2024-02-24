function ForLoops(){
    let stringArray1 = ['string1', 'string3'];
    let stringArray2 = [];
    
    for (let i = 0;
         i < stringArray1.length;
         i++) {
      const string1 = stringArray1[i];
      stringArray2.push(
        string1.toUpperCase());
    }; 
    return(
        <>
            <h4>Looping through arrays</h4>
            stringArray2 = {stringArray2} 
        </>
    )
}
export default ForLoops;