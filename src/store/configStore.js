import { create } from 'zustand'

const useConfigStore = create((set, get) => ({
    // Estados de configuração
    playerName: "",
    gameMode: "tabuada",
    answerTime: 10,
    numberOfQuestions: 20,

    // Opções da tabuada
    tableOptions: [
        { id: 1, number: 1, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 2, number: 2, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 3, number: 3, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 4, number: 4, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 5, number: 5, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 6, number: 6, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 7, number: 7, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 8, number: 8, firstTermEnabled: true, secondTermFrequency: 50 },
        { id: 9, number: 9, firstTermEnabled: true, secondTermFrequency: 50 },
    ],

    // Actions para configurações básicas
    setPlayerName: (name) => set({ playerName: name }),
    setGameMode: (mode) => set({ gameMode: mode }),
    setAnswerTime: (time) => set({ answerTime: time }),
    setNumberOfQuestions: (questions) => set({ numberOfQuestions: questions }),
    setSecondTermFrequency: (frequency) => set({ secondTermFrequency: frequency }),

    // Actions para opções da tabuada
    toggleFirstTerm: (itemNumber) => set((state) => ({
        tableOptions: state.tableOptions.map(option =>
            option.number === itemNumber ? { ...option, firstTermEnabled: !option.firstTermEnabled } : option
        )
    })),

    changeSecondTermFrequency: (number, frequency) => set((state) => ({
        tableOptions: state.tableOptions.map(option =>
            option.number === number ? { ...option, secondTermFrequency: frequency } : option
        ),
    })),

    // Seletores otimizados (funções helper)
    getTableOption: (number) => get().tableOptions[number],

    // Cache para o texto de referência
    _referenceTextCache: null,
    _lastTableOptionsHash: null,

    // Gerador de texto de referência memoizado com cache
    getReferenceText: () => {
        const state = get();
        const { tableOptions } = state;
        const currentHash = JSON.stringify(tableOptions);

        // Retorna do cache se as opções não mudaram
        if (state._lastTableOptionsHash === currentHash && state._referenceTextCache) {
            return state._referenceTextCache;
        }

        let lines = [];
        // Garante ordem consistente para processamento e saída
        const allTermKeys = Object.keys(tableOptions).sort((a, b) => parseInt(a) - parseInt(b));

        // Parte 1: Identifica e lista os primeiros termos desabilitados
        const disabledFirstTerms = allTermKeys.filter(num => !tableOptions[num].firstTermEnabled);
        if (disabledFirstTerms.length > 0) {
            lines.push(`Primeiros termos desabilitados: ${disabledFirstTerms.join(", ")}.`);
        }

        // Se todos os primeiros termos estiverem desabilitados, esta é a mensagem mais crucial.
        if (allTermKeys.length > 0 && disabledFirstTerms.length === allTermKeys.length) {
            const finalText = lines.join("\n"); // Deve conter apenas a mensagem de "Primeiros termos desabilitados"
            set({ _referenceTextCache: finalText, _lastTableOptionsHash: currentHash });
            return finalText;
        }

        // Parte 2: Identifica e lista os termos onde a frequência do segundo termo é 0%
        // Estes são os *termos* (números 1-9) cujos sliders estão em 0%.
        const termsWithZeroSecondTermFrequency = allTermKeys.filter(num => tableOptions[num].secondTermFrequency === 0);
        if (termsWithZeroSecondTermFrequency.length > 0) {
            lines.push(`Segundos termos desabilitados: ${termsWithZeroSecondTermFrequency.join(", ")}.`);
        }

        // Parte 3: Identifica e lista os top 3 segundos termos com maior frequência
        // Considera *todos* os termos, independentemente de firstTermEnabled, desde que secondTermFrequency > 0.
        const candidatesForHighestFrequency = allTermKeys
            .filter(num => tableOptions[num].secondTermFrequency > 0) // MODIFICADO: Removeu a checagem de firstTermEnabled
            .map(num => ({
                term: num,
                frequency: tableOptions[num].secondTermFrequency
            }))
            .sort((a, b) => {
                // Ordenação primária: frequência descendente
                if (b.frequency !== a.frequency) {
                    return b.frequency - a.frequency;
                }
                // Ordenação secundária: termo ascendente (para ordem estável entre empates)
                return parseInt(a.term) - parseInt(b.term);
            });

        if (candidatesForHighestFrequency.length > 0) {
            const topThreeTerms = candidatesForHighestFrequency.slice(0, 3).map(item => item.term);
            let highFrequencyMessage = `Segundos termos com maior frequência para: ${topThreeTerms.join(", ")}`;
            if (candidatesForHighestFrequency.length > 3) {
                highFrequencyMessage += "...";
            }
            lines.push(highFrequencyMessage + ".");
        }

        let finalText = lines.join("\n").trim();

        // Fallback se nenhuma mensagem específica foi gerada
        if (!finalText && allTermKeys.length > 0) {
            // Se havia "Primeiros termos desabilitados" mas não todos, e as outras condições não geraram linhas,
            // pode ser que todos os sliders estejam > 0 e não haja desabilitados.
            // Ou todos os sliders estão em 0 (coberto pela parte 2).
            // Este fallback é mais para o caso de todos os primeiros termos estarem habilitados
            // e todas as frequências de segundos termos serem > 0 e não haver "desabilitados" (0%).
            // E não haver suficientes para "maior frequência" ou a lógica falhar.
            if (lines.length === 0) { // Nenhuma das condições anteriores foi atendida
                finalText = "Todas as opções de tabuada estão ativas com frequência padrão ou personalizada.";
            }
        } else if (!finalText && allTermKeys.length === 0) {
            finalText = "Nenhuma opção de tabuada configurada.";
        }


        set({ _referenceTextCache: finalText, _lastTableOptionsHash: currentHash });
        return finalText;
    },

    // Action para resetar configurações
    resetConfig: () => set({
        playerName: "",
        gameMode: "tabuada",
        answerTime: 10,
        numberOfQuestions: 20,
        tableOptions: {
            1: { firstTermEnabled: true, secondTermFrequency: 50 },
            2: { firstTermEnabled: true, secondTermFrequency: 50 },
            3: { firstTermEnabled: true, secondTermFrequency: 50 },
            4: { firstTermEnabled: false, secondTermFrequency: 50 },
            5: { firstTermEnabled: true, secondTermFrequency: 50 },
            6: { firstTermEnabled: true, secondTermFrequency: 50 },
            7: { firstTermEnabled: true, secondTermFrequency: 50 },
            8: { firstTermEnabled: true, secondTermFrequency: 50 },
            9: { firstTermEnabled: true, secondTermFrequency: 50 }
        },
        _referenceTextCache: null,
        _lastTableOptionsHash: null
    })
}))

export default useConfigStore
