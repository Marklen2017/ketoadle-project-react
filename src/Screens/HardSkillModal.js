
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


export default function HardSkillModal() {
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
                                    <h4 style={{ color: '#00af50', fontSize: 16 }}>Hard Skills Defined</h4>
                                    <p>
                                        Hard skills are part of the skill set that is required for a job. They
include the expertise necessary for an individual to successfully
do the job. They are job-specific and are typically listed in job
postings and job descriptions.
Hard skills are acquired through formal education and training
programs, including college, apprenticeships, short-term training
classes, online courses, certification programs, as well as by
on-the-job training.
</p>
                                </div>
                                <h4 style={{ color: '#00af50', fontSize: 12 }}>Examples of Hard Skills</h4>
                                The following are examples of some of the hard skills required for

different occupations. <br/>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div>
                                        <p>
                                            <li> Accounting</li>
                                            <li>Administrative</li>
                                            <li>Analysis</li>
                                            <li>Analytics</li>
                                            <li>Automotive</li>
                                            <li>Banking</li>
                                            <li>Bookkeeping</li>
                                            <li>Carpentry</li>
                                            <li>Computer</li>
                                            <li>Construction</li>
                                            <li>Data</li>
                                            <li>Math</li>
                                            <li>Mechanical</li>
                                            <li>Medical</li>
                                            <li>Nursing</li>
                                            <li>Optimization</li>
                                            <li>Pharmaceutical</li>
                                            <li>Pipefitter</li>
                                            <li>Plumbing</li>
                                            <li>Project Management</li>
                                            <li>Programming.</li>
                                            <li> Research</li>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                        <li>Reporting</li>
                                            <li>Design</li>
                                            <li>Editing</li>
                                            <li>Electrical</li>
                                            <li>Engineering</li>
                                            <li>Financial</li>
                                            <li>Hardware</li>
                                            <li>Healthcare</li>
                                            <li>Information Technology</li>
                                            <li>Languages</li>
                                            <li>Legal</li>
                                            <li>Manufacturing</li>
                                            <li>Science</li>
                                            <li>Software</li>
                                            <li>Spreadsheets</li>
                                            <li>Teaching</li>
                                            <li>Technology</li>
                                            <li>Testing</li>
                                            <li>Translation</li>
                                            <li>Transcription</li>
                                            <li>Word Processing</li>
                                            <li>Writing.</li>
                                        </p>
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

