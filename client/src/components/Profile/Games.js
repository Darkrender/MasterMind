import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';

export const Games = ({gameName, filteredGames}) => {
  return (
    <div>
      <h1>{gameName}</h1>
      <Table id={`#{gameName}-table`} condensed striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score}/>)}
      </Table>
    </div>
  )
}
