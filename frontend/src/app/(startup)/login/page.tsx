'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/common/formInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/auth';

const schema = z.object({
    username: z.string().min(3, { message: "Nome de usuário deve conter ao menos 3 caracteres." }),
    password: z.string().min(6, { message: "Senha deve conter ao menos 6 caracteres." }),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
    const {login} = useLogin();
    const router = useRouter();

    const { setError, register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        try{
            const user = await login(data.username, data.password)
            if(user)
                router.push("/app/wallet")
        } catch (error) {
            setError("username", { message: "Usuário ou senha inválidos." })
        }
    };

    return (
        <div className="flex flex-col items-center w-[70%] h-[70%] bg-black m-auto rounded-2xl shadow-2xl text-white">
            <h1 className="font-bold text-2xl mt-24">Bem vindo de volta!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                <div className="mt-8 w-[80%]">
                    <FormInput
                        placeholder="Username"
                        className="w-full h-10"
                        {...register('username')}
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="mt-3 w-[80%]">
                    <FormInput
                        placeholder="Senha"
                        type="password"
                        className="w-full h-10"
                        {...register('password')}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <button type="submit" className="mt-6 w-[80%] h-10 bg-primary rounded">Entrar</button>
                <Link href="/signup">
                    <p className='font-bold mt-2'>Não possui conta? Cadastre-se</p>
                </Link>
            </form>
        </div>
    );
}
