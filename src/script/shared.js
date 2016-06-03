let intro_script = [{
  deck        : '1',
  special     : true,
  specialType : 'splash',
  messages    : [
    {
      sender  : 'narrator',
      content : 'An interactive story about dating in the digital age'
    }
  ]
},

  {
    deck            : '2',
    messages        : [
      {
        sender  : 'narrator',
        content : 'Hello!'
      }
    ],
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt     : 'Hello?',
        deckLoad   : true,
        deckAction : '2_a'
      }
    ]
  },
  {
    deck            : '2_a',
    tense           : 'present',
    description     : 'Narrator Introduction Part2',
    messages        : [
      {
        sender  : 'narrator',
        content : 'Who am I you must be wondering...'
      },
      {
        sender  : 'narrator',
        content : "I'm the creative director of He Said/She Said, also your narrator today"
      },
      {
        sender  : 'narrator',
        content : "You know those people who do the long voice overs at the beginning and end of every episode?"
      },
      {
        sender  : 'narrator',
        content : "Except I'm sparing you the voiceovers, the montage, and the saccharine music, well sort of..."
      },
      {
        sender  : 'narrator',
        content : "Anyway... I suggest using headphones for the voice message portion :)"
      },
      {
        sender  : 'narrator',
        content : "Let's get started, shall we?"
      }
    ],
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt     : 'Ok!',
        deckLoad   : true,
        deckAction : '3'
      }
    ]
  },
  {
    deck            : '3',
    tense           : 'present',
    description     : 'Character Introduction',
    special         : true,
    specialType     : 'takeovers',
    takeover        : [
      {
        sender  : 'narrator',
        content : "Between what is said and not meant, and what is meant and not said, most of love is lost."
      },
      {
        sender  : 'narrator',
        content : "John, a tech entrepreneur, met Sue, a freelance writer, at a Bushwick rave."
      },
      {
        sender  : 'narrator',
        content : "At the time of meeting, they were in an open relationship with other people."
      }
    ],
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt     : 'He',
        deckLoad   : true,
        deckAction : '4'
      },
      {
        prompt      : "She",
        deckLoad    : false,
        routeLoad   : true,
        routeAction : '4S'
      }
    ]
  }
];

export default intro_script;