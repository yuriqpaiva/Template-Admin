import Layout from "../components/template/Layout"
import Image from "next/dist/client/image"
import useAuth from "../data/hook/useAuthData"
import AvatarUsuario from "../components/template/AvatarUsuario"

export default function Perfil() {

  const {usuario } = useAuth()

  return (
    <Layout titulo='Perfil do Usuário'
      subtitulo='Administre as suas informações de usuário'>
        <div className="flex mt-5">
          <AvatarUsuario/>
          <div className="mx-2">
            <h2>{usuario?.nome}</h2>
            <a href={`mailto: ${usuario?.email}`} type="email" className="underline hover:text-gray-300">{usuario?.email}</a>
          </div>
        </div>
        <span></span>
    </Layout>
  )
}
