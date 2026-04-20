'use client'
import { useActionState } from "react"; 
import { login } from "./action";  

export default function Page(){
    const initState = {
        message: ''
    }
    const [state, formAction] = useActionState(login, initState);

    return(
        <form action={formAction}>
            <div>
                Email <input type="email" name="email" />
            </div>
            <div>
                Password <input type="password" name="password" />
            </div>
            <button type="submit">
                Login
            </button>
            <p>{state?.message}</p>
        </form>
    )
}
