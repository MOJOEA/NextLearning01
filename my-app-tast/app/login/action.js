'use server';

export async function login(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    if (email != 'devinetypor@gmail.com' && password != '2526'){
        return { message: 'Logi Faill'}
    }else{
        return { message: 'Logi Pass'}
    }
} 
