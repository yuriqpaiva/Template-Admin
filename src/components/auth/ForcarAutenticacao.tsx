import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import loading from '../../../public/images/loading.gif'
import useAuth from '../../data/hook/useAuthData'

export default function ForcarAutenticacao(props) {

    const { usuario, carregando } = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        // Verificação dos cookies agora também sendo executada nos Headers
                        __html: `
                            if (!document.cookie?.includes("admin-template-auth")) {
                                window.location.href = "/autenticacao"
                            }
                        `
                    }}/>
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt="loading" />
            </div>
        )
    }

    if (!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}