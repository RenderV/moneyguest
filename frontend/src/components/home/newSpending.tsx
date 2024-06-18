"use client";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/common/formInput';
import { createPortal } from 'react-dom';
import { createTransaction, Transaction } from '@/lib/actions/transactions';

const schema = z.object({
    name: z.string().min(1, { message: "Nome da transação é obrigatório." }),
    value: z.coerce.number(),
    person: z.string().min(1, { message: "Pessoa é obrigatória." }),
    payment: z.string().min(1, { message: "Forma de pagamento é obrigatória." }),
    date : z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function SpendingPopup({
    isOpen,
    onClose,
    onSubmitSuccess
}: {
    isOpen: boolean;
    onClose?: () => void;
    onSubmitSuccess?: (transaction: Transaction) => void;
}) {
    const { register, setError, reset, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        try{
            const tran = await createTransaction({
                name: data.name,
                value: data.value,
                person: data.person,
                payment: data.payment,
                date: data.date ? data.date : undefined
            })
            if(onSubmitSuccess) onSubmitSuccess(tran)
            if(onClose) onClose()
            reset()
        } catch(error){
            setError('name', {
                type: 'manual',
                message: 'Erro ao adicionar transação. Por favor, tente novamente mais tarde.'
            })
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    const opacityPopup = isOpen ? '' : 'opacity-0 pointer-events-none';
    const opacityBackground = isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none';

    return (
        createPortal(<>
            <div className={`z-50 transition-opacity absolute top-0 left-0 bg-black w-screen h-screen ${opacityBackground}`} onClick={onClose}/>
            <div className={`z-50 transition transition-opacity absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex flex-col items-center w-[40%] min-w-[400px] h-[70%] bg-black m-auto rounded-2xl shadow-2xl text-white ${opacityPopup}`}>
                <h1 className="font-bold text-2xl mt-16">Adicionar Nova Transação</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                    <div className="mt-8 w-[80%]">
                        <FormInput
                            placeholder="Nome da Transação*"
                            className="w-full h-10"
                            {...register('name')}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="mt-3 w-[80%]">
                        <FormInput
                            placeholder="Valor*"
                            type="number"
                            step="0.01"
                            className="w-full h-10"
                            {...register('value')}
                        />
                        {errors.value && <p className="text-red-500">{errors.value.message}</p>}
                    </div>
                    <div className="mt-3 w-[80%]">
                        <FormInput
                            placeholder="Pessoa*"
                            className="w-full h-10"
                            {...register('person')}
                        />
                        {errors.person && <p className="text-red-500">{errors.person.message}</p>}
                    </div>
                    <div className="mt-3 w-[80%]">
                        <FormInput
                            placeholder="Forma de Pagamento*"
                            className="w-full h-10"
                            {...register('payment')}
                        />
                        {errors.payment && <p className="text-red-500">{errors.payment.message}</p>}
                    </div>
                    <div className="mt-3 w-[80%]">
                        <FormInput
                            type='datetime-local'
                            placeholder="Data"
                            className="w-full h-10"
                            {...register('date')}
                        />
                        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
                    </div>
                    <button type="submit" className="mt-6 w-[80%] h-10 bg-primary rounded">Adicionar</button>
                    <a href="#" onClick={onClose}>
                        <p className='font-bold mt-2'>Voltar para a carteira</p>
                    </a>
                </form>
            </div>
        </>, document.body)
    );
}