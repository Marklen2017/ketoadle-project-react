import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    input: {
      color: "red"
    }
  });  

function MaterialUIPickers({classes, setDate, selectedDate }) {
    // The first commit of Material-UI
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

    const handleStartDateChange = date => {
        setSelectedStartDate(date);
        setDate(date + 'To' + selectedEndDate);
    };

    useEffect(() => {
        if (selectedDate) {
            let getDate = selectedDate.split('To');
            if (getDate.length === 2 && getDate[0] !== 'undefined' && getDate[1] !== 'undefined') {
                setSelectedStartDate(getDate[0]);
                setSelectedEndDate(getDate[1]);
            }
        }
    }, [selectedDate])

    const handleEndDateChange = date => {
        setSelectedEndDate(date);
        setDate(selectedStartDate + 'To' + date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between" style={{ width: '100%', marginBottom: 20 }}>
                <DateTimePicker
                    label="Start"
                    inputVariant="outlined"
                    autoOk
                    // ampm={false}
                    // disableFuture
                    disablePast
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    style={{ marginRight: 10 }}
                    // InputProps={{ className: classes.input }}
                />
                <DateTimePicker
                    label="End"
                    inputVariant="outlined"
                    autoOk
                    // ampm={false}
                    disablePast
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    showTodayButton
                    // InputProps={{ className: classes.input }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

export default withStyles(styles)(MaterialUIPickers);