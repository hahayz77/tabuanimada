import { create } from "zustand"

const useConfigStore = create((set, get) => {
    const textTemplates = {
        enabledStudy: {
            singular: "Vamos estudar a tabuada do número",
            plural: "Vamos estudar a tabuada dos números:",
        },
        disabledStudy: {
            singular: "Não vamos estudar a tabuada do número",
            plural: "Não vamos estudar a tabuada dos números:",
        },
        secondTermSequence: "Vamos estudar a tabuada na sequência.",
        secondTermDefaultRandom: "Os segundos termos vão ser aleatórios.",
        secondTermAltered: {
            customizedListIntro: "Os segundos termos mais cobrados serão, respectivamente:",
            activeRandomDueToZeroFreq: "Para as tabuadas ativas (com frequência 0% para o segundo termo), estes serão sorteados aleatoriamente.",
            generalVaried: "A configuração geral de frequência dos segundos termos é variada/personalizada."
        }
    }

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

        toggleFirstTerm: (itemNumber) => set((state) => {
            const currentOption = state.tableOptions.find(option => option.number === itemNumber)
            if (!currentOption) {
                return {}
            }

            if (currentOption.firstTermEnabled) {
                const enabledCount = state.tableOptions.filter(opt => opt.firstTermEnabled).length
                if (enabledCount <= 1) {
                    return {}
                }
            }

            return {
                tableOptions: state.tableOptions.map(option =>
                    option.number === itemNumber ? { ...option, firstTermEnabled: !option.firstTermEnabled } : option
                ),
                referenceTextCache: null
            }
        }),

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

            // --- PARTE 1 e 2: Primeiros Termos (baseado nos Checkboxes) ---
            // Esta parte permanece inalterada e depende de 'firstTermEnabled'.
            const enabledTables = tableOptions.filter(opt => opt.firstTermEnabled)
            const disabledTables = tableOptions.filter(opt => !opt.firstTermEnabled)

            if (enabledTables.length > 0) {
                const numbersString = enabledTables.map(opt => opt.number).join(", ")
                if (enabledTables.length === 1) {
                    outputArray.push(`${textTemplates.enabledStudy.singular} ${numbersString}.`)
                } else {
                    outputArray.push(`${textTemplates.enabledStudy.plural} ${numbersString}.`)
                }
            }

            if (disabledTables.length > 0) {
                const numbersString = disabledTables.map(opt => opt.number).join(", ")
                if (disabledTables.length === 1) {
                    outputArray.push(`${textTemplates.disabledStudy.singular} ${numbersString}.`)
                } else {
                    outputArray.push(`${textTemplates.disabledStudy.plural} ${numbersString}.`)
                }
            }

            // --- PARTE 3: Segundos Termos (baseado nos Sliders) ---
            // Esta parte agora analisa 'tableOptions' diretamente para as frequências,
            // independentemente de 'firstTermEnabled'.
            if (tableOptions.length === 0) {
            } else {
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
                    } else {
                        // Modo de frequência Alterado/Personalizado
                        // Filtra TODAS as tableOptions para encontrar aquelas com frequência > 0
                        const tablesWithCustomFrequency = tableOptions.filter(opt => opt.secondTermFrequency > 0)

                        if (tablesWithCustomFrequency.length > 0) {
                            const sortedTables = [...tablesWithCustomFrequency].sort((a, b) => b.secondTermFrequency - a.secondTermFrequency)
                            const numbersString = sortedTables.map(opt => opt.number).join(", ")
                            outputArray.push(`${textTemplates.secondTermAltered.customizedListIntro} ${numbersString}.`)
                        } else {
                            outputArray.push(textTemplates.secondTermAltered.generalVaried)
                        }
                    }
                }
            }

            const finalArray = outputArray.filter(line => line && line.trim() !== "")
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

        sequenceMode: () => set(state => {
            const currentTableOptions = state.tableOptions

            const updatedTableOptions = currentTableOptions.map(opt => {
                return {
                    ...opt,
                    secondTermFrequency: 0
                }
            })

            return {
                tableOptions: updatedTableOptions,
                referenceTextCache: null,
            }
        }),

        randomMode: () => set(state => ({
            tableOptions: state.tableOptions.map(option => ({ ...option, secondTermFrequency: 50 })),
            referenceTextCache: null,
        })),

        hardMode: () => set(state => {
            console.log("Hard mode selected - not implemented yet")
            return { ...state }
        }),

        areConfigsComplete: () => {
            const { playerName, tableOptions, numberOfQuestions, answerTime } = get()

            const isPlayerNameSet = playerName && playerName.trim() !== ""
            // Verifica se pelo menos uma tabuada está habilitada para o primeiro termo
            const areAnyFirstTermsEnabled = tableOptions.some(opt => opt.firstTermEnabled)
            // Verifica se as configurações numéricas básicas são válidas
            const areGameSettingsValid = numberOfQuestions > 0 && answerTime > 0

            return isPlayerNameSet && areAnyFirstTermsEnabled && areGameSettingsValid
        },
    }
})

export default useConfigStore