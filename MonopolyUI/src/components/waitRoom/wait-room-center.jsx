import React from 'react';
import ChatSide from './wait-room-chat-side';
import { faChess, faCrown, faPlus, faSignOut, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WaitRoomOnlineUser from './wait-room-online-list-user';
import userAvt from '../../assert/images/avatar/meo.jpg';


const WaitRoomCenter = (props) => {
    const me = JSON.parse(sessionStorage.getItem('user'))
    const handleInvitePlayer = () => {
        alert('mời dô chơi')
    }
    const handleKickUser = () => {
        props.socket.publish({
            destination: '/app/game/room/' + props.roomId,
            body: JSON.stringify({
                messageType: 'KICK'
            })
        })
    }
    const handleOutRoom = () => {
        props.socket.publish({
            destination: '/app/game/room/' + props.roomId,
            body: JSON.stringify({
                messageType: 'LEAVE'
            })
        });
        window.location = '/'
    }
    return (
        <div className="center-part">
            <WaitRoomOnlineUser userOnline = {props.userOnline} socket={props.socket} roomId={props.roomId} roomPassword={props.roomPassword}/>
            <div className="center-part-left">

                {/* người chơi 1 */}
                <div className="center-part-user center-part-userthr">
                    <div className="img-frame-player" style={{ backgroundImage: `url(${!props.listUser[0] ? userAvt : props.listUser[0].avatar ? props.listUser[0].avatar.data : userAvt})` }}></div>
                    <FontAwesomeIcon icon={faCrown} className="main-room-player" />
                    <p className="player-name player-br-thr">{props.listUser[0]?.username}</p>
                    <FontAwesomeIcon icon={faChess} className="icon-chess icon-chess-white" />
                    <FontAwesomeIcon icon={me?.username===props.listUser[0]?.username?faSignOut:''} className="icon-delete-user" onClick={handleOutRoom}/>
                </div>
                {/* người chơi 2 */}
                {props.listUser.length==2 ?
                    <div className="center-part-user center-part-userforth">
                        <div className="img-frame-player" style={{ backgroundImage: `url(${!props.listUser[1] ? userAvt : props.listUser[1].avatar ? props.listUser[1].avatar.data : userAvt})` }}></div>
                        <p className="player-name player-br-forth">{props.listUser[1]?.username}</p>
                        <FontAwesomeIcon icon={faChess} className="icon-chess icon-chess-black" />
                        <FontAwesomeIcon icon={me?.username===props.listUser[0]?.username?faTrash:faSignOut} className="icon-delete-user" onClick={me.username===props.listUser[0]?.username?handleKickUser:handleOutRoom}/>
                    </div>
                    :
                    <div className="center-part-user center-part-userthr">
                        {/* <div className="img-frame-player"  style={{backgroundImage: `url(${userAvt})`}}></div> */}
                        {/* <p className="player-name player-br-thr"></p> */}
                        <button className='btn-invite' onClick={handleInvitePlayer}>
                            <FontAwesomeIcon icon={faPlus} className="icon-add-user" />
                        </button>
                    </div>
                }


            </div>
            <ChatSide socket={props.socket} roomId={props.roomId} listMessage={props.listMessage} />
        </div>
    );
}
export default WaitRoomCenter;