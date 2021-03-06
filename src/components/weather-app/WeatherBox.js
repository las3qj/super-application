import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function WeatherBox(props) {
    const classes = useStyles();
    return(
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {props.children}
                </Grid>
            </Grid>            
        </Grid>
    );
}

export default WeatherBox;