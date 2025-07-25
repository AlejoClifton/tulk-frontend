import { auth } from '@/auth';

export default async function UserAvatar() {
    const session = await auth();

    if (!session?.user) return <p>No hay sesión</p>;

    return (
        <div>
            <p>{session?.user?.name}</p>
        </div>
    );
}
