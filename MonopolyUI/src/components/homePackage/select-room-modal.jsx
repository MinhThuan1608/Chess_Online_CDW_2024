import React, { useEffect, useState } from 'react';

import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';



const SelectRoomModal = ({ showModal, setShowModal, showJoinRoomModal, setShowJoinRoomModal }) => {
    const [filteredRooms, setFilteredRooms] = useState([]); // State để lưu danh sách phòng sau khi lọc

    const rooms = [{ roomId: 'a12', roomName: 'huong', havePass: false },
    { roomId: 'd12', roomName: 'thuan', havePass: false },
    { roomId: 'f45', roomName: 'thuy', havePass: true },
    { roomId: 'g34', roomName: 'quay', havePass: false },
    { roomId: 'g35', roomName: 'quay', havePass: false },
    { roomId: 'g36', roomName: 'quay', havePass: false }
    ];

    // Hàm xử lý khi ấn nút đóng modal
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const joinRoomModal = () => {
        // setShowModal(false);
        setShowJoinRoomModal(true);
    };
    const closeJoinRoomModal = () => {
        setShowJoinRoomModal(false);
    };


    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial', height: 'auto' }}
        >
            {showModal && (
                <Modal.Dialog className={showJoinRoomModal ? 'd-none' : ''}>
                    <Modal.Header>
                        <Modal.Title>Chọn Phòng</Modal.Title>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="search-room">
                            <p>Tìm kiếm:</p>
                            <FloatingLabel className="mb-3 search-room-input" controlId="floatingInput"
                                label="Nhập ID">
                                <Form.Control type="text" placeholder="Nhập ID"
                                    onChange={e => setFilteredRooms(rooms.filter(room => room.roomId.toLowerCase().includes(e.target.value.toLowerCase()) ||
                                        room.roomName.toLowerCase().includes(e.target.value.toLowerCase())))} />
                            </FloatingLabel>
                        </div>
                        <div className="listRoom">
                            {(filteredRooms.length > 0 ? filteredRooms : rooms).map((room) => (

                                <div key={room.roomId} className="room" onClick={room.havePass ? joinRoomModal : undefined}>
                                    {room.roomId}
                                    {room.havePass && (
                                        <FontAwesomeIcon icon={faLock} className="lock-icon" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </Modal.Body>

                </Modal.Dialog>
            )}
            {showJoinRoomModal && (
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Tham gia</Modal.Title>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeJoinRoomModal}></button>
                    </Modal.Header>

                    <Modal.Body >
                        <div className="createRoom">

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Nhập password"
                                className="mb-3"
                            >
                                <Form.Control type="password" placeholder="Nhập password" />
                            </FloatingLabel>

                            <Button className='joinRoom'>Vào</Button>

                        </div>
                    </Modal.Body>
                </Modal.Dialog>
            )}
        </div>
    );
}
export default SelectRoomModal;