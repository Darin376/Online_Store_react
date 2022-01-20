import React, { useEffect, useState } from "react";
import Spinner from '../../Spinner/spinner';
import 'firebase/compat/firestore';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import "./CommentsStyle.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

export const Comments = () => {
    const bd = firebase.firestore();
    const auth = firebase.auth();
    const [user, loading, error] = useAuthState(auth);

    const [allDocs, setAllDocs] = useState([]);
    const [reload, setReload] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalComment, setmodalComment] = useState(false);
    const [upData, setupData] = useState({
        data: {
            message: '',
        },
        id: ''
    });

    let dataTime = -new Date().getTime();
    const fetchAll = (e) => {
        bd.collection('comments')
            .get()
            .then((snapshot) => {
                if (snapshot.docs.length > 0) {
                    snapshot.docs.forEach((doc) => {
                        setAllDocs((prev) => {
                            return [...prev, { data: doc.data(), id: doc.id }];
                        });
                    });
                }
            })
        setAllDocs([])
    }
    useEffect(() => {
        fetchAll()
    }, [reload])

    function MyVerticallyCenteredModal(props) {
        const { daata } = props;
        const [value, setValue] = useState({
            message: daata.data.message,
        });
        const { message } = value;
        const handleChange = (message) => (e) => {
            e.preventDefault();
            setValue({ ...value, [message]: e.target.value })
        }
        const udpadeDoc = () => {
            if (!message) {
                alert('введите сообщение')
            } else {
                bd.collection('comments').doc(daata.id).update({
                    message: message,
                }).then(() => {
                    toast.success(`коментарий на ${message} изменен`)
                }).catch(() => {
                    toast.error(`somiting`)
                })
                if (!reload) {
                    setReload(true)
                } else {
                    setReload(false)
                }
                setModalShow(false)
            }

      
        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        изменить пост
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <textarea name="message" value={message}  message='message' cols="30" rows="6"  onChange={handleChange('message')}></textarea>
                    <button onClick={udpadeDoc} style={{ margin: '10px',borderRadius:'20px'}}>Изменить отзыв</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    function CommentUser(props) {
        const [concat, setConcat] = useState('')
        const addDoc = (e) => {
            if (!concat) {
                alert('введите сообщение')
            } else {
                bd.collection('comments').add({
                    message: concat,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    data: dataTime
                }).catch((err) => {
                    console.log(['error'], err.message)
                })
                setConcat('')
            }
            if (!reload) {
                setReload(true)
            } else {
                setReload(false)
            }
            setmodalComment(false)
        }

        
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Окно сообщения
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <textarea name="message" value={concat}  message='message' cols="30" rows="6" onChange={((e) => setConcat(e.target.value))}></textarea>
                    <button onClick={() => { addDoc() }} style={{ margin: '10px',borderRadius:'20px'}} >опубликовать отзыв</button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} >Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const userID = user == null ? false : user.uid;
    const deliteDoc = (id) => {
        bd.collection('comments').doc(id).delete()
            .then(() => {
                toast.success(`коментарий удален`)
            }).catch(() => {
                toast.error(`somiting`)
            })
        if (!reload) {
            setReload(true)
        } else {
            setReload(false)
        }
    }
    
  
    if (!allDocs.length) return <Spinner />
    return (
        <div className="userWrapper">
        <div className="userComentsWrapper">
            <ToastContainer />
            <h3>Отзывы и замечания</h3>
            <div className="UserFetchInput">
            <button onClick={() => user ? setmodalComment(true) : alert('войтите в аккаунт для отправки сообщения')} >Опубликовать отзыв</button>
        </div>
            <hr />
            <div  >
                {allDocs.map((doc, index) => {
                    return (
                        <div key={index} className="userInfoWrapper">
                            <div className="userName">
                                <img src={doc.data.photoURL} />
                                <h4>{doc.data.displayName}</h4>
                            </div>
                            <div className="userCommentsContainer">
                                <p>{doc.data.message}</p>
                                <div className="userCommentsdelWrapper">
                                    {doc.data.uid === userID ? <div className="UserComments">
                                        <button className="UserCommentsBotton" onClick={() => {
                                            setupData(doc)
                                            setModalShow(true)
                                        }}>Изменить</button>
                                        <DeleteForeverIcon style={{ fontSize: '30', cursor: 'pointer', paddingRight:'5', }} onClick={() => { deliteDoc(doc.id) }} />
                                    </div> : null}
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                })}
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    daata={upData}
                />
            </div>
        </div>
        <CommentUser show={modalComment} onHide={() => setmodalComment(false)} />
    
    </div>
    );
};