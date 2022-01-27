import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Today from '@material-ui/icons/Today';
import Forum from '@material-ui/icons/Forum';
import { Link } from 'react-router-dom';
import { Avatar } from 'tabler-react';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    titleSection: {
        fontSize: 18,
        color: '#4267b2'
    },
    subTitleSection: {
        fontSize: 12,
        color: 'grey'
    },
    ScoreSection: {
        fontSize: 18,
        color: '#00af50'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 5
    },
    imageContainer: {
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        border: '10px solid #F5F7FB',
        borderRadius: '50%'
    },
    iconStyle:{
        padding:20
    }
}));

export default function ShortlistCard({ data, onCalenderClick,isThirdParty,token,onCandidateSelect }) {
    const [selectedCandidates,setSelectedCandidates]=useState([]);
    const classes = useStyles();


    const onCandidateClick = (id) => {
        let selectedCandidatesData = selectedCandidates;
        const index = selectedCandidatesData.indexOf(id);
        if (index >= 0) {
            selectedCandidatesData.splice(parseInt(index),1);
        }
        else {
            selectedCandidatesData.push(id);
        }
        setSelectedCandidates(selectedCandidatesData);
        onCandidateSelect(selectedCandidatesData);
    }
    return (
        <Card className={classes.card}>
            <div className={classes.buttonContainer}>
                <Link to={`/seeker-detail?id=${data._id}&token=${token}`}>
                    <RemoveRedEye style={{ color: '#4267b2' }} />
                </Link>
                {isThirdParty ? <div onClick={() => onCandidateClick(data._id)}>
                    {selectedCandidates && selectedCandidates.indexOf(data._id) >= 0 ? <Icon style={{ cursor: 'pointer', color: '#DC004E' }}>star</Icon> : <Icon style={{ cursor: 'pointer', color: 'grey' }}>star_outline</Icon>}
                </div>:<Today onClick={() => onCalenderClick(data._id)} style={{ color: '#DC004E',cursor:'pointer' }} />}
                {/* {!isThirdParty && <Forum style={{ color: 'grey' }} />} */}
            </div>
            <div className={classes.imageContainer}>
                <div className={classes.imageStyle}>
                    <Avatar size="xxl" imageURL={data.image ? data.image : require('../assets/user.png')} />
                </div>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <div className={classes.titleSection}>
                        {data.name}
                    </div>
                    <div className={classes.subTitleSection}>
                        <p className="shortlistCard" style={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            webkitBoxOrient: 'vertical',
                            textOverflow: 'ellipsis',
                            width: '100%',
                            padding: 5
                        }}> {data.about}</p>
                    </div>
                    <div className={classes.ScoreSection}>
                        Skillset Score: {data.totalScore}
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}