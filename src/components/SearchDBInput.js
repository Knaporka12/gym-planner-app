import { useState } from "react";

const SearchDBInput = ({input, setInput, setSearch}) => {

    const [isInputValid, setIsInputValid] = useState(true);

    const handleClick = (e) => {

        e.preventDefault();

        if (input.trim().length >= 3){
            setSearch(input.trim());
            setIsInputValid(true);
        } else setIsInputValid(false);
    }

    return (

    <>

        <form className='exercises__form'>

            <input
                className='exercises__input'
                type="text"
                value={input}
                onChange={(e) => {setInput(e.target.value)}}
                placeholder='Type in body part, equipment or exercise name' 
            />

            <button type='submit' className='exercises__btn-submit' onClick={(e) => {handleClick(e)}}>View results</button>

        </form>

        {!isInputValid && <p className="exercises__para-form-invalid">Provide at least 3 characters</p>}
        
    </>

    )

}

export default SearchDBInput
