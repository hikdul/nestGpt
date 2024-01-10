// ! esta son las voces disponible en openia en el momentoen que se hizo el curso
type voicesTyPE = "nova" | "alloy" | "echo" | "fable" | "onyx" | "shimmer"

export const voices = [
    {'nova'    : 'nova'    },
    {'alloy'   : 'alloy'   },
    {'echo'    : 'echo'    },
    {'fable'   : 'fable'   },
    {'onyx'    : 'onyx'    },
    {'shimmer' : 'shimmer' }
]


export const selectVoice = (voice:string):voicesTyPE => voices[voice] ?? 'nova'