import {Component, OnInit} from '@angular/core';
import {Player} from "./models/player";
import {GAME_MODE, GAME_MODE_CLASSIC, GAME_MODE_LETTERS, GAME_MODE_NUMBERS} from "./models/GAME_MODE";
import {Type_Of_Letter} from "./models/Type_Of_Letter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  counter: { min: number, sec: number }
  remainingChoosen: number;
  numbers: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75, 100];
  choosenNumbers: number[];
  _CONF_NUMBER_OF_NUMBERS: number = 6;

  AUDIO_URL: string[] = ["gallo1.wav", "gallo2.wav", "pedo1.wav", "pedo2.wav", "pedo3.wav", "pedo4.wav"]

  ngOnInit() {
    this.APP_INFO = "INTRODUCE NOMBRES BUFARELAS";
    this.gameStart = false;
  }

  title = 'CIFRAS Y LETRAS';

  stopGames:boolean;

  // Players
  player: Player = {id: 0, name: ''}
  players: Player[] = [];

  // Functions
  APP_INFO: any;
  gameStart: boolean;

  // GAME_MODE
  GAME_MODE: GAME_MODE;
  GAME_MODE_CLASSIC: GAME_MODE = GAME_MODE_CLASSIC
  GAME_MODE_NUMBERS: GAME_MODE = GAME_MODE_NUMBERS
  GAME_MODE_LETTERS: GAME_MODE = GAME_MODE_LETTERS

  // NUMBERS GAME
  NUMBER_TO_CALCULATE: number;

  // LETTERS GAME
  LETTERS_CHOSEN: boolean;
  letters: string[];
  PENDING_LETTERS: number;
  chosenLettters: string[];
  chosenVocals: string[];
  chosenConsonants: string[];
  vocals: string[] = ["A", "E", "I", "O", "U"];
  consonants: string[] = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "W", "X", "Y", "Z"];
  LETTERS_GAME_BEGIN: boolean;
  _CONF_LETTERS_NUMBER = 9;
  LETTERS_TIMER_FINISHED: boolean;

  print() {
    console.log('print');
  }

  // GAMES FUNCTIONS
  CLASSIC_GAME() {
    this.stopGames = false;
    debugger
    if (this.canGameStart()) {
      while(!this.stopGames){
        this.randomGame();
      }
    }
  }

  NUMBERS() {
    if (this.canGameStart()) {
      this.GAME_MODE = GAME_MODE_NUMBERS;
      this.choosenNumbers = [];

      this.APP_INFO = "A calcular";

      this.setRandomNumbers();

      this.numbersGameService();

      this.NUMBER_TO_CALCULATE = this.getRandomNumberBetween(101, 999);

      this.APP_INFO = "Calcula " + this.NUMBER_TO_CALCULATE + " con operaciones básicas y sin repetir números usados."

    }
  }

  // letters game functions
  LETTERS() {
    if (this.canGameStart()) {
      this.chosenLettters = [];
      this.GAME_MODE = GAME_MODE_LETTERS;
      this.APP_INFO = 'ELIJA LETRAS'
      this.chosenVocals = [];
      this.chosenConsonants = [];
      this.APP_INFO = "Faltan " + this._CONF_LETTERS_NUMBER + " letras para empezar.";
      this.LETTERS_TIMER_FINISHED = false;
    }
  }

  setRandomNumbers() {
    let i = this._CONF_NUMBER_OF_NUMBERS;

    while (i > 0) {
      this.getRandomNumber();
      i--;
    }
  }

  getRandomNumber() {
    let isValidCandidateNumber: boolean = false;

    while (!isValidCandidateNumber) {
      const randomNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];

      if (!this.areTwoCoincidencesOnChoosenNumbers(randomNumber, this.choosenNumbers)) {
        isValidCandidateNumber = true;
        this.choosenNumbers.push(randomNumber)
      }
    }
  }

  getCandidateVocal() {
    const randomVocal = Math.floor(Math.random() * this.vocals.length);
    return this.vocals[randomVocal];
  }

  areTwoCoincidencesOnChoosenLetters(candidateLetter: string, lettersArray: string[]) {
    var counter = 0;
    for (const letter of lettersArray) {
      if (letter === candidateLetter) {
        counter++;
      }
    }

    return counter >= 2;
  }

  areTwoCoincidencesOnChoosenNumbers(candidateNumber: number, numbersArray: number[]) {
    var counter = 0;
    for (const letter of numbersArray) {
      if (letter === candidateNumber) {
        counter++;
      }
    }

    return counter >= 2;
  }


  getCandidateConsonant() {
    const randomVocal = Math.floor(Math.random() * this.vocals.length);
    return this.consonants[randomVocal];
  }

  setRemainingLettersToChooseMessage() {
    let number = this.remainingChoosen = this._CONF_LETTERS_NUMBER - this.chosenLettters.length;
    this.APP_INFO = "Faltan " + number + " letras para empezar.";
  }

  numbersGameService() {
    if (this.choosenNumbers.length == 6) {
      this.LETTERS_GAME_BEGIN = true;
      this.startTimer(60);
    }
  }

  getLetterService(type_of_letter: Type_Of_Letter) {
    var chosenLetter = Type_Of_Letter.VOCAL === type_of_letter ? this.getVocal() : this.getConsonant();

    this.setRemainingLettersToChooseMessage();

    if (this.chosenLettters.length == 9) {
      this.APP_INFO = "Busca la combinación más larga"
      this.LETTERS_GAME_BEGIN = true;
      this.startTimer(30);

    }
  }

  getVocal() {
    let candidateAproved = false;

    let candidateVocal = "";

    while (!candidateAproved) {
      candidateVocal = this.getCandidateVocal();

      if (!this.areTwoCoincidencesOnChoosenLetters(candidateVocal, this.chosenLettters)) {
        candidateAproved = true;
      }
    }

    this.chosenVocals.push(candidateVocal);
    this.chosenLettters.push(candidateVocal);

    return candidateVocal;
  }

  getConsonant() {
    let candidateAproved = false;

    let candidateConsonante = "";

    while (!candidateAproved) {
      candidateConsonante = this.getCandidateConsonant();

      if (!this.areTwoCoincidencesOnChoosenLetters(candidateConsonante, this.chosenLettters)) {
        candidateAproved = true;
      }
    }

    this.chosenConsonants.push(candidateConsonante);
    this.chosenLettters.push(candidateConsonante)

    return candidateConsonante;
  }

  canGameStart() {
    if (this.players.length > 0) {
      this.gameStart = true;
      return true;
    } else {
      if (this.APP_INFO.includes("!!!!!!")) {
        return false;
      }
      this.APP_INFO += "!";
      return false;
    }
  }

  getName() {
    console.log('holi');
  }

  createNewPLayer() {
  }

  onPressEnterOnNameInput() {
    if (this.player.name.length > 0) {
      this.players.push(this.player);
      this.player = {
        id: this.players.length,
        name: ''
      };
    }
  }

  resetGame() {
    this.stopGames = true;
    this.gameStart = false;
    this.LETTERS_CHOSEN = false;
    this.APP_INFO = "INTRODUCE NOMBRES BUFARELAS";
    // @ts-ignore
    if (!this.players.length > 0) {
      this.APP_INFO = "INTRODUCE NOMBRES BUFARELAS";
    }
    this.GAME_MODE = {id: 4, name: 'nulo'};
  }

  // LETTERS
  Type_Of_Letter_VOCAL: Type_Of_Letter = Type_Of_Letter.VOCAL;
  Type_Of_Letter_CONSTANT: Type_Of_Letter = Type_Of_Letter.CONSONANT;
  timer: number;

  VOCAL_CHOOSEN() {

  }

  CONSONANT_CHOOSEN() {

  }

  startTimer(seconds: number) {
    this.counter = {min: 0, sec: seconds}

    let intervalId = setInterval(() => {
      console.log(this.counter.sec);
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      } else this.counter.sec -= 1
      if (this.counter.min === 0 && this.counter.sec == 0) {
        clearInterval(intervalId)
        this.LETTERS_GAME_BEGIN = false;
        this.LETTERS_TIMER_FINISHED = true;
        this.chosenLettters = [];
        this.choosenNumbers = [];
        this.playAlarm();
      }
      return false;
    }, 1000)
  }

  getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getRandomFinishAudio() {
    return this.AUDIO_URL[Math.floor(Math.random() * this.AUDIO_URL.length)];
  }

  playAlarm() {
    let audio = new Audio();
    audio.src = '../assets/' + this.getRandomFinishAudio();
    audio.load();
    audio.play();
  }

  private randomGame() {
    const options: number[] = [0, 0, 1];
    const randomOption = options[Math.floor(Math.random() * options.length)];

    if (randomOption === 0) {
      this.LETTERS();
    } else {
      this.NUMBERS();
    }
  }
}

