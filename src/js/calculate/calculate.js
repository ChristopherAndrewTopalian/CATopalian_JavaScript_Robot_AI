// calculate.js

function calculate(input)
{
    try
    {
        return eval(input);
    }
    catch(error)
    {
        return null;
    }
}