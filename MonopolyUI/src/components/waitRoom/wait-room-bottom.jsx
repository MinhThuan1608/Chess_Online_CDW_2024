import React from 'react';
import Swal from 'sweetalert2';
import {toast} from 'react-toastify';

const WaitRoomBottom = (props) => {
    const handleInitGame = () => {
        if (props.listUser.length == 2)
            props.socket.publish({
                destination: '/app/game/room/' + props.roomId,
                body: JSON.stringify({
                    messageType: 'START_GAME'
                })
            });
        else toast.warn('Cần có 2 người mới có thể bắt đầu!');
    }
    return (
        <div className="bottom-part">
            <button className="btn-play-game" onClick={handleInitGame}>play game now</button>
        </div>
    );
}
export default WaitRoomBottom; 