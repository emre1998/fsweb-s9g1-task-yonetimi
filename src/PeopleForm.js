import React from "react";
import {useForm} from "react-hook-form";

 const PeopleForm =({kisiler,submitFn})=>{
  const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:{isim:""}});

  const onSubmit = (data)=>{
    const {isim}= data;
    submitFn(isim);
  };
  
  const validateIsim = (value)=>{
    if(kisiler.includes(value)) {
      return "Bu isim daha önce eklenmiş";
    }
    if(value.length<3){
      return "En az 3 karakter olmalıdır";
    }
    return true;
  };
 
  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="isim">
          İsim
        </label>
        <input
          className="input-text"
          id="isim"
          name="isim"
          type="text"
          {...register("isim",{validate:validateIsim})}
        />
        {errors.isim && <p className="input-error">{errors.isim.message}</p>}
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={kisiler.length === 0 || errors.kisiler} 
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
