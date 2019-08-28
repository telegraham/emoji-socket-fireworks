import './index.scss';

import EmojiCanvasSet from './EmojiCanvasSet'
import ThreeDeeRenderer from './ThreeDeeRenderer'
import Firework from './Firework'


import ActionCable from 'actioncable'

const emojiCanvases = new EmojiCanvasSet();
const threeDR = new ThreeDeeRenderer();



var context=new AudioContext()
var o=null
var g=null
function example1(){o=context.createOscillator()
o.type="sine"
o.connect(context.destination)
o.start()}
function example2(){o=context.createOscillator()
g=context.createGain()
o.connect(g)
g.connect(context.destination)
o.start(0)}
function example2Stop(decreaseTime){g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+decreaseTime)}
function example3(type,x){o=context.createOscillator()
g=context.createGain()
o.connect(g)
o.type=type
g.connect(context.destination)
o.start(0)
g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+x)}
function example4(frequency,type){o=context.createOscillator()
g=context.createGain()
o.type=type
o.connect(g)
o.frequency.value=frequency
g.connect(context.destination)
o.start(0)
g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+1)}

 
var cable = ActionCable.createConsumer('wss://emoji-firework-api.herokuapp.com/cable')
 
cable.subscriptions.create('FireworkChannel', {
  // normal channel code goes here...
  received: data => {

    const strux = document.querySelector(".instructions")
    strux.classList.add("fireworking")
    example3('sine', 1.5)
    console.log(data)
    const firework = new Firework({
      createMesh: function(){
        const canvas = emojiCanvases.getOrMake(data.emoji)
        return threeDR.addGeometry(canvas); //mesh
      },
      render: function(){
        threeDR.render()
      },
      done: function() {
        strux.classList.remove("fireworking")
      }
    })

    firework.go()

  }
});





