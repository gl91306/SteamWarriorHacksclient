dinnertime= ""
lunchtime = ""
breakfast = ""
bobe = false
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function wavToMp3(channels, sampleRate, samples) {
   var buffer = [];
   var mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
   var remaining = samples.length;
   var samplesPerFrame = 1152;
   for (var i = 0; remaining >= samplesPerFrame; i += samplesPerFrame) {
      var mono = samples.subarray(i, i + samplesPerFrame);
      var mp3buf = mp3enc.encodeBuffer(mono);
      if (mp3buf.length > 0) {
         buffer.push(new Int8Array(mp3buf));
      }
      remaining -= samplesPerFrame;
   }
   var d = mp3enc.flush();
   if (d.length > 0) {
      buffer.push(new Int8Array(d));
   }

   var mp3Blob = new Blob(buffer, {
      type: 'audio/mp3'
   });
   websocket.send(mp3Blob)

   var bUrl = window.URL.createObjectURL(mp3Blob);

   // send the download link to the console
   console.log('mp3 download:', bUrl);

}

function audioBufferToWav(aBuffer) {
   let numOfChan = aBuffer.numberOfChannels,
      btwLength = aBuffer.length * numOfChan * 2 + 44,
      btwArrBuff = new ArrayBuffer(btwLength),
      btwView = new DataView(btwArrBuff),
      btwChnls = [],
      btwIndex,
      btwSample,
      btwOffset = 0,
      btwPos = 0;
      console.log('emongus')
   setUint32(0x46464952); // "RIFF"
   console.log('1')
   setUint32(btwLength - 8); // file length - 8
   console.log('2')
   setUint32(0x45564157); // "WAVE"
   console.log('3')
   setUint32(0x20746d66); // "fmt " chunk
   console.log('4')
   setUint32(16); // length = 16
   console.log('5')
   setUint16(1); // PCM (uncompressed)
   setUint16(numOfChan);
   setUint32(aBuffer.sampleRate);
   console.log('6')
   setUint32(aBuffer.sampleRate * 2 * numOfChan);
   console.log('7') // avg. bytes/sec
   setUint16(numOfChan * 2); // block-align
   setUint16(16); // 16-bit
   setUint32(0x61746164); // "data" - chunk
   console.log('8')
   setUint32(btwLength - btwPos - 4); // chunk length

   for (btwIndex = 0; btwIndex < aBuffer.numberOfChannels; btwIndex++)
      btwChnls.push(aBuffer.getChannelData(btwIndex));

   while (btwPos < btwLength) {
      for (btwIndex = 0; btwIndex < numOfChan; btwIndex++) {
         // interleave btwChnls
         btwSample = Math.max(-1, Math.min(1, btwChnls[btwIndex][btwOffset])); // clamp
         btwSample = (0.5 + btwSample < 0 ? btwSample * 32768 : btwSample * 32767) | 0; // scale to 16-bit signed int
         btwView.setInt16(btwPos, btwSample, true); // write 16-bit sample
         btwPos += 2;
      }
      btwOffset++; // next source sample
   }

   let wavHdr = lamejs.WavHeader.readHeader(new DataView(btwArrBuff));
   let wavSamples = new Int16Array(btwArrBuff, wavHdr.dataOffset, wavHdr.dataLen / 2);

   wavToMp3(wavHdr.channels, wavHdr.sampleRate, wavSamples);

   function setUint16(data) {
      btwView.setUint16(btwPos, data, true);
      btwPos += 2;
   }

   function setUint32(data) {
      btwView.setUint32(btwPos, data, true);
      btwPos += 4;
   }
}

const download = (path, filename) => {
  // Create a new link
  const anchor = document.createElement('a');
  anchor.href = path;
  anchor.download = filename;

  // Append to the DOM
  document.body.appendChild(anchor);

  // Trigger `click` event
  anchor.click();

  // Remove element from DOM
  document.body.removeChild(anchor);
}; 

function sendrobo(message) {
  var div = document.createElement('div')
  classlist = "chat-bot bg-fuchsia-500 rounded-r-lg rounded-tl-lg shadow-md p-2 m-2 inline-block break-all"
  for (i in classlist.split(' ')) {
    div.classList.add(classlist.split(' ')[i])
  }
  div.style.float = "top"
  div.style.top = 0
  div.style.width = 'fit-content';
  div.style.height = 'fit-content';
  div.style.display = "block"
  var text = document.createElement('text')
  text.innerHTML = message
  div.appendChild(text)
  document.getElementById('chatbox').insertBefore(div, document.getElementById('chatbox').childNodes[0])
}

