'use server';

import axios from 'axios';
import { z } from 'zod';

const API_URL_CLIENT = process.env.NEXT_PUBLIC_API_URL_CLIENT;

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    message: z.string().min(1),
});

export const sendContactEmail = async (formData: FormData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const validatedData = schema.parse({ name, email, phone, message });

    try {
        const response = await axios.post(`${API_URL_CLIENT}/api/contact`, validatedData);

        return response;
    } catch (error) {
        console.log('error', error);
    }
};
