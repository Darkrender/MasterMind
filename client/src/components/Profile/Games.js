import React from 'react';
import { Table, PageHeader } from 'react-bootstrap';
import { GameRow } from './GameRow';

export const Games = ({gameName, filteredGames}) => {
  return (
    <Table id={`#{gameName}-table`}>
      <h1>{gameName}</h1>
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
        </tr>
      </thead>
      {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score}/>)}
    </Table>
  )
}
