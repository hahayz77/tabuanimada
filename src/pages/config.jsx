import ReturnBtn from "@/components/buttons/ReturnBtn"
import { Button, Input, Select, Checkbox, Slider, SelectItem, NumberInput, Card, CardBody, CardHeader, table } from "@heroui/react"
import Link from "next/link"
import useConfigStore from "@/store/configStore"

const InputName = () => {
    const playerName = useConfigStore(state => state.playerName)
    const setPlayerName = useConfigStore(state => state.setPlayerName)

    return (
        <Input
            type="text"
            label="Nome do Jogador"
            aria-label="Nome do Jogador"
            id="playerName"
            value={playerName}
            color="success"
            variant="bordered"
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
            aria-label="Modo de Jogo"
            defaultSelectedKeys={[gameMode]}
            color="success"
            variant="bordered"
            onChange={e => setGameMode(e.target.value || "tabuada")}
        >
            <SelectItem key={"tabuada"} value="tabuada">Tabuada</SelectItem>
            {/* <SelectItem value="multiplicacao" disabled>Multiplicação (Em breve)</SelectItem> */}
        </Select >
    )
}

const InputAnswerTime = () => {
    const answerTime = useConfigStore(state => state.answerTime)
    const setAnswerTime = useConfigStore(state => state.setAnswerTime)

    return (
        <NumberInput
            label="Tempo por Resposta (segundos)"
            aria-label="Tempo por Resposta (segundos)"
            placeholder="Digite o tempo"
            value={answerTime}
            minValue={1}
            color="success"
            variant="bordered"
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
            aria-label="Número de Perguntas da Partida"
            placeholder="Digite o n mero de perguntas"
            value={numberOfQuestions}
            minValue={1}
            color="success"
            variant="bordered"
            onValueChange={setNumberOfQuestions}
        />
    )
}

const FirstTermTableItem = ({ id, number, firstTermEnabled }) => {
    const toggleFirstTerm = useConfigStore(state => state.toggleFirstTerm)

    return (
        <div className="first_terms flex justify-center items-center py-2">
            <Checkbox
                isSelected={firstTermEnabled}
                // onValueChange={handleToggle}
                color="success"
                size="lg"
                label={`Tabuada do ${number}`}
                aria-label={`Tabuada do ${number}`}
                onChange={() => toggleFirstTerm(number)}
            /> {number}
        </div>
    )
}

const FirstTermsConfiguration = () => {
    const tableOptions = useConfigStore(state => state.tableOptions)
    const toggleFirstTerm = useConfigStore(state => state.toggleFirstTerm)
    const changeSecondTermFrequency = useConfigStore(state => state.changeSecondTermFrequency)

    return (
        <Card className="bg-transparent p-2 border-solid border-2 border-neutral-700">
            <CardHeader className="flex flex-col">
                <h3 className="text-md text-green-500 font-bold text-center">
                    Vamos estudar as tabuadas dos números
                </h3>
            </CardHeader>
            <CardBody className="max-w-md">
                <div className="grid items-center grid-cols-3 grid-flow-row">
                    {tableOptions?.map(({ id, number, firstTermEnabled }) => (
                        <FirstTermTableItem key={id} number={number} firstTermEnabled={firstTermEnabled} />
                    ))}
                </div>
            </CardBody>
        </Card >
    )
}

const FirstPartConfiguration = () => {
    return (
        <div className="space-y-4 w-full max-w-md">
            <InputName />
            {/* <SelectGameMode /> */}
            <InputAnswerTime />
            <InputNumberOfQuestions />
            <FirstTermsConfiguration />
        </div >
    )
}

const TableOptionItem = ({ number }) => {

    const currentFrequency = useConfigStore(state => state.getTableOption(number)?.secondTermFrequency)

    return (
        <div className="flex items-center gap-4">
            <span className="font-medium min-w-[40px] text-right">{number}</span>
            <div className="flex-1">
                <Slider
                    size="md"
                    step={10}
                    minValue={0}
                    maxValue={100}
                    // label="Frequência do segundo termo"
                    aria-label="Frequência do segundo termo"
                    value={currentFrequency}
                    className="max-w-md"
                    color="success"
                    showTooltip={false}
                    onChange={(value) => useConfigStore.getState().changeSecondTermFrequency(number, value)}
                />
            </div>
            <span className="text-primary font-medium min-w-[40px] text-right">
                {currentFrequency}%
            </span>
        </div>
    )
}

const ReferenceTextComponent = () => {
    const referenceText = useConfigStore(state => state.getReferenceText())

    return (
        <div div className="mt-6 rounded-lg w-xl p-4 border-solid border-2 border-neutral-700" >
            <ul className="text-default-600 text-sm whitespace-pre-line">
                {referenceText?.map(item => (
                    <li>- {item}</li>
                ))}
            </ul>
        </div>
    )
}

const SecondPartConfiguration = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="w-full max-w-md">
            <Card className="bg-transparent p-2 border-solid border-2 border-neutral-700">
                <CardBody className="p-6 max-w-md">
                    <h3 className="text-sm text-green-500 font-semibold mb-4">
                        Frequência dos Termos de Multiplicação
                    </h3>
                    <div className="space-y-4">
                        {numbers.map((number) => (
                            <TableOptionItem key={number} number={number} />
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default function ConfigPage() {

    const resetConfig = useConfigStore(state => state.resetConfig)
    const sequenceMode = useConfigStore(state => state.sequenceMode)
    const handleStartGame = () => {
        // Handler vazio por enquanto
        console.log("Iniciar jogo")
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8">
            <ReturnBtn />
            <h2 className="text-3xl font-bold p-4">Configurações da Partida</h2>
            <div className="header pb-6">
                <p className="text-lg mb-6 flex justify-center">Modo Tabuada</p>
                <ReferenceTextComponent />
            </div>
            <div className="grid_configs flex gap-8">
                <FirstPartConfiguration />
                <SecondPartConfiguration />
            </div>
            <div className="flex justify-between mt-6 gap-8">
                <Button as={Link} href="/" color="danger" variant="flat">Cancelar</Button>
                <Button color="primary" variant="flat" onPress={sequenceMode}>Modo Sequência</Button>
                <Button color="warning" variant="flat" onPress={resetConfig}>Resetar Configuração</Button>
                <Button color="success" variant="solid" onPress={handleStartGame}> Iniciar </Button>
            </div>
        </div>
    )
}