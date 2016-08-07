let sue_slides = [
  {
    charmsg         : 'she',
    slide           : 'D3.3',
    slideOrder      : 2,
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
        slideToLoad  : 'D4.1',
        reactionType : 'buttons'
      }
    ]
  },
  {
    slide                 : 'D4.1',
    description           : 'sues-number-exchange',
    special               : true,
    specialType           : 'audio',
    header                : 'Number Exchange',
    audioFile             : 'First_Impressions_She',
    gender                : 'she',
    lockHorizontal        : true,
    loadNextAutomatically : true,
    nextSlide             : 'D4.2'
  },
  {
    slide         : 'D4.2',
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
        slideToLoad    : 'D4.3',
      }
    ]
  },
  {
    slide           : 'D4.3',
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
        sender  : 'narrator',
        content : 'Shall we continue?',
        delay   : 1500
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
            slideToLoad : 'D5.1'
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
  },
  {
    slide                 : 'D5.1',
    description           : 'sues-first-impressions',
    special               : true,
    specialType           : 'audio',
    header                : 'First Impressions',
    audioFile             : 'First_Impressions_She',
    gender                : 'she',
    lockHorizontal        : true,
    loadNextAutomatically : false,
    nextSlide             : 'D4.2'
  }
];

export default sue_slides;