let sue_slides = [
  {
    charmsg         : 'she',
    slide           : '3.3',
    description     : 'okay-sues-side',
    visibleHeader   : true,
    messages        : [
      {
        sender        : 'sue',
        content       : "Hi there!",
        delay         : 2000,
        skipDelay     : true,
        displayAvatar : true
      },
      {
        sender  : 'sue',
        content : "Here is my side of the story",
        delay   : 2000
      },
      {
        sender         : 'sue',
        content        : "(You can switch to John's side at any point by swiping right)",
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
    description           : 'sues-number-exchange',
    special               : true,
    specialType           : 'audio',
    header                : 'Number Exchange',
    audioFile             : 'First_Impressions_She',
    gender                : 'she',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '4.2'
  },
  {
    slide         : '4.2',
    description   : 'sue-and-john-exchange',
    charmsg       : 'she',
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
        slideToLoad    : '4.2.A',
      }
    ]
  },
  {
    slide           : '4.2.A',
    description     : 'hello2',
    visibleHeader   : true,
    messages        : [
      {
        sender    : 'narrator',
        content   : 'By the way, I should mention everything here is collected from a couple\'s text history, documenting their first 48 hours of courtship.',
        skipDelay : true,
        delay     : 2000
      },
      {
        sender  : 'narrator',
        content : 'Their names have been changed of course.',
        delay   : 1500
      },
      {
        sender         : 'narrator',
        content        : 'Shall we continue?',
        delay          : 1500,
        lastMsgInBlock : true,
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt         : 'Yes Please!',
        deckLoad       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender      : 'narrator',
            content     : "Back to Sue then...",
            slideLoad   : true,
            slideToLoad : '5.1'
          }
        ]
      },
      {
        prompt       : 'No wait!',
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '4.2.B'
      }
    ]
  },
  {
    slide         : '4.2.B',
    parent        : '4.2',
    description   : 'context-eh',
    visibleHeader : true,
    messages      : [
      {
        sender  : 'narrator',
        content : "You're a context person, huh?",
        delay   : 1000
      },
      {
        sender  : 'narrator',
        content : "These are real people, real texts, real pictures, real voices.",
        delay   : 2000
      },
      {
        sender  : 'narrator',
        content : "Imagine creating a scrapbook of memories from newsfeeds, voicemails, handwritten notes on the back of napkins...",
        delay   : 2000
      },
      {
        sender         : 'narrator',
        content        : "Then publishing those memories inside a chatroom such as this...",
        lastMsgInBlock : true,
        delay          : 1500,
        slideLoad      : true,
        slideToLoad    : '4.2.C',
      }
    ]
  },
  {
    slide           : '4.2.C',
    parent          : '4.2',
    description     : 'following-me',
    visibleHeader   : true,
    messages        : [
      {
        sender         : 'narrator',
        content        : "Are you following me?",
        delay          : 1000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt         : 'Yes',
        returnTo       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender         : 'narrator',
            content        : "Back to Sue then...",
            slideLoad      : true,
            slideToLoad    : '5.1',
            lastMsgInBlock : true
          }
        ]
      },
      {
        prompt         : 'No',
        deckLoad       : false,
        routeLoad      : false,
        reactionType   : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender         : 'narrator',
            content        : "Back to Sue then...",
            lastMsgInBlock : true
          }
        ]
      }
    ]
  },
  {
    slide                 : '5.1',
    parent                : '5.1',
    description           : 'sues-first-impression',
    special               : true,
    specialType           : 'audio',
    header                : 'First Impressions',
    audioFile             : 'herNumberExchange',
    gender                : 'she',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '6.1'
  },
  {
    slide         : '6.1',
    parent        : '6.1',
    description   : 'sue-and-john-cuddle-exchange',
    charmsg       : 'she',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'sue',
        content        : 'In the cuddle room. Come cuddle',
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
        delay          : 500,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '6.2'
      }
    ]
  },
  {
    slide                 : '6.2',
    parent                : '6.2',
    description           : 'cuddle_room_sue',
    special               : true,
    specialType           : 'audio',
    header                : 'The Cuddle Room',
    audioFile             : 'herCuddleRoom',
    gender                : 'she',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '7.1'
  },
  {
    charmsg         : 'she',
    slide           : '7.1',
    parent          : '7.1',
    description     : 'meant-said-slider',
    visibleHeader   : true,
    messages        : [
      {
        sender         : 'narrator',
        content        : "Do you think she meant what she said?",
        delay          : 1000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'emojikeyboard',
    reactionOptions : [
      {
        prompt       : '-1',
        returnTo     : false,
        routeLoad    : false,
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.A',
      },
      {
        prompt       : '1',
        deckLoad     : false,
        routeLoad    : false,
        reactionType : 'buttons',
        slideLoad    : true,
        slideToLoad  : '7.1.B',
      }
    ]
  },
  {
    charmsg         : 'she',
    slide           : '7.1.A',
    parent          : '7.1',
    description     : 'partial-truth-sue',
    visibleHeader   : true,
    messages        : [
      {
        sender         : 'narrator',
        content        : "So maybe Sue told a partial truth?",
        delay          : 1000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt       : 'Yes maybe',
        reactionType : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender  : 'narrator',
            content : "appreciation",
            emoji   : 'appreciation',
            delay   : 2000
          },
          {
            sender         : 'narrator',
            content        : "Let's see what her friend has to say...48 hours later.",
            lastMsgInBlock : true,
            delay          : 1500,
            slideLoad      : true,
            slideToLoad    : '7.1.C',
          }
        ]
      },
      {
        prompt       : 'No she lied',
        reactionType : 'buttons',
        loadMore       : true,
        messagesToLoad : [
          {
            sender  : 'narrator',
            content : "appreciation",
            emoji   : 'appreciation',
            delay   : 2000
          },
          {
            sender         : 'narrator',
            content        : "Let's see what her friend has to say...48 hours later.",
            lastMsgInBlock : true,
            delay          : 1500,
            slideLoad      : true,
            slideToLoad    : '7.1.C',
          }
        ]
      }
    ]
  },
  {
    slide         : '7.1.C',
    parent        : '7.1',
    description   : 'sue-and-friend-first-exchange',
    charmsg       : 'she',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'sue',
        content        : 'How was your night woman?! Also...Superbowl plans?',
        skipDelay      : true,
        delay          : 1000,
        displayAvatar  : true,
        lastMsgInBlock : true
      },
      {
        sender         : 'friend',
        content        : 'Ended being a low key night, which is fine. No super bowl plans... What are you gonna do?',
        delay          : 1500,
        displayAvatar  : true,
        lastMsgInBlock : true
      },
      {
        sender        : 'sue',
        content       : 'No plans yet...had a super intense with John. Got home only an hour ago. Need to decompress a bit then figure this super bowl stuff out',
        delay         : 2500,
        displayAvatar : true
      },
      {
        sender         : 'sue',
        content        : 'I hate Sunday nights...',
        delay          : 1500,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '7.1.D',
      }
    ]
  },
  {
    slide         : '7.1.D',
    parent        : '7.1',
    description   : 'sue-and-friend-second-exchange',
    charmsg       : 'she',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'sue',
        content        : 'Also, John has a girlfriend, and I don\'t care.',
        skipDelay      : true,
        delay          : 1000,
        displayAvatar  : true,
        lastMsgInBlock : true
      },
      {
        sender        : 'friend',
        content       : 'Re: John that\'s normal. For what u need now. Not thinking about later, it\'s not your problem.',
        delay         : 1500,
        displayAvatar : true
      },
      {
        sender         : 'friend',
        content        : 'And that\'s probably the article we need to write about what\'s wrong with the "living in the moment" global conscious movement. #lifecoach',
        delay          : 2500,
        lastMsgInBlock : true
      },
      {
        sender         : 'sue',
        content        : 'Yes! I\'m happy I\'ve found someone who\'s always supportive of me making glorious mistakes.',
        delay          : 1500,
        displayAvatar  : true,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '8.1',
      }
    ]
  },
  {
    charmsg     : 'she',
    slide       : '8.1',
    visibleHeader : true,
    description : 'transition',
    messages    : [
      {
        sender    : 'narrator',
        content   : "Moving on...",
        skipDelay : true,
        delay     : 1000
      },
      {
        sender  : 'narrator',
        content : "Looks like we\'re nearing the end...",
        delay   : 1500
      },
      {
        sender         : 'narrator',
        content        : "Got one more text left from John...",
        delay          : 1500,
        lastMsgInBlock : true,
        slideLoad      : true,
        slideToLoad    : '9.1'
      }
    ]
  },
  {
    slide                 : '9.1',
    description           : 'night_cap_sue',
    special               : true,
    specialType           : 'audio',
    header                : 'Night Cap',
    audioFile             : 'herNightCap',
    gender                : 'she',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : '9.2'
  },
  {
    slide         : '9.2',
    description   : 'john-home-safe',
    charmsg       : 'she',
    visibleHeader : true,
    messages      : [
      {
        sender         : 'john',
        content        : 'Hope you got home safe. I\'m going to wake up thinking about what a dope breakfast I\'m going to make us next time when you actually let me take you home. :)',
        delay          : 3000,
        displayAvatar  : true,
        lastMsgInBlock : true
      },
      {
        sender        : 'sue',
        content       : '',
        delay         : 4000,
        displayAvatar : true,
        slideLoad     : true,
        slideToLoad   : '9.3'
      }
    ]
  },
  {
    charmsg         : 'she',
    slide           : '9.3',
    description     : 'night-cap-impression-of-sue',
    visibleHeader   : true,
    messages        : [
      {
        sender         : 'narrator',
        content        : "What is your impression of Sue?",
        delay          : 1000,
        lastMsgInBlock : true
      }
    ],
    reaction        : true,
    reactionType    : 'buttons',
    reactionOptions : [
      {
        prompt       : 'dislike',
        reactionType : 'buttons'
      },
      {
        prompt       : 'like',
        reactionType : 'buttons'
      }
    ]
  }
];

export default sue_slides;