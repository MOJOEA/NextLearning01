'use server';
export async function submitForm(formData) { 
    const email = formData.get("email");
    console.log(email);
}
