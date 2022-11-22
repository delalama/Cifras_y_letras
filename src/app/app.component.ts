import {Component, OnInit} from '@angular/core';
import {Player} from "./models/player";
import {GAME_MODE, GAME_MODE_CLASSIC, GAME_MODE_LETTERS, GAME_MODE_NUMBERS} from "./models/GAME_MODE";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
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

  print() {
    console.log('print');
  }

  CLASSIC_GAME() {
    this.gameStart = true  ;
    this.GAME_MODE = GAME_MODE_CLASSIC;
  }

  NUMBERS() {
    this.gameStart = true  ;
    this.GAME_MODE = GAME_MODE_NUMBERS;
    this.APP_INFO = "ELIJA NÚMEROS"
  }

  LETTERS() {
    this.gameStart = true  ;
    this.GAME_MODE = GAME_MODE_LETTERS;
    this.APP_INFO = 'ELIJA LETRAS'
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
        id: this.players.length ,
        name: ''
      };
    }
  }

  resetGame() {
    this.gameStart = false;
    this.LETTERS_CHOSEN = false;
    this.APP_INFO = ""
  }

  // LETTERS

  VOCAL_CHOOSEN() {

  }

  CONSONANT_CHOOSEN() {

  }
}
