import { useState } from 'react'

function App() {

  interface user {
    id: number;
    name: any;
    point: number;
    status: boolean;
  }

  let [playerList, setPlayerList] = useState<user[]>([]);

  function addPlayer(e:any) {
    let newList: user[] = [{
      id: Math.random() * Date.now(),
      name: e.target.playerName.value,
      point: 0,
      status: false,
    },
    ...playerList,]
    setPlayerList(newList as any);
    e.target.playerName.value = "";
  }
 
  function changeColor() {
    let pointArr = []
    for (let i = 0; i < playerList.length; i++) {
      pointArr.push(playerList[i].point)
    }
    pointArr.sort((a: number, b: number) => b - a)
    console.log(pointArr);
    for (let i = 0; i < playerList.length; i++) {
      if (playerList[i].point == 0) {
        playerList[i].status = false;
      } else {
        if (playerList[i].point == pointArr[0]) {
          playerList[i].status = true;
        } else {
          playerList[i].status = false;
        }
      }
    }
  }
  
  return (
    <>
      <div className='header'>
        <div className='info'>
          <span>Player: {playerList.length}</span> <br />
          <span>Total Points: {playerList.reduce((total, player) => {
            return total + player.point;
          }, 0)}</span>
        </div>

        <div className='title'>
          Bảng điểm
        </div>

      </div>
      <div className='body'>
        <table className='table_content'>
          <tbody>
            {
              playerList.map((player: user, index: number) => {
                return (
                  <tr key={player.id}>
                    <td><button onClick={
                      () => {
                        let newRemainList = playerList.filter((playerFilter) => {
                          return playerFilter.id != player.id;
                        })
                        setPlayerList(newRemainList)
                        if(newRemainList.length==0) {
                          setTimeout(()=>
                          window.alert("không còn người chơi nào!"),300
                          )
                        }
                    }
                    }>X</button></td>
                    <td style={{ color: player.status ? "yellow" : "blanchedalmond" }}><span className="material-symbols-outlined"> trophy </span></td>
                    <td>{player.name}</td>
                    <td> <button onClick={() => {
                      setPlayerList(playerList.map((playerMinus) => {
                        if (player.id == playerMinus.id) {
                          playerMinus.point -= 1
                          if (playerMinus.point < 0) {
                            playerMinus.point = 0
                          };
                          changeColor();

                        }
                        return playerMinus
                      }))
                    }}>-</button> {player.point} <button onClick={() => {
                      setPlayerList(playerList.map((playerPlus) => {
                        if (player.id == playerPlus.id) {
                          playerPlus.point += 1;
                        }
                        changeColor();

                        return playerPlus
                      }))
                    }}>+</button></td>

                  </tr>
                )
              })
            }

          </tbody>
        </table>

      </div>
      <div className='footer'>
        <form onSubmit={(e) => {
          e.preventDefault();
          addPlayer(e);
        }} action="">
          <input placeholder="Enter a player's name" name='playerName' type="text" />
          <button>ADD PLAYER</button>
        </form>

      </div>
    </>
  )
}

export default App
