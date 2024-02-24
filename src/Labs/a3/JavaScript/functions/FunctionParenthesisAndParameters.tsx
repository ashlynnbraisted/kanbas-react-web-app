function FunctionParenthesisAndParameters(){
    const square  = (a: number) => a * a;
    const plusOne = (a: number) => a + 1;
    const twoSquared = square(2);
    const threePlusOne = plusOne(3);

    return(
        <>
            <h4>Parenthesis and parameters</h4>
            twoSquared = {twoSquared} <br />
            square(2) = {square(2)} <br />
            threePlusOne = {threePlusOne} <br />
            plusOne(3) = {plusOne(3)} <br />
        </>
    )
}
export default FunctionParenthesisAndParameters;