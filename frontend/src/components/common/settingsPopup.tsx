"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/common/formInput';
import { createPortal } from 'react-dom';
import { createTransaction, getSettings, Transaction, updateSettings } from '@/lib/actions/transactions';

const schema = z.object({
    spendingLimit: z.coerce.number().min(0).max(1000000),
    spendingGoal: z.coerce.number().min(0).max(1000000),
});

type FormData = z.infer<typeof schema>;

export default function SettingsPopup({
    isOpen,
    onClose,
    onSubmitSuccess
}: {
    isOpen: boolean;
    onClose?: () => void;
    onSubmitSuccess?: (transaction: Transaction) => void;
}) {
    const { register, setError, setValue, reset, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        const updatedGoal = updateSettings({
            limit: data.spendingLimit,
            goal: data.spendingGoal
        });
        if (onClose) onClose()
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
            onClose();
        }
    }
    useEffect(() => {
        getSettings().then((value) => { 
            setValue('spendingLimit', value.limit)
            setValue('spendingGoal', value.goal)
        })
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    const opacityPopup = isOpen ? '' : 'opacity-0 pointer-events-none';
    const opacityBackground = isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none';

    return (
        createPortal(<>
            <div className={`z-50 transition-opacity absolute top-0 left-0 bg-black w-screen h-screen ${opacityBackground}`} onClick={onClose} />
            <div className={`z-50 transition transition-opacity absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex flex-col items-center w-[40%] min-w-[400px] h-[70%] bg-black m-auto rounded-2xl shadow-2xl text-white ${opacityPopup}`}>
                <h1 className="font-bold text-2xl mt-24">Configurações</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                    <div className="mt-8 w-[80%]">
                        <label htmlFor="spendingLimit" className="text-left">Limite de Gastos</label>
                        <FormInput
                            placeholder="Limite de Gastos"
                            type="number"
                            className="w-full h-10"
                            {...register('spendingLimit')}
                        />
                        {errors.spendingLimit && <p className="text-red-500">{errors.spendingLimit.message}</p>}
                    </div>
                    <div className="mt-3 w-[80%]">
                        <label htmlFor="spendingGoal" className="text-left">Meta</label>
                        <FormInput
                            placeholder="Meta de Gastos"
                            type="number"
                            step="0.01"
                            className="w-full h-10"
                            {...register('spendingGoal')}
                        />
                        {errors.spendingGoal && <p className="text-red-500">{errors.spendingGoal.message}</p>}
                    </div>
                    <button type="submit" className="mt-6 w-[80%] h-10 bg-primary rounded">Salvar</button>
                    <a href="#" onClick={onClose}>
                        <p className='font-bold mt-2'>Voltar</p>
                    </a>
                </form>
            </div>
        </>, document.body)
    );
}