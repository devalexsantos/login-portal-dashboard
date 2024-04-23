import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { app } from '@/services/firebase';
import {
    signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
    getAuth,
  } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import logo from '@/assets/logo-login-color.png';

export function Login(){
    const auth = getAuth(app);

    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    type FormType = z.infer<typeof formSchema>;

    const {handleSubmit, register, formState: {isSubmitting}} = useForm<FormType>();
    
    async function signInWithEmailAndPassword(data: FormType) {
        try {
            return await firebaseSignInWithEmailAndPassword(auth, data.email, data.password);
        } catch {
            alert('Erro ao fazer login');
        }
    }

    if(loading){
        return <div>Loading...</div>
    }

    if(user){
        navigate('/dashboard')
    }

    return(
        <div className="container flex flex-col items-center mt-8">
           <form onSubmit={handleSubmit(signInWithEmailAndPassword)} 
           className="w-full max-w-xl flex flex-col gap-3 mt-20 items-center"
           >
            <img src={logo} alt="Logo" className="w-[200px]" />
            <h1 className="text-2xl font-bold text-center">Portal Login</h1>
            <Input required placeholder='Digite o seu e-mail' type="email" {...register('email')} />
            <Input required placeholder="Digite sua senha" type="password" {...register('password')} />
            <Button className="w-full" type="submit" disabled={isSubmitting}>Entrar</Button>
           </form>
           <p className="text-xs text-muted-foreground mt-8">Login Informática - 2024</p>
        </div>
    )
}