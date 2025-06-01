import { create } from "zustand"

const useConfigStore = create((set, get) => {
    // Definição dos modelos de texto para fácil alteração e
    // para lidar com singular/plural de forma explícita.
    const textTemplates = {
        enabledStudy: {
            singular: "Vamos estudar a tabuada do número",    // Será concatenado com " X."
            plural: "Vamos estudar a tabuada dos números:", // Será concatenado com " X, Y, Z."
        },
        disabledStudy: {
            singular: "Não vamos estudar a tabuada do número",  // Será concatenado com " X."
            plural: "Não vamos estudar a tabuada dos números:",// Será concatenado com " X, Y, Z."
        },
        secondTermSequence: "Vamos estudar a tabuada na sequência.", // Texto original do ID 23
        secondTermDefaultRandom: "Os segundos termos vão ser aleatórios.", // Texto original do ID 22
        secondTermAltered: {
            customizedListIntro: "Os segundos termos mais cobrados serão, respectivamente:", // Novo texto para frequências personalizadas
            activeRandomDueToZeroFreq: "Para as tabuadas ativas (com frequência 0% para o segundo termo), estes serão sorteados aleatoriamente.",
            generalVaried: "A configuração geral de frequência dos segundos termos é variada/personalizada."
        }
    };

    // Definição do estado e ações da store
    return {
        playerName: "",
        gameMode: "tabuada",
        answerTime: 5,
        numberOfQuestions: 20,
        tableOptions: [
            { id: 1, number: 1, firstTermEnabled: false, secondTermFrequency: 50 },
            { id: 2, number: 2, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 3, number: 3, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 4, number: 4, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 5, number: 5, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 6, number: 6, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 7, number: 7, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 8, number: 8, firstTermEnabled: true, secondTermFrequency: 50 },
            { id: 9, number: 9, firstTermEnabled: true, secondTermFrequency: 50 },
        ],

        setPlayerName: (name) => set({ playerName: name }),
        setGameMode: (mode) => set({ gameMode: mode }),
        setAnswerTime: (time) => set({ answerTime: time }),
        setNumberOfQuestions: (questions) => set({ numberOfQuestions: questions }),

        toggleFirstTerm: (itemNumber) => set((state) => ({
            tableOptions: state.tableOptions.map(option =>
                option.number === itemNumber ? { ...option, firstTermEnabled: !option.firstTermEnabled } : option
            ),
            referenceTextCache: null
        })),

        changeSecondTermFrequency: (number, frequency) => set((state) => ({
            tableOptions: state.tableOptions.map(option =>
                option.number === number ? { ...option, secondTermFrequency: frequency } : option
            ),
            referenceTextCache: null
        })),

        getTableOption: (number) => get().tableOptions.find(opt => opt.number === number),
        referenceTextCache: null,

        getReferenceText: () => {
            const cachedResult = get().referenceTextCache
            if (cachedResult !== null && Array.isArray(cachedResult)) {
                return cachedResult
            }

            const tableOptions = get().tableOptions
            const outputArray = []

            const enabledTables = tableOptions.filter(opt => opt.firstTermEnabled)
            const disabledTables = tableOptions.filter(opt => !opt.firstTermEnabled)

            // Parte 1: Tabuadas ativas para estudo
            if (enabledTables.length > 0) {
                const numbersString = enabledTables.map(opt => opt.number).join(", ")
                if (enabledTables.length === 1) {
                    outputArray.push(`${textTemplates.enabledStudy.singular} ${numbersString}.`)
                } else {
                    outputArray.push(`${textTemplates.enabledStudy.plural} ${numbersString}.`)
                }
            }

            // Parte 2: Tabuadas não selecionadas para estudo
            if (disabledTables.length > 0) {
                const numbersString = disabledTables.map(opt => opt.number).join(", ")
                if (disabledTables.length === 1) {
                    outputArray.push(`${textTemplates.disabledStudy.singular} ${numbersString}.`)
                } else {
                    outputArray.push(`${textTemplates.disabledStudy.plural} ${numbersString}.`)
                }
            }

            // Parte 3: Informação sobre a frequência dos segundos termos
            const allFrequencies = tableOptions.map(opt => opt.secondTermFrequency)
            const uniqueFrequencies = new Set(allFrequencies)
            const isSequenceMode = allFrequencies.every(freq => freq === 0)

            if (isSequenceMode) {
                outputArray.push(textTemplates.secondTermSequence)
            } else {
                let isDefaultMode = false
                if (uniqueFrequencies.size === 1) {
                    const singleFrequency = uniqueFrequencies.values().next().value
                    if (singleFrequency !== 0) {
                        isDefaultMode = true
                    }
                }

                if (isDefaultMode) {
                    outputArray.push(textTemplates.secondTermDefaultRandom)
                } else { // Modo de frequência Alterado/Personalizado
                    const relevantTablesForAlteredMode = enabledTables.filter(opt => opt.secondTermFrequency > 0)

                    if (relevantTablesForAlteredMode.length > 0) {
                        // Ordena as tabuadas pela frequência do segundo termo, do maior para o menor
                        const sortedTables = [...relevantTablesForAlteredMode].sort((a, b) => b.secondTermFrequency - a.secondTermFrequency);
                        const numbersString = sortedTables.map(opt => opt.number).join(", ");
                        outputArray.push(`${textTemplates.secondTermAltered.customizedListIntro} ${numbersString}.`)
                    } else {
                        // Modo Alterado, mas nenhuma tabuada ativa tem frequência > 0
                        // (Ex: tabuadas ativas têm frequência 0, mas não é modo sequência global)
                        if (enabledTables.length > 0) {
                            outputArray.push(textTemplates.secondTermAltered.activeRandomDueToZeroFreq)
                        } else {
                            // Modo Alterado, mas não há tabuadas ativas (a alteração vem das desativadas)
                            outputArray.push(textTemplates.secondTermAltered.generalVaried)
                        }
                    }
                }
            }

            const finalArray = outputArray.filter(line => line && line.trim() !== "") // Remove linhas vazias
            set({ referenceTextCache: finalArray })
            return finalArray
        },

        resetConfig: () => set({
            playerName: "",
            gameMode: "tabuada",
            answerTime: 5,
            numberOfQuestions: 20,
            tableOptions: [
                { id: 1, number: 1, firstTermEnabled: false, secondTermFrequency: 50 },
                { id: 2, number: 2, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 3, number: 3, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 4, number: 4, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 5, number: 5, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 6, number: 6, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 7, number: 7, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 8, number: 8, firstTermEnabled: true, secondTermFrequency: 50 },
                { id: 9, number: 9, firstTermEnabled: true, secondTermFrequency: 50 },
            ],
            referenceTextCache: null,
        }),

        sequenceMode: () => set({
            tableOptions: [
                { id: 1, number: 1, firstTermEnabled: false, secondTermFrequency: 0 },
                { id: 2, number: 2, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 3, number: 3, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 4, number: 4, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 5, number: 5, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 6, number: 6, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 7, number: 7, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 8, number: 8, firstTermEnabled: true, secondTermFrequency: 0 },
                { id: 9, number: 9, firstTermEnabled: true, secondTermFrequency: 0 },
            ],
            referenceTextCache: null,
        })
    }
})

export default useConfigStore