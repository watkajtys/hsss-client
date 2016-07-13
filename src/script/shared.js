let intro_script = [{
  deck        : '0',
  description : 'start',
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
    deck            : '1',
    description     : 'hello',
    messages        : [
      {
        sender    : 'narrator',
        content   : 'Hello!',
        skipDelay : true,
        delay     : 1000
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt           : 'Hello?',
        deckLoad         : false,
        routeLoad        : false,
        reactionType     : 'buttons',
        loadMore         : true,
        messagesToLoad   : [
          {
            sender  : 'narrator',
            content : "I'm the creative director also your narrator today."
          },
          {
            sender  : 'narrator',
            content : "You know those people whose voiceovers come on when they want to confess sth?"
          },
          {
            sender  : 'narrator',
            content : "Except I'm sparing you the montage and the saccharine music, well sorta..."
          },
          {
            sender  : 'narrator',
            content : "I suggest using headphones for the next 4-5 minutes :)"
          },
          {
            sender  : 'narrator',
            content : "Let's get started, shall we?"
          }
        ],
        additionalPrompt : true,
        promptFollowUp   : [
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
    container   : 'story',
    description : 'story-container',
    deck        : '2',
    order       : 1,
    tense       : 'present',
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
          content : "SUE, a freelance writer, at a Bushwick rave.",
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
          sender  : 'narrator',
          content : 'Whose point of view do you want to experience first?',
          swipe   : true
        }
      ]
    ]
  },
  {
    description : 'bi',
    tense       : 'present',
    special     : true,
    specialType : 'bifurcate',
    sections    : [
      {
        container       : 'john',
        description     : 'john-container',
        order           : 0,
        characterSlides : [
          {
            slideDeck       : '3',
            charmsg         : 'he',
            messages        : [
              {
                sender  : 'narrator',
                content : "Okay...Here is John's side of the story."
              },
              {
                sender  : 'narrator',
                content : "(You can switch to Sue's perspective at any point by swiping left)"
              }
            ],
            reaction        : true,
            reactionType    : 'buttons',
            reactionOptions : [
              {
                prompt       : 'Thumbs Up',
                deckLoad     : true,
                reactionType : 'buttons'
              }
            ]
          },
          {
            slideDeck   : '4',
            description : 'john-number-exchange',
            special     : true,
            specialType : 'audio',
            header      : 'Number Exchange',
            audioFile   : 'file',
            gender      : 'he'
          }
        ]
      },
      {
        container       : 'sue',
        description     : 'sue-container',
        order           : 2,
        characterSlides : [
          {
            charmsg         : 'she',
            slideDeck       : '3',
            slideOrder      : 2,
            description     : 'okay-sues-side',
            messages        : [
              {
                sender  : 'narrator',
                content : "Howdy!",
                delay   : 1000
              },
              {
                sender  : 'narrator',
                content : "Here is my side of the story",
                delay   : 500
              },
              {
                sender  : 'narrator',
                content : "(You can switch to John's side at any point by swiping right)",
                delay   : 1000
              }
            ],
            reaction        : true,
            reactionType    : 'buttons',
            reactionOptions : [
              {
                prompt         : 'Thumbs Up',
                deckLoad       : true,
                reactionType   : 'buttons',
                loadMore       : true,
                messagesToLoad : [
                  {
                    sender  : 'narrator',
                    content : "Sue?"
                  }
                ]
              }
            ]
          },
          {
            slideDeck   : '4',
            description : 'sues-number-exchange',
            special     : true,
            specialType : 'audio',
            header      : 'Number Exchange!',
            audioFile   : 'file',
            gender      : 'she'
          },
          {
            deck        : '6',
            description : 'sue-and-john-exchange',
            charmsg     : 'she',
            messages    : [
              {
                sender        : 'john',
                content       : 'Sue',
                skipDelay     : true,
                delay         : 1000,
                displayAvatar : true
              },
              {
                sender        : 'sue',
                content       : 'John',
                delay         : 1500,
                displayAvatar : true
              },
              {
                sender         : 'sue',
                content        : 'Jon?',
                delay          : 1500,
                lastMsgInBlock : true
              },
              {
                sender        : 'john',
                content       : 'Ha. John. If I don\'t see you again for the rest of the night, your lips will still be the only thing on my mind',
                delay         : 1500,
                displayAvatar : true
              }
            ]
          },
          {
            deck            : '7',
            description     : 'hello2',
            messages        : [
              {
                sender    : 'narrator',
                content   : 'By the way, I should mention everything here is collected from a couple\'s text history, documenting their first 48 hours of courtship.',
                skipDelay : true,
                delay     : 1000
              },
              {
                sender    : 'narrator',
                content   : 'Their names have been changed of course.',
                delay     : 1000
              },
              {
                sender    : 'narrator',
                content   : 'Shall we continue?',
                delay     : 1000
              }
            ],
            reaction        : true,
            reactionType    : 'buttons',
            reactionOptions : [
              {
                prompt           : 'Yes Please!',
                deckLoad         : false,
                routeLoad        : false,
                reactionType     : 'buttons',
                loadMore         : true,
                messagesToLoad   : [
                  {
                    sender  : 'narrator',
                    content : "Back to Sue then..."
                  }
                ]
              },
              {
                prompt           : 'No wait!',
                deckLoad         : false,
                routeLoad        : false,
                reactionType     : 'buttons',
                loadMore         : true,
                messagesToLoad   : [
                  {
                    sender  : 'narrator',
                    content : "So you're a context person, huh?"
                  }
                ],
                additionalPrompt : true,
                promptFollowUp   : [
                  {
                    prompt     : 'Up'
                  },
                  {
                    prompt : 'Down'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default intro_script;