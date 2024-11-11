export const validate=(email,password)=>{

    const isEmailValid=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid){
        return 'Invalid Email';
    }
    if(!isPasswordValid){
        return 'Invalid Password';
    }

    return null;
}