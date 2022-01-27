import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';
import {
    Button
} from "tabler-react";
import { useDispatch, useSelector } from 'react-redux';
import { getDraftData, saveDraft, deleteDraft } from '../redux/Actions';
import Loader from '../Loader';
import { authCheckToaster } from '../redux/AuthCheckToaster';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: window.screen.width > 500 ? '70%' : '95%',
        marginTop: window.screen.width > 500 ? 80 : 170,
        height: 700,
        paddingBottom: 150
    }
};

const questions = [
    "1.  Employer Question - Tell me about yourself?",
    "2.  Employer Question - What are your strengths?",
    "3.  Employer Question - What are your weaknesses?",
    "4.  Employer Question - Why do you want this job?",
    "5.  Employer Question - Where would you like to be in your career five years from now?",
    "6.  Employer Question - What's your ideal company?",
    "7.  Employer Question - What attracted you to this company?",
    "8.  Employer Question - Why should we hire you?",
    "9.  Employer Question - What did you like least about your last job?",
    "10. Employer Question - When were you most satisfied in your job?",
    "11. Employer Question - What can you do for us that other candidates can't? ",
    "12. Employer Question - What were the responsibilities of your last position?",
    "13. Employer Question - Why are you leaving your present job?",
    "14. Employer Question - What do you know about this industry?",
    "15. Employer Question - What do you know about our company?",
    "16. Employer Question - Are you willing to relocate?"
]

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    viewContent: {
        display: 'flex',
        cursor: 'pointer'
    },
    text: {
        color: '#00af50',
        marginLeft: 2
    },
    content: {
        display: 'flex'
    },
    question: {
        fontSize: 14
    },
    questionContainer: {
        marginTop: 10,
        marginBottom: 10
    }
}

const QuestionAnswer = ({ isModalOpen, onClose }) => {
    const [draft, setDraft] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const { draftResponse, draftData, draftDeleteResponse, loading } = useSelector(state => state.reducerMethod);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDraftData());
        
    }, []);

    useEffect(() => {
        if (draftData && !draftData.error) {
            setIsEdit(draftData.data ? true : false)
            setDraft(draftData.data && draftData.data.note && draftData.data.note.draft ? JSON.parse(draftData.data.note.draft) : []);
        }
    }, [draftData]);

    // useEffect(() => {
    //     if (draftResponse && !draftResponse.error) {
    //         onClose();
    //     }
    // }, [draftResponse]);

    useEffect(() => {
        if (draftDeleteResponse && !draftDeleteResponse.error) {
            setDraft([]);
        }
    }, [draftDeleteResponse]);

    const onSubmit = () => {
        let request = {
            'note': { 'draft': JSON.stringify(draft) }
        }
        dispatch(saveDraft(request, isEdit));
    }

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        // In case you have a limitation
        e.target.style.height = `${Math.min(e.target.scrollHeight, 500)}px`;
    }

    const onDelete = () => {
        var res = window.confirm("Are you sure , you want to delete it!");
        if (res === true) {
            if (authCheckToaster())
                dispatch(deleteDraft());
                onCloseModal();
        }
    }

    const onCloseModal = () => {
        // const actualDraft = draftData.data && draftData.data.note && draftData.data.note.draft ? draftData.data.note.draft : [];
        // if (JSON.stringify(actualDraft) !== JSON.stringify(draft)) {
        //     var r = window.confirm("Do you want to save it? You have unsaved changes!");
        //     if (r == true) {
        //         let request = {
        //             'note': { 'draft': JSON.stringify(actualDraft) }
        //         }
        //         dispatch(saveDraft(request, isEdit));
        //     }
        // }
        // else {
            onClose();
        // }
    }

    const onAnswerChange = (e, index) => {
        draft[index] = e.target.value;
        setDraft([...draft]);
    }

    return (
        <Modal
            isOpen={isModalOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Schedule Interview"
        >
            <div style={styles.text}>YOUR PERSONAL DRAFT TO SAVE QUESTIONS/ANSWERS FOR THE INTERVIEW
                <span style={{ marginLeft: 20 }} onClick={onDelete}>
                    <Icon disabled={!draft} style={{ paddingTop: 1, fontSize: 16, color: 'red', cursor: 'pointer' }} title="Delete" >delete</Icon>
                </span>
            </div>
            {questions.map((data, index) => {
                return <div style={styles.questionContainer} key={index}>
                    <div style={styles.question}>{data}</div>
                    <textarea onKeyDown={handleKeyDown} className="form-control" type="text" value={draft[index]} placeholder="Your answer..." onChange={(e) => onAnswerChange(e, index)} />
                </div>
            })}

            <div style={styles.text}>YOUR QUESTIONS</div>
            <div style={styles.questionContainer}>
                <textarea onKeyDown={handleKeyDown} className="form-control" type="text" value={draft[16]} placeholder="Write your questions..." onChange={(e) => onAnswerChange(e, 16)} />
            </div>
            <Button theme="accent" className="mt-3" style={{ margin: 10, backgroundColor: '#00af50', borderColor: '#00af50' }} onClick={onCloseModal} color="danger">Cancel</Button>
            <Button disabled={!draft} theme="accent" className="mt-3 ml-10" onClick={onSubmit} color="primary" style={{ backgroundColor: '#00af50', borderColor: '#00af50', width: '100%', marginTop: 20, marginBottom: 20 }}>{isEdit ? 'Update' : 'Save'}</Button>
        </Modal>
    )
}

export default QuestionAnswer;