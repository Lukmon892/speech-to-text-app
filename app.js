// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('.form-control');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
const say = document.querySelector('.say').addEventListener('click', saySomething);
let paragraph = document.createElement('p');
textInput.appendChild(paragraph);


//Browser identifier
// Firefox 1.0+
// var isFirefox = typeof InstallTrigger !== 'undefined';

// // Chrome 1+
// var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};



getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


// //Fix for duplication, run code depending on the browser
// if (isFirefox) {
//     getVoices();
// }
// if (isChrome) {
//     if (synth.onvoiceschanged !== undefined) {
//         synth.onvoiceschanged = getVoices;
//     }
// }


window.SpeechRecognition = webkitSpeechRecognition || window.SpeechRecognition;

recognition = new SpeechRecognition();

recognition.interimResult = true;

function saySomething(e)
{
  // const xhr = new XMLHttpRequest();

  // xhr.open('GET', 'data.txt', true);

  // xhr.onload = function()
  // {
  //   if(this.status === 200)
  //   {
  //     console.log(this.responseText);
  //   }
  // }
  // xhr.send();

    dictate();

  e.preventDefault();
}

const dictate = ()=>{
  recognition.start();
  recognition.onresult = (e) =>
  {
    const speechToText = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(' ');
    console.log(speechToText);
    // paragraph.textContent = speechToText;
    textInput.textContent = speechToText;

    if(e.results[0].isFinal)
    {
      paragraph = document.createElement('p');
      textInput.appendChild(paragraph);
      
    }
      // textInput += paragraph;
      
      
      // speak();
    

    if(speechToText.includes('Hello')){
      speak(getName);
  
    }
    else if(speechToText.includes('hello'))
    {
      speak(getName)
    }
    // else if(speechToText.includes('hey'))
    // {
    //   speak(getName)
    // }
    // else if(speechToText.includes('Hey'))
    // {
    //   speak(getName)
    // }

    else if(speechToText.includes('Hi'))
    {
      speak(getName)
    }

    else if(speechToText.includes('hi'))
    {
      speak(getName)
    }
    else if(speechToText.includes('what is the time')){
      speak(getTime);
  
    }

    else if(speechToText.includes('What is the time')){
      speak(getTime);
  
    }

    else if(speechToText.includes(`what is the date`)){
      speak(getDate);
  
    }

    else if(speechToText.includes(`What is the date`)){
      speak(getDate);
  
    }

    else if(speechToText.includes('Hey Alexa, sorry, I meant Siri.')){
      speak(getJealous);
  
    }

    else if(speechToText.includes('hey')){
      speak(getJealous);
  
    }

    else if(speechToText.includes('What is the weather in'))

    {
      // speak(getTheWeather)
      getTheWeather(speechToText);
    }

    else if(speechToText.includes('what is the weather in'))

    {
      // speak(getTheWeather)
      getTheWeather(speechToText);
    }
    event.preventDefault();
  }
  
 
};

const speak = (action) =>{
 
  const utterThis = new SpeechSynthesisUtterance(action());

  if (utterThis != '') {

      // Add background animation
  body.style.background = '#141414 url(img/siri_gif_wave.gif)';
  body.style.backgroundRepeat = 'repeat-x';
  body.style.backgroundSize = '100% 190%';
   

     const speakText = new SpeechSynthesisUtterance(utterThis.value);

    //Speak end
    utterThis.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
  };

    // Speak error
    utterThis.onerror = e => {
      console.error('Something went wrong');
    };

    paragraph = document.createElement('p')
    textInput.appendChild(paragraph);

//selected voice
const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

//Loop through voices 

voices.forEach(voice =>
  {
    if(voice.name === selectedVoice)
    {
      utterThis.voice = voice;
    }
  });

  

   // Set pitch and rate
   utterThis.rate = rate.value;
   utterThis.pitch = pitch.value;
   // Speak

  synth.speak(utterThis);
  
  }

}



// const speakText = new SpeechSynthesisUtterance(textInput.value);

// speakText.onend = e =>
// {
//   console.log('Done speaking........');
// }

// //Speak error
// speakText.onerror = e =>{
//   console.error('Something went wrong');
// }

// //Selected voice
// const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
//   'data-name'
// );

// //Loop through voices
// voices.forEach(voice =>{
//   if(voice.name === selectedVoice){
//     speakText.voice = voice;
//   }
// })




const getTime = () =>{
  const time = new Date(Date.now());
  return   `the time is ${time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}`

};

const getDate = () =>{
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};

const getName = () =>{
  // const time = new Date(Date.now());
  return   "Hi Lukmon, what can I help you with?";

};

const getJealous = () =>{
  return "it is all good.";
  // const questions = ["who is Alexa?", "who is Alexa?", "who is Alexa?", "why don't you tell that bitch to play you a song."]

  // questions.forEach(quest =>{
  //   return quest
  // });


  // return "who is Alexa? who is Alexa? who is Alexa? why don't you tell that bitch to play you a song."
};

const getTheWeather = (speech) =>{
  
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`)
  .then(function(response){
    return response.json();

  }).then(function(weather){
    if(weather.cod === '404'){
     const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
      synth.speak(utterThis);
      return;
    }
   const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees celcius`);
   if (utterThis != '') {

          // Add background animation
      body.style.background = '#141414 url(img/siri_gif_wave.gif)';
      body.style.backgroundRepeat = 'repeat-x';
      body.style.backgroundSize = '100% 190%';

          //Speak end
    utterThis.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
  };

    // Speak error
    utterThis.onerror = e => {
      console.error('Something went wrong');
    };

    //selected voice
const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

//Loop through voices 

voices.forEach(voice =>
  {
    if(voice.name === selectedVoice)
    {
      utterThis.voice = voice;
    }
  });



   // Set pitch and rate
   utterThis.rate = rate.value;
   utterThis.pitch = pitch.value;
   // Speak
   
   
    synth.speak(utterThis);
  }})
} 



rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());

