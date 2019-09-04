module.exports = {
    visa:{
        niceType: 'Visa',
        type: 'visa',
        patterns: [
            4
        ],
        gaps: [4, 8, 12],
        lengths: [16, 18, 19],
        code: {
            name: 'CVV',
            size: 3
        }
    },
    mastercard:{
        niceType: 'Mastercard',
        type: 'mastercard',
        patterns: [
            [51, 55],
            [2221, 2229],
            [223, 229],
            [23, 26],
            [270, 271],
            2720
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: 'CVC',
            size: 3
        }
    },
    americanExpress:{
        niceType: 'American Express',
        type: 'american-express',
        patterns: [
            34,
            37
        ],
        gaps: [4, 10],
        lengths: [15],
        code: {
            name: 'CID',
            size: 4
        }
    },
    dinersClub: {
        niceType: 'Diners Club',
        type: 'diners-club',
        patterns: [
            [300, 305],
            36,
            38,
            39
        ],
        gaps: [4, 10],
        lengths: [14, 16, 19],
        code: {
            name: 'CVV',
            size: 3
        }
    },
    discover: {
        niceType: 'Discover',
        type: 'discover',
        patterns: [
            6011,
            [644, 649],
            [650000, 650030],
            650034,
            [650052, 650404],
            [650440, 650484],
            [650539, 650540],
            [650599, 650699],
            650719,
            [650728, 650900],
            [650979, 651651],
            [651680, 654999],
            655020,
            66
        ],
        gaps: [4, 8, 12],
        lengths: [16, 19],
        code: {
            name: 'CID',
            size: 3
        }
    },
    jcb: {
        niceType: 'JCB',
        type: 'jcb',
        patterns: [
            2131,
            1800,
            [3528, 3589]
        ],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: 'CVV',
            size: 3
        }
    },
    unionpay: {
        niceType: 'UnionPay',
        type: 'unionpay',
        patterns: [
            620, 623, 624, 625, 626,
            [62100, 62182],
            62184, 62185, 62186, 62187,
            [62185, 62197],
            62200, 62201, 62202, 62203, 62204, 62205,
            [622010, 622999],
            62207, 62208, 62209,
            [622126, 622925],
            6270, 6272, 6276,
            [627700, 627779],
            [627781, 627799],
            6282, 6283, 6284, 6285, 6286, 6287, 6288, 6289, 6291, 6292
        ],
        gaps: [4, 8, 12],
        lengths: [14, 15, 16, 17, 18, 19],
        code: {
            name: 'CVN',
            size: 3
        }
    },
    maestro: {
        niceType: 'Maestro',
        type: 'maestro',
        patterns: [
            493698,
            [500000, 506698],
            [506779, 508999],
            [56, 59],
            // mapped these out so they don't collide with discover card
            [61, 63],
            [67, 69]
        ],
        gaps: [4, 8, 12],
        lengths: [12, 13, 14, 15, 16, 17, 18, 19],
        code: {
            name: 'CVC',
            size: 3
        }
    },
    elo: {
        niceType: 'Elo',
        type: 'elo',
        patterns: [
            401178,
            401179,
            438935,
            457631,
            457632,
            431274,
            451416,
            457393,
            504175,
            [506699, 506778],
            [509000, 509999],
            627780,
            636297,
            636368,
            [650031, 650033],
            [650035, 650051],
            [650405, 650439],
            [650485, 650538],
            [650541, 650598],
            [650700, 650718],
            [650720, 650727],
            [650901, 650978],
            [651652, 651679],
            [655000, 655019],
            [655021, 655058]
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: 'CVE',
            size: 3
        }
    },
    mir: {
        niceType: 'Mir',
        type: 'mir',
        patterns: [
            [2200, 2204]
        ],
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: 'CVP2',
            size: 3
        }
    },
    hiper: {
        niceType: 'Hiper',
        type: 'hiper',
        patterns: [
            637095,
            637568,
            637599,
            637609,
            637612
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: 'CVC',
            size: 3
        }
    },
    hipercard: {
        niceType: 'Hipercard',
        type: 'hipercard',
        patterns: [
            606282
        ],
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: 'CVC',
            size: 3
        }
    }
};