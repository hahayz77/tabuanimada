import ReturnBtn from "@/components/buttons/ReturnBtn"
import { Button, Input, Select, Checkbox, Slider, SelectItem, NumberInput } from "@heroui/react"
import Link from "next/link"
import { useState } from "react"

const Config = () => {
    const [playerName, setPlayerName] = useState("")
    const [gameMode, setGameMode] = useState("tabuada")
    const [answerTime, setAnswerTime] = useState(10)
    const [numberOfQuestions, setNumberOfQuestions] = useState(20)
    const [excludeFirstTerm, setExcludeFirstTerm] = useState(false)
    const [secondTermFrequency, setSecondTermFrequency] = useState(50)

    const handleStartGame = () => {
        // Handler vazio por enquanto
        console.log("Iniciar jogo")
    }

    const frequencyText = `O segundo termo aparecerá aproximadamente em ${secondTermFrequency}% das perguntas.`

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl p-6">Configurações da Partida</h2>
            <ReturnBtn />
            <div className="space-y-4 w-full max-w-md">
                <div>
                    <Input
                        type="text"
                        label="Nome do Jogador"
                        id="playerName"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                </div>
                <div>
                    <Select
                        id="gameMode"
                        label="Modo de Jogo"
                        value={gameMode}
                        onChange={(e) => setGameMode(e.target.value)}
                    >
                        <SelectItem value="tabuada">Tabuada</SelectItem>
                        <SelectItem value="multiplicacao" disabled>Multiplicação (Em breve)</SelectItem>
                    </Select>
                </div>
                <div>
                    <NumberInput
                        label="Tempo por Resposta (segundos)"
                        placeholder="Digite o tempo"
                        value={answerTime}
                        minValue={1}
                        onValueChange={setAnswerTime}
                    />
                </div>
                <div>
                    <NumberInput
                        label="Número de Perguntas da Partida"
                        placeholder="Digite o n mero de perguntas"
                        value={numberOfQuestions}
                        minValue={1}
                        onValueChange={setNumberOfQuestions}
                    />
                </div>
                <div>
                    <Checkbox
                        checked={excludeFirstTerm}
                        onChange={(e) => setExcludeFirstTerm(e.target.checked)}
                        label="Excluir primeiro termo"
                    />
                </div>
                <div>
                    <Slider
                        value={secondTermFrequency}
                        label="Frequência do segundo termo (%)"
                        onChange={(value) =>
                            setSecondTermFrequency(value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">{frequencyText}</p>
                </div>
                <div className="flex justify-between mt-6">
                    <Button as={Link} href="/" color="danger" variant="light">Cancelar</Button>
                    <Button color="success" onClick={handleStartGame}>Iniciar</Button>
                </div>
            </div>
        </div>
    )
}

export default Config