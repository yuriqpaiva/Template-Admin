/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import useAuth from '../../data/hook/useAuthData'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {

    const { usuario } = useAuth()

    return (
        <Link href="/perfil" passHref>
            <img
                src={usuario?.imagemUrl ?? '/images/avatar.svg'}
                alt="Avatar do usuário"
                className={`
                h-10 w-10 rounded-full cursor-pointer 
                ${props.className}
                `}
            />
        </Link>
    )
}