function sendhuman(message) {
  bobe = true
  var div = document.createElement('div')
  classlist = "chat-person bg-teal-500 rounded-l-lg rounded-tr-lg shadow-md p-2 m-2 inline-block break-all"
  for (i in classlist.split(' ')) {
    div.classList.add(classlist.split(' ')[i])
  }
  div.style.position = "relative"
  //div.style.right = "0px"
  div.style.width = 'fit-content';
  div.style.height = 'fit-content';
  div.style.display = "block"
  var text = document.createElement('text')
  text.innerHTML = message
  div.appendChild(text)
  divwidth = div.offsetWidth
  div.style.right = divwidth.toString() + 'px'
  document.getElementById('chatbox').insertBefore(div, document.getElementById('chatbox').childNodes[0])
  div.style.left = (document.getElementById('chatbox').offsetWidth - div.offsetWidth - 32).toString() + 'px'
}

document.body.onresize = function (e) {
  console.log('e')
  if (bobe == true) {
    bob = document.getElementsByClassName('chat-person')
    boxwidth = document.getElementById('chatbox').offsetWidth
    console.log(bob)
    console.log(bob[0].offsetWidth)
    for (i in bob) {
      var finalw = boxwidth - bob[i].offsetWidth - 32
      bob.item(i).style.left = finalw.toString() + 'px'
    }
  }
}

// wss
const websocket = new WebSocket('wss://ExcitableUnhealthyPerimeter.tedisc00l.repl.co');
websocket.onmessage = function (data) {
  console.log(data.data)
  if (data.data.includes('dinner:')) {
    dinnertime = data.data.split('dinner:')[1]
  }
  if (data.data.includes('breakfast:')) {
    breakfast = data.data.split('breakfast:')[1]
  }
  if (data.data.includes('lunch:')) {
    lunchtime = data.data.split('lunch:')[1]
  }
  if (data.data.includes('robo:')) {
    sendrobo(data.data.split('robo:')[1])
  }
};

// new speech recognition object
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();

speak = false

var temptime = setTimeout(console.log('e'), 1)
            
// This runs when the speech recognition service starts
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

recognition.onspeechend = function() {
    // when user is done speaking
    temptime = setTimeout(recognition.stop(), 1);
}

              
// This runs when the speech recognition service returns result
recognition.onresult = async function (event) {
    clearTimeout(temptime)
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    console.log(transcript)
    console.log(confidence)
    if (confidence < 0.50) {
      sendrobo( 'please speak clearly' )
    } else {
      sendhuman(transcript)
      helper = false
      if (transcript == localStorage.getItem('domcom')) {
        async function bill () {
          websocket.send(['46e0615d-b93a-42a8-89c5-8deb2d3c9488', 'domvio', 'recording start']);
          navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
            let data = [];

            const recorder = new MediaRecorder(stream);
            //audio.srcObject = stream;

            recorder.addEventListener('start', e => {
              console.log(data)
              data.length = 0;
            });

            recorder.addEventListener('dataavailable', event => {
              console.log(event.data)
              const ule = URL.createObjectURL(event.data);
              //download(ule, 'billie.mp3')
              data.push(event.data);
            });

            recorder.addEventListener('stop', async function ()  {
              console.log("recorder is stopped")
              const blob = new Blob(data);
              console.log(data[0].a)
              //blob.arrayBuffer().then(buffer => audioBufferToWav(buffer));
              var fileReader = new FileReader();
              fileReader.onloadend = function(e) {
                arrayBuffer = fileReader.result
                audioCtx.decodeAudioData(arrayBuffer, function(buffer) {
                  audioBufferToWav(buffer)
                },

                function(e) { console.log("Error with decoding audio data" + e.err); 
                });
              };
              fileReader.readAsArrayBuffer(data[0]);
              console.log('-------')
              console.log(blob)
              console.log(blob.type)
              const url = URL.createObjectURL(blob);
              //download(url, 'billy.mp3')
              helper = true
            });

            recorder.start();
            setTimeout(function() {
              recorder.stop();
            }, 10000)
        
          });
        }
        await bill()
      } else if (transcript.includes('the code is')) {
        setdomcom(websocket, transcript.split('the code is ')[1])
      } else if (transcript.includes('set ') && transcript.includes(' to')) {
        sendrobo('An alarm for insulin has been set')
        websocket.send(['46e0615d-b93a-42a8-89c5-8deb2d3c9488', 'tracker', 'insulin:' + transcript])
      } else if (transcript.includes('how are you')) {
        sendrobo('good')
      } else if (transcript.includes('help call 911')) {
        sendrobo('911 has been alerted. Please  stay calm as help arives')
      } else if (transcript.includes('mad')) {
        sendrobo('please calm down')
      }
    speak = false
    }
};

function setdomcom(websocket, domcom) {
  websocket.send(['46e0615d-b93a-42a8-89c5-8deb2d3c9488', 'settings', 'setdomcom:' + domcom])
  localStorage.setItem('domcom', domcom)
}

// start recognition
function startmic() {
  speak = !speak
  if (speak == true) {
    recognition.start();
  } else if (speak == false) {
    recognition.stop()
  }
}