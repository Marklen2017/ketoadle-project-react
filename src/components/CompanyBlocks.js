import React from "react";
import classNames from "classnames";
import { Card } from "tabler-react";

class CompanyBlocks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { variation, count, imgName, subLabel1, subLabel2, isIcon, faIcon, onSubLabel1Click, onSubLabel2Click } = this.props;

        const cardClasses = classNames(
            "stats-small",
            variation && `stats-small--${variation}`
        );

        const cardBodyClasses = classNames(
            variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
        );

        const labelClasses = classNames(
            "stats-small__label",
            "text-uppercase",
            variation !== "1" && "mb-1"
        );
        const subLabelClasses = classNames(
            "stats-small__label",
            variation !== "1" && "mb-1"
        );

        const valueClasses = classNames(
            "stats-small__value",
            "count",
            variation === "1" ? "my-3" : "m-0"
        );

        const innerDataFieldClasses = classNames(
            "stats-small__data",
            variation !== "1" && "text-right align-items-center"
        );
        return (
            <div className={cardBodyClasses} style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', alignItems: 'center',backgroundColor:'#fff' }}>
                <div className={innerDataFieldClasses} style={{ height: 'fit-content', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5, marginTop: 5 }}>
                    {faIcon && <i className={faIcon}></i>}
                    {!faIcon && <h6 className={valueClasses} style={{fontSize:24}}>{count}</h6>}
                </div>
                <div className={subLabelClasses} style={{ height: 'fit-content', fontSize: 11,cursor:'pointer',color:'#4267b2' }} onClick={onSubLabel1Click?onSubLabel1Click:null}>{subLabel1}</div>
                <div className={subLabelClasses} style={{ height: 'fit-content', fontSize: 11,cursor:'pointer',color:'#4267b2' }} onClick={onSubLabel2Click?onSubLabel2Click:null}>{subLabel2}</div>
            </div>
        );
    }
}

export default CompanyBlocks;
