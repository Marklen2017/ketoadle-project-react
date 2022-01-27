
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    customWidth: {
        maxWidth: '100%',
        maxHeight: '100vh'
    },
    noMaxWidth: {
        maxWidth: 'none',
    },
}));


export default function SoftSkillModal() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        TransitionComponent={Zoom}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        classes={{ tooltip: classes.customWidth }}
                        placement="top-end"
                        title={
                            <div>
                                <div>
                                    <h4 style={{ color: '#00af50', fontSize: 16 }}>What exactly soft skills are?</h4>
                                    <p>Soft skills are the personal attributes, personality traits, inherent
                social cues, and communication abilities needed for success on
                the job. Soft skills characterize how a person interacts in his or
                her relationships with others.
                Unlike hard skills that are learned, soft skills are similar to
                emotions or insights that allow people to “read” others. These
                are much harder to learn, at least in a traditional classroom.
            They are also much harder to measure and evaluate.</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <div>
                                        <h4 style={{ color: '#00af50', fontSize: 12 }}>Communication</h4>
                                        <p>
                                            <li> Listening</li>
                                            <li>Negotiation</li>
                                            <li>Nonverbal communication</li>
                                            <li>Persuasion</li>
                                            <li>Presentation</li>
                                            <li>Public speaking</li>
                                            <li>Reading body language</li>
                                            <li>Storytelling</li>
                                            <li>Verbal communication</li>
                                            <li>Visual communication</li>
                                            {/* <li>Writing reports and proposals</li>
                                            <li>Writing skills.</li> */}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#00af50', fontSize: 12 }}>Leadership</h4>
                                        <p>
                                            <li> Giving clear feedback</li>
                                            <li>Inspiringpeople</li>
                                            <li>Leadership</li>
                                            <li>Management</li>
                                            <li>Managing difficult conversations</li>
                                            <li>Managing remote/virtual teams</li>
                                            <li>Meeting management</li>
                                            <li>Mentoring</li>
                                            <li>Motivating</li> 
                                            <li>Project management</li>
                                            {/* <li>Resolving issues</li>
                                            <li>Successful coaching</li>
                                            <li>Supervising</li>
                                            <li>Talent management</li> */}
                                            </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around'}}>
                                    <div>
                                        <h4 style={{ color: '#00af50', fontSize: 12 }}>Critical Thinking</h4>
                                        <p>
                                            <li> Adaptability</li>
                                            <li>Artistic aptitude</li>
                                            <li>Creativity</li>
                                            <li>Critical observation</li>
                                            <li>Critical thinking</li>
                                            <li>Design aptitude</li>
                                            <li>Desire to learn</li>
                                            <li>Flexibility</li>
                                            <li>Innovation</li>
                                            <li>Logical thinking</li>
                                            <li>Problem solving</li>
                                        </p>
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#00af50', fontSize: 12 }}>Team Work</h4>
                                        <p>
                                            <li> Accepting feedback</li>
                                            <li>Collaboration</li>
                                            <li>Customer service</li>
                                            <li>Dealing with difficult situations</li>
                                            <li>Dealing with office politics</li>
                                            <li>Disability awareness</li>
                                            <li>Diversity awareness</li>
                                            <li>Emotional intelligence</li>
                                            <li>Empathy</li></p>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <Icon onClick={handleTooltipOpen} style={{ paddingTop: 1, fontSize: 18, color:'#006FE6', cursor:'pointer' }}>info</Icon>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    );
}

