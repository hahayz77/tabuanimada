import ReturnBtn from "@/components/buttons/ReturnBtn"
import { Button, Input, Select, Checkbox, Slider, SelectItem, NumberInput, Card, CardBody, CardHeader } from "@heroui/react"
import Link from "next/link"
import useConfigStore from "@/store/configStore"

const InputName = () => {
    const playerName = useConfigStore(state => state.playerName)
    const setPlayerName = useConfigStore(state => state.setPlayerName)

    return (
        <Input
            type="text"
            label="Nome do Jogador"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Digite seu nome"
        />
    )
}

const SelectGameMode = () => {
    const gameMode = useConfigStore(state => state.gameMode)
    const setGameMode = useConfigStore(state => state.setGameMode)

    return (
        <Select
            id="gameMode"
            label="Modo de Jogo"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value)}
        >
            <SelectItem value="tabuada">Tabuada</SelectItem>
            <SelectItem value="multiplicacao" disabled>Multiplicação (Em breve)</SelectItem>
        </Select>
    )
}

const InputAnswerTime = () => {
    const answerTime = useConfigStore(state => state.answerTime)
    const setAnswerTime = useConfigStore(state => state.setAnswerTime)

    return (
        <NumberInput
            label="Tempo por Resposta (segundos)"
            placeholder="Digite o tempo"
            value={answerTime}
            minValue={1}
            onValueChange={setAnswerTime}
        />
    )
}

const InputNumberOfQuestions = () => {
    const numberOfQuestions = useConfigStore(state => state.numberOfQuestions)
    const setNumberOfQuestions = useConfigStore(state => state.setNumberOfQuestions)

    return (
        <NumberInput
            label="Número de Perguntas da Partida"
            placeholder="Digite o n mero de perguntas"
            value={numberOfQuestions}
            minValue={1}
            onValueChange={setNumberOfQuestions}
        />
    )
}

const FirstPartConfiguration = () => {

    const handleStartGame = () => {
        // Handler vazio por enquanto
        console.log("Iniciar jogo")
    }

    return (
        <div className="space-y-4 w-full max-w-md">
            <InputName />
            <SelectGameMode />
            <InputAnswerTime />
            <InputNumberOfQuestions />
            <div className="flex justify-between mt-6">
                <Button as={Link} href="/" color="danger" variant="light">Cancelar</Button>
                <Button color="success" onPress={handleStartGame}>Iniciar</Button>
            </div>
        </div >
    )
}

const TableOptionItem = ({ number }) => {
    return (
        <div className="flex items-center gap-4">
            <Checkbox
                // isSelected={option?.firstTermEnabled || false}
                // onValueChange={handleToggle}
                color="warning"
                size="lg"
            >
                <span className="font-medium">{number}</span>
            </Checkbox>

            {/* Slider para frequência do segundo termo */}
            <div className="flex-1">
                <Slider
                    size="md"
                    step={10}
                    minValue={0}
                    maxValue={100}
                    // value={currentFrequency}
                    className="max-w-md"
                    color="primary"
                    showTooltip={false}
                />
            </div>

            {/* Porcentagem */}
            <span className="text-primary font-medium min-w-[40px] text-right">
                {/* {currentFrequency}% */}
            </span>
        </div>
    )
}

const SecondPartConfiguration = () => {
    // Seletor otimizado para o texto de referência com cache
    const referenceText = useConfigStore(state => state.getReferenceText())

    // Memoiza a lista de números para evitar recriação do array
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
    return (
        <div className="w-full max-w-md">
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center">
                        Modo Tabuada
                    </h2>
                </CardHeader>
                <CardBody className="p-6 max-w-md">
                    <h3 className="text-lg font-semibold mb-4">
                        Primeiros Termos e Frequência dos Segundos Termos
                    </h3>

                    <div className="space-y-4">
                        {numbers.map((number) => (
                            <TableOptionItem key={number} number={number} />
                        ))}
                    </div>

                    {/* Texto de referência */}
                    <div className="mt-6 p-4 bg-default-100 rounded-lg">
                        <p className="text-default-600 text-sm whitespace-pre-line">
                            {referenceText}
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

const Config = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold p-6">Configurações da Partida</h2>
            <ReturnBtn />
            <div className="grid_configs flex gap-8">
                <FirstPartConfiguration />
                <SecondPartConfiguration />
            </div>
        </div>
    )
}

export default Config