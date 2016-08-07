let john_slides = [
  {
    charmsg         : 'he',
    slide           : 'D3.3',
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
        slideToLoad  : 'D4.1',
        reactionType : 'buttons'
      }
    ]
  },
  {
    slide                 : 'D4.1',
    description           : 'johns-number-exchange',
    special               : true,
    specialType           : 'audio',
    header                : 'Number Exchange',
    audioFile             : 'First_Impressions_He',
    gender                : 'he',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : 'D4.2'
  },
  {
    slide         : 'D4.2',
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
        slideToLoad    : 'D4.3',
      }
    ]
  },
  {
    slide           : 'D4.3',
    description     : 'hello2',
    messages        : [
      {
        sender    : 'narrator',
        content   : 'By the way, I should mention everything here is collected from a couple\'s text history, documenting their first 48 hours of courtship.',
        skipDelay : true,
        delay     : 1000
      },
      {
        sender  : 'narrator',
        content : 'Their names have been changed of course.',
        delay   : 1000
      },
      {
        sender  : 'narrator',
        content : 'Shall we continue?',
        delay   : 1000
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
            sender  : 'narrator',
            content : "Back to Sue then..."
          }
        ]
      },
      {
        prompt               : 'No wait!',
        deckLoad             : false,
        routeLoad            : false,
        reactionType         : 'buttons',
        loadAdditionalSlides : true,
        slidesToLoad         : [
          {
            charmsg         : 'she',
            slide           : 'D4.3A',
            description     : 'context-eh',
            messages        : [
              {
                sender  : 'narrator',
                content : "So You're a context person huh?",
                delay   : 1000
              }
            ],
            reaction        : true,
            reactionType    : 'buttons',
            reactionOptions : [
              {
                deckLoad       : true,
                reactionType   : 'User Selection',
                loadMore       : true,
                messagesToLoad : [
                  {
                    sender  : 'narrator',
                    content : "These are real people, real texts, real pictures, real voices."
                  },
                  {
                    sender  : 'narrator',
                    content : "Imagine creating a scrapbook of memories from newsfeeds, voicemails, handwritten notes on the back of napkins...",
                    delay   : 3000
                  },
                  {
                    sender  : 'narrator',
                    content : "Then publishing those memories inside a chatroom such as this...",
                    delay   : 2000
                  }
                ]
              }
            ]
          },
          {
            charmsg         : 'she',
            slide           : 'D4.4',
            description     : 'following-me',
            messages        : [
              {
                sender  : 'narrator',
                content : "Are you following me?",
                delay   : 1000
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
                    sender  : 'narrator',
                    content : "Back to Sue then..."
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
                    sender  : 'narrator',
                    content : "Back to Sue then..."
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

export default john_slides;