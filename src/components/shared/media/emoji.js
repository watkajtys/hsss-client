var thumbs_up     = require('../../../images/emoji/thumbs_up.png');
var thumbs_down   = require('../../../images/emoji/thumbs_down.png');
var shitty        = require('../../../images/emoji/shitty.png');
var question      = require('../../../images/emoji/question.png');
var nope          = require('../../../images/emoji/nope.png');
var love_eyes_cat = require('../../../images/emoji/love_eyes_cat.png');
var interrobang   = require('../../../images/emoji/interrobang.png');
var celebration   = require('../../../images/emoji/celebration.png');
var appreciation  = require('../../../images/emoji/appreciation.png');
var hundred       = require('../../../images/emoji/hundred.png');
var fuego         = require('../../../images/emoji/fuego.png');
var broken_heart  = require('../../../images/emoji/broken_heart.png');
var heart         = require('../../../images/emoji/heart.png');
var okay          = require('../../../images/emoji/okay.png');
var hug           = require('../../../images/emoji/hug.png');
var love_eyes     = require('../../../images/emoji/love_eyes.png');
var o_face        = require('../../../images/emoji/o_face.png');
var bolt_face     = require('../../../images/emoji/bolt_face.png');
var tear          = require('../../../images/emoji/tear.png');
var super_happy   = require('../../../images/emoji/super_happy.png');
var enter         = require('../../../images/emoji/enter.png');

function emojiAssign(emoji) {
  switch (emoji) {
    case 'thumbs_up' :
      return thumbs_up;
    case 'thumbs_down' :
      return thumbs_down;
    case 'okay' :
      return okay;
    case 'shitty' :
      return shitty;
    case 'fuego' :
      return fuego;
    case 'question' :
      return question;
    case 'nope' :
      return nope;
    case 'love_eyes_cat':
      return love_eyes_cat;
    case 'love_eyes' :
      return love_eyes;
    case 'interrobang' :
      return interrobang;
    case 'celebration' :
      return celebration;
    case 'appreciation' :
      return appreciation;
    case 'hundred' :
      return hundred;
    case 'heart' :
      return heart;
    case 'broken_heart':
      return broken_heart;
    case 'hug' :
      return hug;
    case 'o_face' :
      return o_face;
    case 'bolt_face':
      return bolt_face;
    case 'tear':
      return tear;
    case 'super_happy' :
      return super_happy;
    case 'enter' :
      return enter;
    default :
      return thumbs_up
  }
}

export {emojiAssign};