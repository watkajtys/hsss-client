import sue_slides from './sue';
import john_slides from './john'

let intro_script = [{
  deck                  : '0',
  slide                 : 'D1',
  description           : 'start',
  special               : true,
  specialType           : 'splash',
  loadNextAutomatically : true,
  messages              : [
    {
      sender  : 'narrator',
      content : 'An interactive story about dating in the digital age'
    }
  ]
},
  {
    deck            : '1',
    slide           : 'D2.1',
    description     : 'hello',
    messages        : [
      {
        sender         : 'narrator',
        content        : 'Hello!',
        skipDelay      : true,
        delay          : 1000,
        lastMsgInBlock : true
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
            sender         : 'narrator',
            content        : "Let's get started, shall we?",
            lastMsgInBlock : true
          }
        ],
        additionalPrompt : true,
        promptFollowUp   : [
          {
            prompt      : 'Ok!',
            slideLoad   : true,
            slideToLoad : 'D2.2'
          }
        ]
      }
    ]
  },
  {
    container             : 'story',
    description           : 'story-container',
    slide                 : 'D2.2',
    episodeToStart        : 'D3',
    deck                  : '2',
    order                 : 1,
    tense                 : 'present',
    special               : true,
    specialType           : 'intro',
    loadNextAutomatically : true,
    textBlock             : [
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
    slide       : 'D3',
    sections    : [
      {
        container       : 'JOHN',
        description     : 'john-container',
        customClass     : 'heSlider',
        characterSlides : john_slides
      },
      {
        container       : 'SUE',
        description     : 'sue-container',
        customClass     : 'sheSlider',
        characterSlides : sue_slides
      }
    ]
  }
];

export default intro_script;