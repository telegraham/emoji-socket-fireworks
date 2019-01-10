import './index.scss';

import EmojiCanvasSet from './EmojiCanvasSet'
import ThreeDeeRenderer from './ThreeDeeRenderer'
import Firework from './Firework'

import ActionCable from 'actioncable'

const emojiCanvases = new EmojiCanvasSet();
const threeDR = new ThreeDeeRenderer();

 
var cable = ActionCable.createConsumer('wss://emoji-firework-api.herokuapp.com/cable')
 
cable.subscriptions.create('FireworkChannel', {
  // normal channel code goes here...
  received: data => {

    const firework = new Firework({
      createMesh: function(){
        const canvas = emojiCanvases.getOrMake(data.emoji)
        return threeDR.addGeometry(canvas); //mesh
      },
      render: function(){
        threeDR.render()
      }
    })

    firework.go()

  }
});





