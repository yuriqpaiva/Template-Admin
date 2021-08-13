import { createContext, useState } from "react";

type Tema = 'dark' | ''

interface AppContextProps {
    tema?: Tema
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

    const [tema, setTema] = useState<Tema>('')

    function alternarTema() {
        setTema(tema === '' ? 'dark' : '')
    }

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