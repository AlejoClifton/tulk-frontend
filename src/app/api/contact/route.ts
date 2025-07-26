import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { EmailTemplate } from '@/shared/components/templates/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, phone, email, message } = body;

    const { error } = await resend.emails.send({
        from: 'Tulk <noreply@tulk.com.ar>',
        to: [process.env.RESEND_CONTACT_EMAIL || ''],
        subject: 'Nuevo mensaje de contacto desde la página web',
        react: EmailTemplate({ name, email, phone, message }),
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email enviado correctamente' }, { status: 200 });
}
