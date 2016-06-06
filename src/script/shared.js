let intro_script = [{
  deck        : '0',
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
    deck             : '1',
    messages         : [
      {
        sender  : 'narrator',
        content : 'Hello!'
      }
    ],
    messageFollowUps : true,
    messageFollowUp  : [
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
    reaction         : true,
    reactionType     : 'buttons',
    reactionOptions  : [
      {
        prompt         : 'Hello?',
        deckLoad       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        promptFollowUp : [
          {
            prompt     : 'Ok!',
            deckLoad   : true,
            deckAction : '3'
          }
        ]
      }
    ]
  },
  {
    deck        : '2',
    tense       : 'present',
    description : 'Character Introduction',
    special     : true,
    specialType : 'intro',
    textBlock   : [
      [
        {
          sender  : 'narrator',
          content : '"Between what is said and not meant,',
          id      : 'introMsg1'
        },
        {
          sender  : 'narrator',
          content : 'and what is meant and not said,',
          id      : 'introMsg2'
        },
        {
          sender  : 'narrator',
          content : 'most of love is lost."',
          id      : 'introMsg3'
        }
      ],
      [
        {
          sender  : 'narrator',
          content : "JOHN, a tech entrepreneur met",
          avatar  : 'john',
          id      : 'introMsg4'

        },
        {
          sender  : 'narrator',
          content : "SUE, a freelance writer, at a Bushwich rave.",
          avatar  : 'sue',
          id      : 'introMsg5'
        }
      ],
      [
        {
          sender  : 'narrator',
          content : 'At the time of meeting, they were in an open relationship with other people.',
          id      : 'introMsg6'
        }
      ],
      [
        {
          sender: 'narrator',
          content: 'Whose point of view do you want to experience first?',
          swipe: true
        }
      ]
    ]
  }
];

export default intro_script;