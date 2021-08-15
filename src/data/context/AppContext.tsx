import { createContext, useEffect, useState } from "react";

// type Tema = 'dark' | ''

interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}

interface AppProviderProps {
    children: any
}

const AppContext = createContext<AppContextProps>({
    // Valores do objeto que serão passados como padrão
    tema: null,
    alternarTema: null
})

// Criando o próprio componente que vai controlar os estados do contexto
export function AppProvider(props: AppProviderProps) {

    const [tema, setTema] = useState('')

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        // Salvando no Local Storage:
        localStorage.setItem('tema', novoTema )
    }

    useEffect(() => {
        // Pegando tema no Local Storage:
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo)
    }, [])

    return (
        <AppContext.Provider value={{
            tema: tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext
export const AppConsumer = AppContext.Consumer