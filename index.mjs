
let speech = new SpeechSynthesisUtterance();

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
var speeckup = true;
recognition.interimResults = true;
var text3="";
speech.text = "Hello my name is Friday and I am your A I today, Ask me anything you want, Just before asking anything call my name once. So Ready to go sir."
window.speechSynthesis.speak(speech);
let p = document.createElement('p');
var text2 = "";
recognition.addEventListener('result',(e)=>{
  const text = Array.from(e.results)
  .map(result=>result[0])
  .map(result=>result.transcript)
  .join('');
  
  text2 = text;
  console.log(text2)
})
 navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function (stream) {
            // Permission granted, handle the stream if needed
            console.log('Microphone access granted');
            // You can use the stream for further audio processing if necessary
          })
speech.onend=()=>{
  if(speeckup==true){
    recognition.start();
    
    setTimeout(stopspeech,1000);
  }
  text2="";
  
  
}
function endEverything()
{
  speech.text = "It was my honor to serve you sir. By the way if you want to any assistance again just reload the page."
  document.getElementById("subtitle").innerHTML = speech.text
  window.speechSynthesis.speak(speech);
  recognition.stop();
  speeckup = false;
}
function change_text(){
  document.getElementById("subtitle").innerHTML = text3
}

recognition.onstart=()=>{
  document.getElementById("subtitle").innerHTML = "Listening..."
  
}

function stopspeech(){
  recognition.stop();
}
recognition.onend=()=>{
if(text2.includes("friday")||text2.includes("Friday")&&speeckup==true){
  generateStory();
  document.getElementById("subtitle").innerHTML = "Thinking..."
  
}
else if(text2.includes("bye")||text2.includes("Bye")&&speeckup==true){
  endEverything();
}else if(speeckup==true){
  recognition.start();

}else{
  return; 
}
 
}

async function generateStory(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages:[{"role":"system","content":"You are an AI your name is friday you help everyone in activities that are text generated"},
          {"role":"user","content":text2},
        ]
        //role:'AI assistant your name is ARNS'
      }),
  });
  
  const data = await response.json();
  text3 = data.choices[0].message.content;
  console.log(data.choices[0].message.content);
  speech.text = text3;
  change_text();
  window.speechSynthesis.speak(speech);
 
}


