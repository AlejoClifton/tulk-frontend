import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export function EmailTemplate({ name, email, phone, message }: EmailTemplateProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold">Hola, {name}!</h1>
            <p>Email: {email}</p>
            <p>Teléfono: {phone}</p>
            <p>Mensaje: {message}</p>
        </div>
    );
}
