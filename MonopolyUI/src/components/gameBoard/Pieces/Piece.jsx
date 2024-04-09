import React from "react";
import { useAppContext } from "../../../contexts/Context";
import arbiter from "../../../arbiter/arbiter";
import { generateCandidateMoves } from "../../../reducer/action/move";

const Piece = (
    { rank,
        file,
        piece, }
) => {

    const { appState, dispatch } = useAppContext()
    const { turn, position: currentPosition } = appState;
    // const currentPosition = position[position.length - 1]

    const onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`)
        // if (turn === piece[0]) {
        e.dataTransfer.effectAllowed = 'move'
        // }
        setTimeout(() => {
            e.target.style.display = "none"
        }, 0)

        if (turn === piece[0]) {
            const candidateMoves = arbiter.getValidMoves({
                position: currentPosition[currentPosition.length - 1],
                prevPosition: currentPosition[currentPosition.length - 2],
                rank,
                file,
                piece
            })
            dispatch(generateCandidateMoves({ candidateMoves }))
        }
    }
    const onDragOEnd = e => e.target.style.display = 'block'
    return (
        <div className={`piece ${piece} p-${file}${rank}`}
            draggable={piece[0] === turn ? true : false}
            onDragStart={onDragStart}
            onDragEnd={onDragOEnd}
        />
    )
}
export default Piece;