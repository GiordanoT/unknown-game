import React, {useState} from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import Navbar from "@/components/common/Navbar";
import {DUser, LUser, PUser} from "@/data/User";
import {CONSTRAINT, Pointer} from "@/utils/type";
import {DGame, LGame, PGame} from "@/data/Game";
import {MixinAction} from "@/utils/actions";
import {FirebaseAction} from "@/firebase/actions";
import {U} from "@/utils/functions";
import {DPlayer, LPlayer} from "@/data/Player";
import {ReduxUtilityAction} from "@/redux/actions/utility";
import {ReduxAction} from "@/redux/actions";
import {DGameCard, LGameCard, PGameCard} from "@/data/GameCard";
import {DGameDeck, LGameDeck} from "@/data/GameDeck";
import {DGameHand, LGameHand} from "@/data/GameHand";

function HomeComponent(props: AllProps) {
    const user = props.user;
    const game = props.game;
    const [gameCode, setGameCode] = useState('');

    const create = async() => {
        ReduxUtilityAction.setLoading(true);
        const dGame: DGame = {
            code: U.getRandomString(5),
            playerOne: null,
            playerTwo: null,
            running: false,
            eliminable: false,
            winner: null
        };
        const pGame = LGame.new(dGame);
        await MixinAction.add(pGame.raw);
        ReduxUtilityAction.setGameCode(dGame.code);
        const gameCards: PGameCard[] = [];
        user.deck.shuffle;
        for(let card of user.deck.cards) {
            const dGameCard: DGameCard = {
                animation: 'BlurIn',
                name: card.name,
                image: card.image,
                class: card.class,
                faction: card.faction,
                level: card.level,
                atk: card.atk,
                hp: card.hp,
                speed: card.speed
            };
            const gameCard = LGameCard.new(dGameCard);
            await MixinAction.add(gameCard.raw);
            gameCards.push(gameCard);
        }
        const dGameDeck: DGameDeck = {
            name: user.deck.name,
            gameCards: gameCards.map((gameCard) => {return gameCard.id})
        }
        const gameDeck = LGameDeck.new(dGameDeck);
        await MixinAction.add(gameDeck.raw);

        const handCards: PGameCard[] = [];
        for(let i = 0; i < 5; i++) {
            const card = await gameDeck.draw;
            if(card) handCards.push(card);
        }
        const dGameHand: DGameHand = {
            gameCards: handCards.map((card) => {return card.id})
        }
        const gameHand = LGameHand.new(dGameHand);
        await MixinAction.add(gameHand.raw);

        const dPlayer: DPlayer = {
            name: user.name,
            sign: U.retrieveSign(user.id),
            gameDeck: gameDeck.id,
            gameHand: gameHand.id
        };
        const player = LPlayer.new(dPlayer);
        await MixinAction.add(player.raw);
        pGame.playerOne = player;
        user.role = 'playerOne';
        ReduxUtilityAction.setLoading(false);
    }

    const join = async() => {
        ReduxUtilityAction.setLoading(true);
        const constraint: CONSTRAINT<DGame> = {field: 'code', operator: '==', value: gameCode};
        const games = await FirebaseAction.select<DGame>('games', constraint);
        if(games.length > 0) {
            const dGame = games[0];
            if(!dGame.running) {
                ReduxUtilityAction.setGameCode(dGame.code);
                const game = LGame.new(dGame);
                ReduxAction.add(game.raw);
                const gameCards: PGameCard[] = [];
                user.deck.shuffle;
                for(let card of user.deck.cards) {
                    const dGameCard: DGameCard = {
                        animation: 'BlurIn',
                        name: card.name,
                        image: card.image,
                        class: card.class,
                        faction: card.faction,
                        level: card.level,
                        atk: card.atk,
                        hp: card.hp,
                        speed: card.speed
                    };
                    const gameCard = LGameCard.new(dGameCard);
                    await MixinAction.add(gameCard.raw);
                    gameCards.push(gameCard);
                }
                const dGameDeck: DGameDeck = {
                    name: user.deck.name,
                    gameCards: gameCards.map((gameCard) => {return gameCard.id})
                }
                const gameDeck = LGameDeck.new(dGameDeck);
                await MixinAction.add(gameDeck.raw);

                const handCards: PGameCard[] = [];
                for(let i = 0; i < 5; i++) {
                    const card = await gameDeck.draw;
                    if(card) handCards.push(card);
                }
                const dGameHand: DGameHand = {
                    gameCards: handCards.map((card) => {return card.id})
                }
                const gameHand = LGameHand.new(dGameHand);
                await MixinAction.add(gameHand.raw);

                const dPlayer: DPlayer = {
                    name: user.name,
                    sign: U.retrieveSign(user.id),
                    gameDeck: gameDeck.id,
                    gameHand: gameHand.id
                };
                const player = LPlayer.new(dPlayer);
                await MixinAction.add(player.raw);
                game.running = true; game.playerTwo = player;
                user.role = 'playerTwo';
                ReduxUtilityAction.setLoading(false);
            } else alert('game is running');
        } else alert('invalid gameID');
    }


    return(<div>
        <Navbar userID={user.id} />
        <div className={'card shadow mt-4 mx-auto'}>
            <label className={'d-block'}><b>GAME</b></label>
            <hr />
            <button className={'btn btn-primary mt-2'} onClick={create} disabled={game !== null}>Create</button>
            <label className={'d-block mt-2 mb-2'}>OR</label>
            <div className={'d-flex justify-content-center'}>
                <input className={'input'} onChange={(evt) => setGameCode(evt.target.value)} type={'text'} />
                <button className={'ms-1 btn btn-primary'} onClick={join} disabled={game !== null}>Join</button>
            </div>
        </div>
    </div>);


}

interface OwnProps {userID: Pointer<DUser>}
interface StateProps {user: PUser, game: null|PGame}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    const user = LUser.fromPointer(ownProps.userID);
    const gameID = state.game.pointer; let game: null|PGame = null;
    if(gameID) game = LGame.fromPointer(gameID);
    return {user, game};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Home = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default Home;
