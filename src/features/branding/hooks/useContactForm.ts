import { useState } from 'react';

import axios from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';

import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

const schema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(1, 'El teléfono es obligatorio'),
    message: z.string().min(1, 'El mensaje es obligatorio'),
});

export const useContactForm = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        trackUmamiEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
        });

        try {
            schema.parse(form);
            setLoading(true);

            await axios.post('/api/contact', form);

            toast.success('Email enviado correctamente', {
                description: 'Gracias por contactarnos.',
            });

            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (error: unknown) {
            if (error instanceof z.ZodError) {
                toast.error('Validación incorrecta', {
                    description: error.errors[0]?.message,
                });
            } else {
                toast.error('Error al enviar el email', {
                    description: 'Por favor, intentá nuevamente.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return { form, loading, handleChange, handleSubmit };
};
