import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Usuario from '../../model/Usuario'
import route from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario: Usuario
    loginGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

// É passado o usuário retornado pela API do Firebase como parâmetro,
// retornando um objeto que vai dar um setState em usuário mais abaixo
async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props) {

    const [usuario, setUsuario] = useState<Usuario>(null)
    const [carregando, setCarregando] = useState(true)

    // Função que dá set nos cookies e no usuário, recebendo como parâmetro
    // o resp.user que as requisições retornarem
    async function configurarSessao(usuarioFirebase) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        configurarSessao(resp.user)
        route.push('/')
    }

    useEffect(() => {
        const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
        return () => cancelar() // quando o componente for desmontado, `cancelar` não será mais chamado 
    }, [])


    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext