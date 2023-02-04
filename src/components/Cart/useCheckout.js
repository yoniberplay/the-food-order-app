import { useRef, useState } from "react";


const useCheckout = () => {

    const [formInputsValidity, setformInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
      });
    
      const nameInputRef = useRef();
      const streetInputRef = useRef();
      const postalCodeInputRef = useRef();
      const enteredCityInputRef = useRef();

      return {formInputsValidity,setformInputsValidity,nameInputRef,streetInputRef,postalCodeInputRef,enteredCityInputRef}
}

export default useCheckout;