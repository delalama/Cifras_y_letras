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

  ngOnInit() {
    this.APP_INFO = "INTRODUCE NOMBRES BUFARELAS";
    this.gameStart = false;
  }

  title = 'CIFRAS Y LETRAS';

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

  print() {
    console.log('print');
  }

  CLASSIC_GAME() {
    if (this.canGameStart()) {
      this.canGameStart();
      this.GAME_MODE = GAME_MODE_CLASSIC;
    }
  }

  NUMBERS() {
    if (this.canGameStart()) {
      this.GAME_MODE = GAME_MODE_NUMBERS;
      this.APP_INFO = "ELIJA NÚMEROS"
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
    }
  }

  getCandidateVocal() {
    const randomVocal = Math.floor(Math.random() * this.vocals.length);
    return this.vocals[randomVocal];
  }
  areTwoCoincidences(candidateLetter: string, lettersArray: string[]) {
    var counter = 0;
    for (const letter of lettersArray) {
      if (letter === candidateLetter) {
        counter++;
      }
    }

    return counter >= 2;
  }


  getCandidateConsonant() {
    const randomVocal = Math.floor(Math.random() * this.vocals.length);
    return this.consonants[randomVocal];
  }

  getLetterService(type_of_letter: Type_Of_Letter){
    debugger

    var chosenLetter = Type_Of_Letter.VOCAL === type_of_letter ? this.getVocal(): this.getConsonant();

    // displayChosenLetter(chosenLetter);

    if( this.chosenLettters.length == 7 ){
      this.LETTERS_GAME_BEGIN = true;
    }
  }

  getVocal() {
    debugger

    let candidateAproved = false;

    let candidateVocal = "";

    while (!candidateAproved) {
      candidateVocal = this.getCandidateVocal();

      if (!this.areTwoCoincidences(candidateVocal, this.chosenLettters)) {
        candidateAproved = true;
      }
    }

    this.chosenVocals.push(candidateVocal);
    this.chosenLettters.push(candidateVocal);

    return candidateVocal;
  }

  getConsonant() {
    debugger

    let candidateAproved = false;

    let candidateConsonante = "";

    while (!candidateAproved) {
      candidateConsonante = this.getCandidateConsonant();

      if (this.areTwoCoincidences(candidateConsonante, this.chosenLettters )) {
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
    this.gameStart = false;
    this.LETTERS_CHOSEN = false;
    this.APP_INFO = "INTRODUCE NOMBRES BUFARELAS";

  }

  // LETTERS
  Type_Of_Letter_VOCAL: Type_Of_Letter = Type_Of_Letter.VOCAL;
  Type_Of_Letter_CONSTANT: Type_Of_Letter = Type_Of_Letter.CONSONANT;

  VOCAL_CHOOSEN() {

  }

  CONSONANT_CHOOSEN() {

  }
}
