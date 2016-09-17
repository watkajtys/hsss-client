let john_slides = [
  {
    charmsg         : 'he',
    slide           : '3.3',
    slideOrder      : 2,
    description     : 'okay-john-side',
    visibleHeader   : true,
    messages        : [
      {
        sender        : 'john',
        content       : "Howdy!",
        delay         : 2000,
        skipDelay     : true,
        displayAvatar : true
      },
      {
        sender  : 'john',
        content : "Here is my side of the story",
        delay   : 2000
      },
      {
        sender         : 'john',
        content        : "(You can switch to Sues's side at any point by swiping right)",
        delay          : 2000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt       : 'Thumbs Up',
        emoji        : 'thumbs_up',
        slideLoad    : true,
        slideToLoad  : '4.1',
        reactionType : 'buttons'
      }
    ]
  },
  {
    slide                 : '4.1',
    description           : 'johns-number-exchange',
    special               : true,
    specialType           : 'audio',
    header                : 'Number Exchange',
    audioFile             : 'First_Impressions_He',
    gender                : 'he',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '4.2'
  },
  {
    slide         : '4.2',
    description   : 'sue-and-john-exchange',
    charmsg       : 'he',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'john',
        content        : 'Sue',
        skipDelay      : true,
        delay          : 1000,
        displayAvatar  : true,
        lastMsgInBlock : true
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
        sender         : 'john',
        content        : 'Ha. John. If I don\'t see you again for the rest of the night, your lips will still be the only thing on my mind',
        delay          : 1500,
        displayAvatar  : true,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '5.1',
      }
    ]
  },
  {
    slide                 : '5.1',
    description           : 'johns-first-impressions',
    special               : true,
    specialType           : 'audio',
    header                : 'First Impressions',
    audioFile             : 'hisNumberExchange',
    gender                : 'he',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '5.1.A'
  },
  {
    slide           : '5.1.A',
    description     : 'she-wearing',
    visibleHeader   : true,
    messages        : [
      {
        sender    : 'narrator',
        content   : 'What do you think she was wearing?',
        skipDelay : true,
        delay     : 2000
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt         : 'A white top',
        deckLoad       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender  : 'narrator',
            content : "Wrong",
            emoji   : 'wrong'
          },
          {
            sender      : 'narrator',
            content     : 'Back to texting',
            delay       : 2000,
            slideLoad   : true,
            slideToLoad : '6.1'
          }
        ]
      },
      {
        prompt         : 'Nothing like he described',
        deckLoad       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender  : 'narrator',
            content : "Correct",
            emoji   : 'correct'
          },
          {
            sender  : 'narrator',
            content : 'You\'re right...Her eyes were more important :)',
            delay   : 2000
          },
          {
            sender      : 'narrator',
            content     : 'Back to texting',
            delay       : 2000,
            slideLoad   : true,
            slideToLoad : '6.1'
          }
        ]
      },
      {
        prompt         : 'Why is this important?',
        deckLoad       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : 'Back to texting',
            delay       : 2000,
            slideLoad   : true,
            slideToLoad : '6.1'
          }
        ]
      }
    ]
  },
  {
    slide         : '6.1',
    description   : 'john-cuddle-exchange',
    charmsg       : 'he',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'sue',
        content        : 'In the cuddle room. Come cuddle.',
        skipDelay      : true,
        delay          : 1000,
        displayAvatar  : true,
        lastMsgInBlock : true
      },
      {
        sender        : 'john',
        content       : 'Sounds like a good idea.',
        delay         : 1500,
        displayAvatar : true
      },
      {
        sender         : 'john',
        content        : 'En route.',
        delay          : 1000,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '6.2',
      },
    ]
  },
  {
    slide                 : '6.2',
    description           : 'john-cuddle-room-audio',
    special               : true,
    specialType           : 'audio',
    header                : 'Cuddle Room',
    audioFile             : 'hisCuddleRoom',
    gender                : 'he',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '7.1'
  },
  {
    charmsg         : 'he',
    slide           : '7.1',
    description     : 'meant-said-he-slider',
    visibleHeader   : true,
    messages        : [
      {
        sender         : 'narrator',
        content        : "Do you think John meant what he said?",
        delay          : 1000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt       : '>5',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.A',
      },
      {
        prompt       : '5',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.B',
      },
      {
        prompt       : '<5',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.C',
      }
    ]
  },
  {
    charmsg         : 'he',
    slide           : '7.1.A',
    description     : 'can-you-think-of-a-time',
    visibleHeader   : true,
    messages        : [
      {
        sender         : 'narrator',
        content        : "Can you think of a time when you meant more than you said?",
        delay          : 1000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt       : 'Yes',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.B',
      },
      {
        prompt       : 'No',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.C',
      },
      {
        prompt       : 'Not sure',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.C',
      }
    ]
  },
  {
    slide           : '7.1.B',
    parent          : 'D7',
    description     : 'remember-like-q',
    visibleHeader   : true,
    messages        : [
      {
        sender    : 'narrator',
        content   : 'Like...?',
        skipDelay : true,
        delay     : 2000
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt         : 'Open Ended...',
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : "Appreciation",
            emoji       : 'appreciation',
            slideLoad   : true,
            slideToLoad : '7.1.C'
          }
        ]
      }
    ]
  },
  {
    slide         : '7.1.C',
    description   : 'narrator-breakup',
    charmsg       : 'he',
    visibleHeader : true,
    messages      : [
      {
        sender        : 'narrator',
        content       : 'I remember when my ex and I finally had the breakup talk...',
        skipDelay     : true,
        delay         : 1000,
        displayAvatar : true
      },
      {
        sender  : 'narrator',
        content : 'The last thing I said to him was, "See you later."',
        delay   : 1500
      },
      {
        sender         : 'narrator',
        content        : 'But now thinking back, I think what I really meant was - "Take care and be happy"',
        delay          : 2000,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '7.1.D',
      }
    ]
  },
  {
    slide           : '7.1.D',
    description     : 'always-mean-what-you-say',
    visibleHeader   : true,
    messages        : [
      {
        sender    : 'narrator',
        content   : 'Do you always mean what you say?',
        skipDelay : true,
        delay     : 2000
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt         : 'Yes',
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : "Thumbs Up",
            emoji       : 'thumbs_up',
            slideLoad   : true,
            slideToLoad : '7.1.E'
          }
        ]
      },
      {
        prompt         : 'No',
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : "Thumbs Down",
            emoji       : 'thumbs_down',
            slideLoad   : true,
            slideToLoad : '7.1.E'
          }
        ]
      },
      {
        prompt         : 'Not sure',
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : "Question",
            emoji       : 'question',
            slideLoad   : true,
            slideToLoad : '7.1.E'
          }
        ]
      }
    ]
  },
  {
    slide           : '7.1.E',
    description     : 'overstated-things',
    visibleHeader   : true,
    messages        : [
      {
        sender    : 'narrator',
        content   : 'Can you think of a time when you\'ve overstated and meant less than what you said?',
        skipDelay : true,
        delay     : 2000
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt       : 'Yes',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.F'
      },
      {
        prompt       : 'No',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.G'
      },
      {
        prompt       : 'Not sure',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.G'
      }
    ]
  },
  {
    slide           : '7.1.F',
    parent          : 'D7',
    description     : 'like...overstated',
    visibleHeader   : true,
    messages        : [
      {
        sender    : 'narrator',
        content   : 'Like...?',
        skipDelay : true,
        delay     : 2000
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt         : 'Open Ended...',
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : "Appreciation",
            emoji       : 'appreciation',
            slideLoad   : true,
            slideToLoad : '7.1.G'
          }
        ]
      }
    ]
  },
  {
    slide         : '7.1.G',
    description   : 'see-family',
    charmsg       : 'he',
    visibleHeader : true,
    messages      : [
      {
        sender        : 'narrator',
        content       : 'I see my family once or twice a year.',
        skipDelay     : true,
        delay         : 1000,
        displayAvatar : true
      },
      {
        sender  : 'narrator',
        content : 'When it\'s time to go, I always say - "Catch up soon!" But we never do...',
        delay   : 1500
      },
      {
        sender         : 'narrator',
        content        : 'At least never properly. It might as well be - "See you in a year!"',
        delay          : 2000,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '8.1',
      }
    ]
  },
  {
    slide         : '8.1',
    description   : 'moving-on-to-end',
    charmsg       : 'he',
    visibleHeader : true,
    messages      : [
      {
        sender        : 'narrator',
        content       : 'Moving on...',
        skipDelay     : true,
        delay         : 1000,
        displayAvatar : true
      },
      {
        sender  : 'narrator',
        content : 'Looks like we\'re nearing the end...,',
        delay   : 1500
      },
      {
        sender         : 'narrator',
        content        : 'Got one more voice and text message from John.',
        delay          : 2000,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '9.1',
      }
    ]
  },
  {
    slide                 : '9.1',
    description           : 'johns-night-cap',
    special               : true,
    specialType           : 'audio',
    header                : 'Night Cap',
    audioFile             : 'hisNightCap',
    gender                : 'he',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '9.2'
  },
  {
    slide         : '9.2',
    description   : 'john-night-cap-exchange',
    charmsg       : 'he',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'john',
        content        : 'Hope you got home safe. I\'m going to wake up thinking about what a dope breakfast I\'m going to make us next time when you actually let me take you home. :)',
        delay          : 2500,
        displayAvatar  : true,
        lastMsgInBlock : true
      }
    ]
  },
];

export default john_slides;