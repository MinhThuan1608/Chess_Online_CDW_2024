import { React, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userAvt from '../../assert/images/avatar/meo.jpg';
import { faXmark, faGear, faCoins, faEyeSlash, faEye, faCopy, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SocketContext } from '../../App';
import { formatCurrency } from '../gameBoard/help';


const WaitRoom = (props) => {
    const { socket, setSocket } = useContext(SocketContext);
    const [showPassword, setShowPassword] = useState(false);
    

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleCopyPassword = () => {
        navigator.clipboard.writeText(props.roomPassword)
    };

    const handleOutRoom = () => {
        socket.publish({
            destination: '/app/game/room/' + props.roomId,
            body: JSON.stringify({
                messageType: 'LEAVE'
            })
        });
        window.location = '/'
    }
    return (
        <div className='top-part'>
            <div className="score-and-money">
                <div className="top-name-user">
                    <span>{props.me.username}</span>
                </div>
                <div className="img-frame" style={{ backgroundImage: `url(${!props.me ? userAvt : props.me.avatar ? props.me.avatar.data : userAvt})` }}>
                </div>
                <p className="coins">
                    <span>{props.me?.money ? formatCurrency(props.me?.money) : props.me?.money}</span>
                    <FontAwesomeIcon icon={faCoins} className="money-icon" />
                </p>

            </div>
            <div className="lable-room">
                <div className='lable'>phòng {props.roomPassword ? 'kín' : 'công khai'}</div>

                {props.roomPassword ?
                    <div className='password-div'>
                        <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} onClick={handleTogglePassword}
                            className="setting-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            disabled
                            value={props.roomPassword}
                            placeholder='********'
                        />
                        <FontAwesomeIcon icon={faCopy} onClick={handleCopyPassword} className="setting-icon" />
                    </div> : <></>}
            </div>
            <div className="web-options">
         
                <div className="icon-container">
                    <FontAwesomeIcon icon={faGear} className="setting-icon" />
                </div>
                <div className="icon-container icon-container-exit">
                    <FontAwesomeIcon icon={faXmark} className="setting-icon" onClick={handleOutRoom} />
                </div>
            </div>

        </div>
    );
}
export default WaitRoom;