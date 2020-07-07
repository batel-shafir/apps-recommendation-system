export const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

export const validateDate = (date) => {
    const newdate = date.split("-").reverse().join("-");
    const re = /^\d{1,2}\-\d{1,2}\-\d{4}$/;

    if(newdate === '' || newdate !='' && !newdate.match(re)) {
        alert("Invalid date format: " + newdate);
        return false;
    }
    return true; 
}
export const validateName = (name) => {
    if(name == '') {
        alert("Please enter your name");
        return false;
    }
    return true; 
  }

export  const isValid = (name,email,date) => {
    return (validateName(name) && ValidateEmail(email) && validateDate(date)) 
}