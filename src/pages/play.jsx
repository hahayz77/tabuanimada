// src/pages/play.jsx
import ReturnBtn from "@/components/buttons/ReturnBtn"
import { Button, Card, CardBody, CardHeader } from "@heroui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react" // Adicionados useEffect e useState
import useConfigStore from "@/store/configStore" // Importar a store

// --- Componentes Locais da Página Play (EmojiStatus, TimeDisplay, etc. permanecem os mesmos) ---

const EmojiStatus = () => {
    return (
        <div className="text-7xl md:text-8xl lg:text-9xl my-2">
            😊
        </div>
    )
}

const TimeDisplay = ({ currentTime = "00:00" }) => {
    return (
        <div className="text-lg md:text-xl">
            Tempo: <span className="font-bold">{currentTime}</span>
        </div>
    )
}

const QuestionsDisplay = ({ count = "0" }) => {
    return (
        <div className="text-lg md:text-xl">
            Perguntas: <span className="font-bold">{count}</span>
        </div>
    )
}

const CalculationDisplay = ({ question = "X × Y = __" }) => {
    return (
        <div className="text-5xl md:text-6xl font-bold my-6 md:my-8 tracking-wider">
            {question}
        </div>
    )
}

const NumpadButton = ({ children, onPress, className = "", heroColor = "default", heroVariant = "bordered" }) => {
    return (
        <Button
            onPress={onPress}
            color={heroColor}
            variant={heroVariant}
            className={`w-full text-2xl md:text-3xl font-semibold p-3 md:p-4 ${className}`}
        >
            {children}
        </Button>
    )
}

const Numpad = () => {
    const numberButtonRows = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9]
    ]
    return (
        <div className="flex flex-col items-center gap-3 md:gap-4 w-full max-w-xs md:max-w-sm mt-4">
            {numberButtonRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-5 gap-2 md:gap-3 w-full">
                    {row.map((number) => (
                        <NumpadButton
                            key={number}
                            heroColor="default"
                            heroVariant="outline"
                        >
                            {number}
                        </NumpadButton>
                    ))}
                </div>
            ))}
            <div className="grid grid-cols-2 gap-2 md:gap-3 w-full mt-2">
                <NumpadButton
                    heroColor="warning"
                    heroVariant="solid"
                    className="text-white"
                >
                    Apagar
                </NumpadButton>
                <NumpadButton
                    heroColor="success"
                    heroVariant="solid"
                    className="text-white"
                >
                    Confirmar
                </NumpadButton>
            </div>
        </div>
    )
}


// --- Componente Principal da Página Play ---

export default function PlayPage() {
    const router = useRouter()
    // A função 'areConfigsComplete' será chamada via getState() dentro do useEffect
    // Não precisamos selecioná-la para reatividade aqui, pois a verificação é pontual.

    const [isCheckingConfig, setIsCheckingConfig] = useState(true) // Estado para controlar o carregamento/verificação

    // Dados que virão do estado do jogo ou da configuração mais tarde
    // Por enquanto, alguns são mockados ou lidos diretamente para a UI
    const initialGameData = useConfigStore.getState() // Pega uma cópia inicial para dados como numberOfQuestions

    const currentTime = "00:00" // Será dinâmico com a lógica do jogo
    const questionCount = initialGameData.numberOfQuestions.toString() // Usa o valor da store
    const currentProblem = "X × Y = __" // Será gerado pela lógica do jogo

    useEffect(() => {
        // Timer para o atraso de 3 segundos
        const checkTimer = setTimeout(() => {
            const configsAreActuallyComplete = useConfigStore.getState().areConfigsComplete()

            if (!configsAreActuallyComplete) {
                router.push("/config") // Redireciona para a página de configuração
            } else {
                setIsCheckingConfig(false) // Configurações OK, permite renderizar o jogo
                // Aqui você iniciaria a lógica do jogo, buscaria a primeira pergunta, etc.
            }
        }, 3000) // Atraso de 3 segundos

        return () => clearTimeout(checkTimer) // Limpa o timer se o componente for desmontado
    }, [router]) // Adiciona router como dependência do useEffect

    // Tela de carregamento/verificação
    if (isCheckingConfig) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4 gap-6">
                <ReturnBtn /> {/* Mantém o botão de retorno acessível */}
                <div className="flex flex-col items-center justify-center flex-grow text-center gap-6">
                    {/* Pode-se opcionalmente mostrar o título da aplicação aqui também */}
                    <h2 className="text-2xl md:text-3xl font-mono font-extrabold text-emerald-400">
                        <span>Tabu</span><span className="text-sky-400">Ani</span><span className="text-amber-300">mada!</span>
                    </h2>
                    <p className="text-xl text-slate-700">Verificando configurações e carregando o jogo...</p>
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500"></div>
                </div>
            </div>
        )
    }

    // Renderiza a página do jogo se as configurações estiverem OK
    return (
        <div className="flex flex-col items-center justify-start min-h-screen py-8 px-4 gap-6">
            <ReturnBtn /> {/* Botão de retorno no topo da página */}
            <Card className="w-full max-w-lg md:max-w-xl bg-yellow-900/10 shadow-2xl border-yellow-300 border-1 rounded-xl">
                <CardHeader className="flex flex-col">
                    <h2 className="text-2xl md:text-3xl font-mono font-extrabold text-emerald-400 text-center">
                        <span className="">Tabu</span>
                        <span className="text-sky-400">Ani</span>
                        <span className="text-amber-300">mada!</span>
                    </h2>
                </CardHeader>
                <CardBody className="flex flex-col items-center gap-3 md:gap-5 p-6">
                    <EmojiStatus />
                    <div className="flex justify-between w-full px-2 sm:px-4 mt-2">
                        <TimeDisplay currentTime={currentTime} /> {/* Será atualizado pela lógica do jogo */}
                        <QuestionsDisplay count={questionCount} /> {/* Vem da config inicial */}
                    </div>
                    <CalculationDisplay question={currentProblem} /> {/* Será atualizado pela lógica do jogo */}
                    <Numpad />
                </CardBody>
            </Card>
        </div>
    )
}