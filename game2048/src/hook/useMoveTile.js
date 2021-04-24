import { useEffect } from "react";
import { addKeyObserver, removeKeyObserver } from "../util/keyboard";
import { makeTile, moveTile } from "../util/tile";

export default function useMoveTile({ tileList, setTileList, setScore }) {
    function moveAndAdd({x, y}) {
        const newTileList = moveTile({ tileList, x, y });
        const score = newTileList.reduce(
            (acc, item) => (item.isMerged ? acc + item.value : acc),
            0,
        );
        setScore(v => v + score);
        const newTile = makeTile(newTileList);
        newTile.isNew = true;
        newTileList.push(newTile);
        setTileList(newTileList);
    }

    function moveUp() {
        moveAndAdd({x: 0, y: -1});
    }
    function moveDown() {
        moveAndAdd({x: 0, y: 1});
    }
    function moveleft() {
        moveAndAdd({x: -1, y: 0});
    }
    function moveRight() {
        moveAndAdd({x: 1, y: 0});
    }
    useEffect(() => {
        addKeyObserver('up', moveUp);
        addKeyObserver('down', moveDown);
        addKeyObserver('left', moveleft);
        addKeyObserver('right', moveRight);
        return () => {
            removeKeyObserver('up', moveUp);
            removeKeyObserver('down', moveDown);
            removeKeyObserver('left', moveleft);
            removeKeyObserver('right', moveRight);
        }
    })
}